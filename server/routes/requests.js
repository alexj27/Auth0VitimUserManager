import Promise from 'bluebird';
import { Router } from 'express';
import { NotFoundError } from 'auth0-extension-tools';

import { requireScope } from '../lib/middlewares';
import * as constants from '../constants';

export default (scriptManager) => {
  const api = Router();
  api.get('/', requireScope(constants.OPERATOR_PERMISSION), (req, res, next) => {
    res.json([
      {
        id: 'uuid',
        email: 'test@test.ru',
        create_at: Date.now(),
        state: 'wait',
        client_id: 'client1',
        connections: []
      },
      {
        id: 'uuid',
        email: 'test1@test.ru',
        create_at: Date.now(),
        state: 'wait',
        client_id: 'client1',
        connections: []
      }
    ]);
  });

  api.get('/:id', (req, res, next) => {
    req.auth0.logs.get({ id: req.params.id })
      .then(log => {
        if (log && (log.type === 'fapi' || log.type === 'sapi')) {
          return Promise.reject(new Error('Invalid log record.'));
        }

        if (req.user.scope.indexOf(constants.OPERATOR_PERMISSION) >= 0) {
          return log;
        }

        return req.auth0.users.get({ id: log.user_id })
          .then(user => {
            if (!user) {
              throw new NotFoundError(`User not found: ${req.params.id}`);
            }

            const accessContext = {
              request: {
                user: req.user
              },
              payload: {
                user
              }
            };

            return scriptManager.execute('access', accessContext)
              .then(() => log);
          });
      })
      .then(log => res.json({ log }))
      .catch(next);
  });

  return api;
};
