 // import queryString from 'query-string';
import * as gameService from '../services/gameCompany';

export default {
  namespace: 'gameCompany',
  state: {},
  effects: {
    *queryList({payload}, {call, put}) {
        const queryRes = yield call(gameService.queryList, payload);
        yield put({
          type: 'querySuccess',
          payload: {
            queryResult: queryRes,
          },
        });
    },
  },
  reducers: {
    querySuccess(state, {payload}) {
        return {
          ...state,
          ...payload,
        };
    }
  },
};
