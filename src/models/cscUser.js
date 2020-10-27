// import queryString from 'query-string';
import * as cscService from '../services/cscUser';

export default {
  namespace: 'cscUser',
  state: {},
  effects: {
    *getSCSUserInfo({ payload }, { call, put }) {
      const queryRes = yield call(cscService.getSCSUserInfo, payload);
      yield put({
        type: 'querySuccess',
        payload: {
          getCSCUserInfoResult: queryRes,
        },
      });
    },
    *getCSCStockList({ payload }, { call, put }) {
      const queryRes = yield call(cscService.getCSCStockList, payload);
      yield put({
        type: 'querySuccess',
        payload: {
          getCSCStockListResult: queryRes,
        },
      });
    },
    *getUserImg({ payload }, { call, put }) {
      const queryRes = yield call(cscService.getUserImg, payload);
      yield put({
        type: 'querySuccess',
        payload: {
          getUserImg: queryRes,
        },
      });
    },
    // *getWithdrawInfo({ payload }, { call, put }) {
    //   const queryRes = yield call(cscService.getWithdrawInfo, payload);
    //   yield put({
    //     type: 'querySuccess',
    //     payload: {
    //       getWithdrawInfoResult: queryRes,
    //     },
    //   });
    // },
    // *getLoginIp({ payload }, { call, put }) {
    //   const queryRes = yield call(cscService.getLoginIp, payload);
    //   yield put({
    //     type: 'querySuccess',
    //     payload: {
    //       getLoginIpResult: queryRes,
    //     },
    //   });
    // },
    // *getTradeInfo({ payload }, { call, put }) {
    //   const queryRes = yield call(cscService.getTradeInfo, payload);
    //   yield put({
    //     type: 'querySuccess',
    //     payload: {
    //       getTradeInfoResult: queryRes,
    //     },
    //   });
    // },
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
