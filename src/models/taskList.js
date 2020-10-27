// import queryString from 'query-string';
import * as taskService from '../services/taskList';

export default {
  namespace: 'taskList',
  state: {},
  subscriptions: {
    setup({ history, dispatch }, onError) {
    }
  },
  effects: {
    *queryList({ payload }, { call, put }) {
      const queryRes = yield call(taskService.queryList, payload);
      yield put({
        type: 'querySuccess',
        payload: {
          queryResult: queryRes,
        },
      });
    },
    *add({ payload }, { call, put }) {
      const queryRes = yield call(taskService.addAction, payload);
      yield put({
        type: 'querySuccess',
        payload: {
          addResult: queryRes,
        },
      });
    },
    *detailList({ payload }, { call, put }) {
      const queryRes = yield call(taskService.queryDetailList, payload);
      yield put({
        type: 'querySuccess',
        payload: {
          detailResult: queryRes,
        },
      });
    },
    *tradeInfoList({ payload }, { call, put }) {
      const queryRes = yield call(taskService.queryTradeInfoList, payload);
      yield put({
        type: 'querySuccess',
        payload: {
          tradeInfoResult: queryRes,
        },
      });
    },
    *baseInfoList({ payload }, { call, put }) {
      const queryRes = yield call(taskService.queryBaseInfoList, payload);
      yield put({
        type: 'querySuccess',
        payload: {
          baseInfoResult: queryRes,
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
