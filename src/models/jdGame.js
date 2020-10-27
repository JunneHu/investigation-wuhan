// import queryString from 'query-string';
import * as gameService from '../services/jdGame';

export default {
  namespace: 'jdGame',
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
