// import queryString from 'query-string';
import * as asyncService from '../services/async';

export default {
  namespace: 'async',
  state: {},
  subscriptions: {
    setup({history, dispatch}, onError) {
      // return history.listen( ({pathname, search}) => {
      //   const query = queryString.parse(search);
      //   if (pathname === '/') {
      //
      //   }
      // });
    }
  },
  effects: {
    *tests(action, {call, put}) {
      const testRes = yield call(asyncService.async);
      console.log(testRes);
      yield put({
        type: 'test',
        payload: testRes,
      });
    },
  },
  reducers: {
    test(state, {payload}) {
      console.log('payload',payload);
      return {
        ...state,
        ...payload,
      };
    }
  },
};
