import _ from 'lodash';
import { Router } from 'express';
import * as tools from 'auth0-extension-tools';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import config from '../lib/config';
import mailgun from 'mailgun.js';
import { ADMIN_ROLE_NAME, AUDITOR_ROLE_NAME, NAME_FILTER_ROLES, USER_ROLE_NAME } from '../constants';
import * as constants from '../constants';
import { requireScope } from '../lib/middlewares';
import onDeclineSingUp from '../templates/onDeclineSingUp';
import notifySignUp from '../templates/notifySignUp';
import receivedSignUp from '../templates/receivedSignUp';

const ADMINS_ROLES = [ AUDITOR_ROLE_NAME, USER_ROLE_NAME, ADMIN_ROLE_NAME ];

const REQUEST_STATE_PENDING = 'pending';
const REQUEST_STATE_ALLOWED = 'allowed';
const REQUEST_STATE_DECLINED = 'declined';

const validateEmail = (email) => {
  // todo impl
  return email;
};

const validateRequest = (req) => {
  return req && req.body && validateEmail(req.body.email);// && req.body.client_id;
};

const getAdmins = async (auth0) => {
  let users = [];
  let roles = await auth0.roles.getAll({ name_filter: NAME_FILTER_ROLES });
  let ADMINS_ROLE_IDS = roles.filter(v => ADMINS_ROLES.includes(v.name))
    .map(v => v.id);
  for (let i = 0; i < ADMINS_ROLE_IDS.length; i++) {
    users = users.concat(
      await auth0.roles.getUsers({ id: ADMINS_ROLE_IDS[i], per_page: 100, page: 0 })
    );
  }
  return users;
};

const createRequestHandler = async (context, req, request) => {
  let id = uuidv4();
  let sites = (await req.auth0.clients.getAll()).filter(s => s.client_id === config('AUTH0_CLIENT_ID'));

  if (!request) {
    let connection = req.body.connection || 'Username-Password-Authentication';
    let identities = [];
    const users = await req.auth0.users.getByEmail(req.body.email.toLowerCase());
    users.forEach(user => {
      identities = identities.concat(user.identities);
    });
    let found = identities.filter(v => v.provider === 'auth0' && v.connection === connection);
    if (found.length === 0) {
      request = await context.db.create('requests', {
        _id: id,
        email: req.body.email.toLowerCase(),
        client_id: req.body.client_id && req.body.client_id.toLowerCase(),
        connection,
        created_at: new Date(),
        state: REQUEST_STATE_PENDING,
        count: 0
      });
    } else {
      const [userSite] = sites.filter(s => !s.includes('webtask.io'));
      const r = await req.auth0.tickets.changePassword({
        result_url: userSite,
        user_id: `${found[0].provider}|${found[0].user_id}`,
        ttl_sec: 0,
        mark_email_as_verified: true,
        includeEmailInRedirect: true
      });

      const text = `Registration request for ${req.body.email.toLowerCase()}`;
      const html = receivedSignUp({
        ...request,
        email: req.body.email.toLowerCase(),
        site: userSite,
        support: config('SUPPORT'),
        resetUrl: r.ticket
      });
      context.mg.messages.create(context.DOMAIN, {
        from: context.FROM,
        to: [ req.body.email.toLowerCase() ],
        subject: 'Registration request',
        text,
        html
      });
    }
  }

  if (request && request.state === REQUEST_STATE_PENDING && request.count < 3) {
    let admins = await getAdmins(req.auth0);
    let adminsEmails = admins.map(v => v.email);
    const [adminSite] = sites.filter(s => s.includes('webtask.io'));

    const text = `Registration request for ${request.email}`;
    const html = notifySignUp({
      ...request,
      username: req.body.email.toLowerCase(),
      site: adminSite,
      support: config('SUPPORT'),
      declineUrl: `${adminSite}/${id}/decline`,
      acceptUrl: `${adminSite}/${id}/accept`
    });
    context.mg.messages.create(context.DOMAIN, {
      from: context.FROM,
      to: adminsEmails,
      subject: 'Registration request',
      text,
      html
    });
    request.count++;
    context.db.update('requests', request._id, request);
  }
};

const acceptRequestHandler = async (context, auth0, request) => {
  let user = null;
  let sites = (await auth0.clients.getAll()).filter(s => s.client_id === config('AUTH0_CLIENT_ID'));
  const [userSite] = sites.filter(s => !s.includes('webtask.io'));

  request.state = REQUEST_STATE_ALLOWED;
  context.db.delete('requests', request._id, request);
  // context.db.update('requests', request._id, request);

  try {
    user = await auth0.users.create({
      email: request.email,
      username: crypto.createHash('md5')
        .update(request.email)
        .digest('hex')
        .slice(0, 15),
      connection: request.connection,
      password: uuidv4(),
      email_verified: false
    });
  } catch (err) {
    console.error('acceptRequestHandler', err);
    [ user ] = await auth0.users.getByEmail(request.email);
  }

  const data = {
    result_url: userSite,
    user_id: user.user_id,
    // user_email: request.email,
    // connection: request.connection,
    ttl_sec: 0,
    mark_email_as_verified: true,
    includeEmailInRedirect: true
  };
  console.log('acceptRequestHandler', user, data);
  await auth0.tickets.changePassword(data);
};

const declineRequestHandler = async (context, auth0, request) => {
  let sites = (await auth0.clients.getAll()).filter(s => s.client_id === config('AUTH0_CLIENT_ID'));
  const [userSite] = sites.filter(s => !s.includes('webtask.io'));

  request.state = REQUEST_STATE_DECLINED;
  context.db.delete('requests', request._id, request);
  const text = `Registration request for ${request.email} declined`;
  const html = onDeclineSingUp({
    ...request,
    username: req.user.username,
    site: userSite,
    support: config('SUPPORT'),
    declineUrl: `${userSite}/${id}/decline`,
    acceptUrl: `${userSite}/${id}/accept`
  });
  context.mg.messages.create(context.DOMAIN, {
    from: context.FROM,
    to: [ request.email ],
    subject: 'Registration request',
    text,
    html
  });
};

export default (storage) => {
  const API_KEY = config('MAILGUN_API_KEY');
  const API_URL = config('MAILGUN_API_URL');
  const DOMAIN = config('MAILGUN_DOMAIN');
  const FROM = config('MAILGUN_FROM') || `no reply <noreply@${DOMAIN}>`;

  const mgOptions = { username: 'api', key: API_KEY, domain: DOMAIN };

  if (API_URL) {
    mgOptions.url = API_URL;
  }

  const mg = mailgun.client(mgOptions);
  const db = new tools.BlobRecordProvider(storage.storage, { concurrentWrites: false });
  const api = Router();

  const context = { db, mg, FROM, DOMAIN };

  // Create SignUp request
  api.post('/', (req, res, next) => {
    if (!validateRequest(req)) {
      res
        .status(400)
        .json({ _error: 'Bad Request' });
    } else {
      db.getAll('requests')
        .then(requests => _.find(requests, r => r.email === req.body.email.toLowerCase()))
        .then(request => createRequestHandler(context, req, request))
        .then(() => res.status(201)
          .send())
        .catch(next);
    }
  });

  api.use((req, res, next) => {
    const permission = (req.method.toLowerCase() === 'get') ? constants.AUDITOR_PERMISSION : constants.USER_PERMISSION;
    return requireScope(permission)(req, res, next);
  });
  // Get All Requests
  api.get('/', (req, res, next) => {
    db.getAll('requests')
      .then(requests => requests.sort((a, b) => (new Date(a.created_at) - new Date(b.created_at)) * -1))
      .then(requests => res.json(requests))
      .catch(err => res.status(500)
        .send());
  });

  // Get Request
  api.get('/:id', (req, res, next) => {
    db.get('requests', req.params.id)
      .then(request => res.json(request))
      .catch(err => res.status(404)
        .json({ error: 'Request not found' }));
  });

  // Allow SignUp
  api.get('/:id/accept', (req, res, next) => {
    db.get('requests', req.params.id)
      .then(r => acceptRequestHandler(context, req.auth0, r))
      .then(() => res.status(204)
        .send())
      .catch(err => {
        console.error(err);
        res.status(404)
          .json({ error: 'Request not found' });
      });
  });

  // Disallow SignUp
  api.get('/:id/decline', (req, res, next) => {
    db.get('requests', req.params.id)
      .then(r => declineRequestHandler(context, req.auth0, r))
      .then(() => res.status(204)
        .send())
      .catch(err => {
        console.error(err);
        res.status(404)
          .json({ error: 'Request not found' });
      });
  });

  return api;
};
