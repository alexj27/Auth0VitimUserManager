/*
 * Applications.
 */

// Fetch.
export const FETCH_APPLICATIONS = 'FETCH_APPLICATIONS';
export const FETCH_APPLICATIONS_PENDING = 'FETCH_APPLICATIONS_PENDING';
export const FETCH_APPLICATIONS_REJECTED = 'FETCH_APPLICATIONS_REJECTED';
export const FETCH_APPLICATIONS_FULFILLED = 'FETCH_APPLICATIONS_FULFILLED';

// Fetch single.
export const FETCH_APPLICATION = 'FETCH_APPLICATION';
export const FETCH_APPLICATION_PENDING = 'FETCH_APPLICATION_PENDING';
export const FETCH_APPLICATION_REJECTED = 'FETCH_APPLICATION_REJECTED';
export const FETCH_APPLICATION_FULFILLED = 'FETCH_APPLICATION_FULFILLED';

/*
 * Auth.
 */

// Token.
export const LOADED_TOKEN = 'LOADED_TOKEN';
export const RECIEVED_TOKEN = 'RECIEVED_TOKEN';

// Login.
export const SHOW_LOGIN = 'SHOW_LOGIN';
export const REDIRECT_LOGIN = 'REDIRECT_LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

// Logout.
export const LOGOUT_PENDING = 'LOGOUT_PENDING';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

/*
 * Connections.
 */

// Fetch.
export const FETCH_CONNECTIONS = 'FETCH_CONNECTIONS';
export const FETCH_CONNECTIONS_PENDING = 'FETCH_CONNECTIONS_PENDING';
export const FETCH_CONNECTIONS_REJECTED = 'FETCH_CONNECTIONS_REJECTED';
export const FETCH_CONNECTIONS_FULFILLED = 'FETCH_CONNECTIONS_FULFILLED';

/*
 * Logs.
 */

export const CLEAR_LOG = 'CLEAR_LOG';

// Fetch all.
export const FETCH_LOGS = 'FETCH_LOGS';
export const FETCH_LOGS_PENDING = 'FETCH_LOGS_PENDING';
export const FETCH_LOGS_REJECTED = 'FETCH_LOGS_REJECTED';
export const FETCH_LOGS_FULFILLED = 'FETCH_LOGS_FULFILLED';

// Fetch single.
export const FETCH_LOG = 'FETCH_LOG';
export const FETCH_LOG_PENDING = 'FETCH_LOG_PENDING';
export const FETCH_LOG_REJECTED = 'FETCH_LOG_REJECTED';
export const FETCH_LOG_FULFILLED = 'FETCH_LOG_FULFILLED';

/*
 * Requests.
 */

export const CLEAR_REQUEST = 'CLEAR_REQUEST';

// Fetch all.
export const FETCH_REQUESTS = 'FETCH_REQUESTS';
export const FETCH_REQUESTS_PENDING = 'FETCH_REQUESTS_PENDING';
export const FETCH_REQUESTS_REJECTED = 'FETCH_REQUESTS_REJECTED';
export const FETCH_REQUESTS_FULFILLED = 'FETCH_REQUESTS_FULFILLED';

// Fetch single.
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_REQUEST_PENDING = 'FETCH_REQUEST_PENDING';
export const FETCH_REQUEST_REJECTED = 'FETCH_REQUEST_REJECTED';
export const FETCH_REQUEST_FULFILLED = 'FETCH_REQUEST_FULFILLED';

export const MAKE_REQUEST = 'MAKE_REQUEST';

/*
 * Users.
 */

// Create user.
export const REQUEST_CREATE_USER = 'REQUEST_CREATE_USER';
export const CANCEL_CREATE_USER = 'CANCEL_CREATE_USER';
export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_PENDING = 'CREATE_USER_PENDING';
export const CREATE_USER_REJECTED = 'CREATE_USER_REJECTED';
export const CREATE_USER_FULFILLED = 'CREATE_USER_FULFILLED';

// Edit user.
export const REQUEST_FIELDS_CHANGE = 'REQUEST_FIELDS_CHANGE';
export const CANCEL_FIELDS_CHANGE = 'CANCEL_FIELDS_CHANGE';
export const FIELDS_CHANGE = 'FIELDS_CHANGE';
export const FIELDS_CHANGE_PENDING = 'FIELDS_CHANGE_PENDING';
export const FIELDS_CHANGE_REJECTED = 'FIELDS_CHANGE_REJECTED';
export const FIELDS_CHANGE_FULFILLED = 'FIELDS_CHANGE_FULFILLED';

// Fetch all.
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_REJECTED = 'FETCH_USERS_REJECTED';
export const FETCH_USERS_FULFILLED = 'FETCH_USERS_FULFILLED';

// Fetch single.
export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_PENDING = 'FETCH_USER_PENDING';
export const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';

// Fetch logs.
export const FETCH_USER_LOGS = 'FETCH_USER_LOGS';
export const FETCH_USER_LOGS_PENDING = 'FETCH_USER_LOGS_PENDING';
export const FETCH_USER_LOGS_REJECTED = 'FETCH_USER_LOGS_REJECTED';
export const FETCH_USER_LOGS_FULFILLED = 'FETCH_USER_LOGS_FULFILLED';

// Fetch devices.
export const FETCH_USER_DEVICES = 'FETCH_USER_DEVICES';
export const FETCH_USER_DEVICES_PENDING = 'FETCH_USER_DEVICES_PENDING';
export const FETCH_USER_DEVICES_REJECTED = 'FETCH_USER_DEVICES_REJECTED';
export const FETCH_USER_DEVICES_FULFILLED = 'FETCH_USER_DEVICES_FULFILLED';

// Remove MFA.
export const REQUEST_REMOVE_MULTIFACTOR = 'REQUEST_REMOVE_MULTIFACTOR';
export const CANCEL_REMOVE_MULTIFACTOR = 'CANCEL_REMOVE_MULTIFACTOR';
export const REMOVE_MULTIFACTOR = 'REMOVE_MULTIFACTOR';
export const REMOVE_MULTIFACTOR_PENDING = 'REMOVE_MULTIFACTOR_PENDING';
export const REMOVE_MULTIFACTOR_REJECTED = 'REMOVE_MULTIFACTOR_REJECTED';
export const REMOVE_MULTIFACTOR_FULFILLED = 'REMOVE_MULTIFACTOR_FULFILLED';

// Block user.
export const REQUEST_BLOCK_USER = 'REQUEST_BLOCK_USER';
export const CANCEL_BLOCK_USER = 'CANCEL_BLOCK_USER';
export const BLOCK_USER = 'BLOCK_USER';
export const BLOCK_USER_PENDING = 'BLOCK_USER_PENDING';
export const BLOCK_USER_REJECTED = 'BLOCK_USER_REJECTED';
export const BLOCK_USER_FULFILLED = 'BLOCK_USER_FULFILLED';

// Unblock user.
export const REQUEST_UNBLOCK_USER = 'REQUEST_UNBLOCK_USER';
export const CANCEL_UNBLOCK_USER = 'CANCEL_UNBLOCK_USER';
export const UNBLOCK_USER = 'UNBLOCK_USER';
export const UNBLOCK_USER_PENDING = 'UNBLOCK_USER_PENDING';
export const UNBLOCK_USER_REJECTED = 'UNBLOCK_USER_REJECTED';
export const UNBLOCK_USER_FULFILLED = 'UNBLOCK_USER_FULFILLED';

// Remove user blocks.
export const REQUEST_REMOVE_BLOCKED_IPS = 'REQUEST_REMOVE_BLOCKED_IPS';
export const CANCEL_REMOVE_BLOCKED_IPS = 'CANCEL_REMOVE_BLOCKED_IPS';
export const REMOVE_BLOCKED_IPS = 'REMOVE_BLOCKED_IPS';
export const REMOVE_BLOCKED_IPS_PENDING = 'REMOVE_BLOCKED_IPS_PENDING';
export const REMOVE_BLOCKED_IPS_REJECTED = 'REMOVE_BLOCKED_IPS_REJECTED';
export const REMOVE_BLOCKED_IPS_FULFILLED = 'REMOVE_BLOCKED_IPS_FULFILLED';

// Delete user.
export const REQUEST_DELETE_USER = 'REQUEST_DELETE_USER';
export const CANCEL_DELETE_USER = 'CANCEL_DELETE_USER';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_PENDING = 'DELETE_USER_PENDING';
export const DELETE_USER_REJECTED = 'DELETE_USER_REJECTED';
export const DELETE_USER_FULFILLED = 'DELETE_USER_FULFILLED';

// Reset password.
export const REQUEST_PASSWORD_RESET = 'REQUEST_PASSWORD_RESET';
export const CANCEL_PASSWORD_RESET = 'CANCEL_PASSWORD_RESET';
export const PASSWORD_RESET = 'PASSWORD_RESET';
export const PASSWORD_RESET_PENDING = 'PASSWORD_RESET_PENDING';
export const PASSWORD_RESET_REJECTED = 'PASSWORD_RESET_REJECTED';
export const PASSWORD_RESET_FULFILLED = 'PASSWORD_RESET_FULFILLED';

// Change password.
export const REQUEST_PASSWORD_CHANGE = 'REQUEST_PASSWORD_CHANGE';
export const CANCEL_PASSWORD_CHANGE = 'CANCEL_PASSWORD_CHANGE';
export const PASSWORD_CHANGE = 'PASSWORD_CHANGE';
export const PASSWORD_CHANGE_PENDING = 'PASSWORD_CHANGE_PENDING';
export const PASSWORD_CHANGE_REJECTED = 'PASSWORD_CHANGE_REJECTED';
export const PASSWORD_CHANGE_FULFILLED = 'PASSWORD_CHANGE_FULFILLED';

// Change username.
export const REQUEST_USERNAME_CHANGE = 'REQUEST_USERNAME_CHANGE';
export const CANCEL_USERNAME_CHANGE = 'CANCEL_USERNAME_CHANGE';
export const USERNAME_CHANGE = 'USERNAME_CHANGE';
export const USERNAME_CHANGE_PENDING = 'USERNAME_CHANGE_PENDING';
export const USERNAME_CHANGE_REJECTED = 'USERNAME_CHANGE_REJECTED';
export const USERNAME_CHANGE_FULFILLED = 'USERNAME_CHANGE_FULFILLED';

// Change email.
export const REQUEST_EMAIL_CHANGE = 'REQUEST_EMAIL_CHANGE';
export const CANCEL_EMAIL_CHANGE = 'CANCEL_EMAIL_CHANGE';
export const EMAIL_CHANGE = 'EMAIL_CHANGE';
export const EMAIL_CHANGE_PENDING = 'EMAIL_CHANGE_PENDING';
export const EMAIL_CHANGE_REJECTED = 'EMAIL_CHANGE_REJECTED';
export const EMAIL_CHANGE_FULFILLED = 'EMAIL_CHANGE_FULFILLED';

// Resend verification email.
export const REQUEST_RESEND_VERIFICATION_EMAIL = 'REQUEST_RESEND_VERIFICATION_EMAIL';
export const CANCEL_RESEND_VERIFICATION_EMAIL = 'CANCEL_RESEND_VERIFICATION_EMAIL';
export const RESEND_VERIFICATION_EMAIL = 'RESEND_VERIFICATION_EMAIL';
export const RESEND_VERIFICATION_EMAIL_PENDING = 'RESEND_VERIFICATION_EMAIL_PENDING';
export const RESEND_VERIFICATION_EMAIL_REJECTED = 'RESEND_VERIFICATION_EMAIL_REJECTED';
export const RESEND_VERIFICATION_EMAIL_FULFILLED = 'RESEND_VERIFICATION_EMAIL_FULFILLED';


/*
 * User Picker.
 */

export const CONFIRM_USER_PICKER = 'CONFIRM_USER_PICKER';
export const CANCEL_USER_PICKER = 'CANCEL_USER_PICKER';

// Open.
export const OPEN_USER_PICKER = 'OPEN_USER_PICKER';

// Search.
export const SEARCH_USER_PICKER = 'SEARCH_USER_PICKER';
export const SEARCH_USER_PICKER_PENDING = 'SEARCH_USER_PICKER_PENDING';
export const SEARCH_USER_PICKER_REJECTED = 'SEARCH_USER_PICKER_REJECTED';
export const SEARCH_USER_PICKER_FULFILLED = 'SEARCH_USER_PICKER_FULFILLED';

// Select.
export const SELECT_USER = 'SELECT_USER';
export const UNSELECT_USER = 'UNSELECT_USER';

// Scripts.
export const FETCH_SCRIPT = 'FETCH_SCRIPT';
export const FETCH_SCRIPT_PENDING = 'FETCH_SCRIPT_PENDING';
export const FETCH_SCRIPT_REJECTED = 'FETCH_SCRIPT_REJECTED';
export const FETCH_SCRIPT_FULFILLED = 'FETCH_SCRIPT_FULFILLED';

export const UPDATE_SCRIPTS = 'UPDATE_SCRIPTS';
export const UPDATE_SCRIPTS_PENDING = 'UPDATE_SCRIPTS_PENDING';
export const UPDATE_SCRIPTS_REJECTED = 'UPDATE_SCRIPTS_REJECTED';
export const UPDATE_SCRIPTS_FULFILLED = 'UPDATE_SCRIPTS_FULFILLED';

export const UPDATE_SCRIPT = 'UPDATE_SCRIPT';
export const UPDATE_SCRIPT_PENDING = 'UPDATE_SCRIPT_PENDING';
export const UPDATE_SCRIPT_REJECTED = 'UPDATE_SCRIPT_REJECTED';
export const UPDATE_SCRIPT_FULFILLED = 'UPDATE_SCRIPT_FULFILLED';

// Memberships.
export const FETCH_MEMBERSHIPS = 'FETCH_MEMBERSHIPS';
export const FETCH_MEMBERSHIPS_PENDING = 'FETCH_MEMBERSHIPS_PENDING';
export const FETCH_MEMBERSHIPS_REJECTED = 'FETCH_MEMBERSHIPS_REJECTED';
export const FETCH_MEMBERSHIPS_FULFILLED = 'FETCH_MEMBERSHIPS_FULFILLED';

// Access Level.
export const FETCH_ACCESS_LEVEL = 'FETCH_ACCESS_LEVEL';
export const FETCH_ACCESS_LEVEL_PENDING = 'FETCH_ACCESS_LEVEL_PENDING';
export const FETCH_ACCESS_LEVEL_REJECTED = 'FETCH_ACCESS_LEVEL_REJECTED';
export const FETCH_ACCESS_LEVEL_FULFILLED = 'FETCH_ACCESS_LEVEL_FULFILLED';

// SETTINGS.
export const FETCH_SETTINGS = 'FETCH_SETTINGS';
export const FETCH_SETTINGS_PENDING = 'FETCH_SETTINGS_PENDING';
export const FETCH_SETTINGS_REJECTED = 'FETCH_SETTINGS_REJECTED';
export const FETCH_SETTINGS_FULFILLED = 'FETCH_SETTINGS_FULFILLED';
export const TOGGLE_STYLE_SETTINGS = 'TOGGLE_STYLE_SETTINGS';
export const GET_STYLE_SETTINGS = 'GET_STYLE_SETTINGS';

// LANGUAGE DICTIONARY.
export const FETCH_LANGUAGE_DICTIONARY = 'FETCH_LANGUAGE_DICTIONARY';
export const FETCH_LANGUAGE_DICTIONARY_PENDING = 'FETCH_LANGUAGE_DICTIONARY_PENDING';
export const FETCH_LANGUAGE_DICTIONARY_REJECTED = 'FETCH_LANGUAGE_DICTIONARY_REJECTED';
export const FETCH_LANGUAGE_DICTIONARY_FULFILLED = 'FETCH_LANGUAGE_DICTIONARY_FULFILLED';

// Access level constants
export const SUPER_ADMIN = 2;

// The list of reserved user fields that must not be rendered in the custom fields edit form
export const RESERVED_USER_FIELDS = [ 'username', 'memberships', 'connection', 'password', 'email', 'repeatPassword', 'resetPassword' ];
