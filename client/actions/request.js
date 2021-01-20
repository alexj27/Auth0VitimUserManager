import axios from 'axios';
import * as constants from '../constants';
import { fetchUserDetail } from './user';

export function fetchRequests(page = 0) {
  return {
    type: constants.FETCH_REQUESTS,
    meta: {
      page
    },
    payload: {
      promise: axios.get('/api/requests', {
        params: {
          page
        },
        responseType: 'json'
      })
    }
  };
}

export function fetchRequest(requestId) {
  return {
    type: constants.FETCH_REQUEST,
    meta: {
      requestId
    },
    payload: {
      promise: axios.get(`/api/requests/${requestId}`, {
        responseType: 'json'
      })
    }
  };
}

export function resolveRequest(requestId, status) {
  return (dispatch) => {
    dispatch({
      type: constants.UPDATE_USER,
      meta: {
        requestId,
        status,
        onSuccess: () => {
          dispatch(fetchRequests());
        }
      },
      payload: {
        promise: axios.get(`/api/requests/${requestId}/${status}`, {}, {
          responseType: 'json'
        })
      }
    });
  };
}

export function makeRequest(data) {
  return {
    type: constants.MAKE_REQUEST,
    meta: {
      data
    },
    payload: {
      promise: axios.post(`/api/requests/`, data, {
        responseType: 'json'
      })
    }
  };
}

export function clearRequest() {
  return {
    type: constants.CLEAR_REQUEST
  };
}
