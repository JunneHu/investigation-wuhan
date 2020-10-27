// import queryString from 'query-string';
import * as cscService from '../services/cscCard';

export default {
  namespace: 'cscCard',
  state: {},
  effects: {
    *queryList({ payload }, { call, put }) {
      const queryRes = yield call(cscService.queryList, payload);
      yield put({
        type: 'querySuccess',
        payload: {
          queryResult: queryRes,
        },
      });
    },
    *importCSCCard({ payload }, { call, put }) {
      const queryRes = yield call(cscService.importCSCCard, payload);
      yield put({
        type: 'querySuccess',
        payload: {
          importResult: queryRes,
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
