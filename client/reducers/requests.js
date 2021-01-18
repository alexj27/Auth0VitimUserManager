import { fromJS } from 'immutable';
import * as constants from '../constants';
import logTypes from '../utils/logTypes';
import createReducer from '../utils/createReducer';

const initialState = {
  loading: false,
  error: null,
  records: [],
  currentRecord: null
};

export const requests = createReducer(fromJS(initialState), { // eslint-disable-line import/prefer-default-export
  [constants.FETCH_REQUESTS_PENDING]: (state, action) =>
    state.merge({
      ...initialState,
      loading: true,
      records: action.meta.page === 0 ? [] : state.get('records')
    }),
  [constants.FETCH_REQUESTS_REJECTED]: (state, action) =>
    state.merge({
      loading: false,
      error: action.errorData
    }),
  [constants.FETCH_REQUESTS_FULFILLED]: (state, action) => {
    const { data } = action.payload;
    return state.merge({
      loading: false,
      nextPage: action.meta.page + 1,
      records: state.get('records').filter(record => {
        return data.filter(r => record.get('email') === r.email).length === 0;
      }).concat(fromJS(data))
    });
  }
});
