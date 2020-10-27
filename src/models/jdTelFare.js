// import queryString from 'query-string';
import * as telFareService from '../services/jdTelFare';

export default {
  namespace: 'jdTelFare',
  state: {},
  effects: {
    *queryList({payload}, {call, put}) {
        const queryRes = yield call(telFareService.queryList, payload);
        yield put({
          type: 'querySuccess',
          payload: {
            queryResult: queryRes,
          },
        });
    },
    *downExcel({payload}, {call, put}) {
      const queryRes = yield call(telFareService.downExcel, payload);
      yield put({
        type: 'querySuccess',
        payload: {
          downResult: queryRes,
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
