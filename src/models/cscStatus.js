 // import queryString from 'query-string';
import * as cscStatus from '../services/cscStatus';

export default {
  namespace: 'cscStatus',
  state: {},
  effects: {
    *queryList({ payload }, { call, put }) {
      const queryRes = yield call(cscStatus.queryList, payload);
      yield put({
        type: 'querySuccess',
        payload: {
          queryResult: queryRes,
        },
      });
    },
  },
  reducers: {
    querySuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    }
  },
};
