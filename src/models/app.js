// import queryString from 'query-string';
import * as appService from '../services/app';


export default {
  namespace: 'app',
  state: {},
  reducers: {
    getUserInfoStart(state, { payload }) {
      return { ...state, ...payload, fetching: true }
    },
    getUserInfoEnd(state, { payload }) {
      return { ...state, ...payload, fetching: false }
    },
    authStart(state, { payload }) {
      return { ...state, ...payload, fetching: true }
    },
    authEnd(state, { payload }) {
      return { ...state, ...payload, fetching: false }
    },
  },
  effects: {
    *getUserInfo({ payload }, { call, put }) {
      console.log('getUserInfo....')
      yield put({ type: 'getUserInfoStart' })
      const userInfo = yield call(appService.getUserInfo, payload);
      yield put({ type: 'getUserInfoEnd', payload: { userInfo } })
    },
    *auth({ payload }, { call, put }) {
      console.log('auth....')
      yield put({ type: 'authStart' })
      // if(payload.redirect_uri) {
      //   payload.redirect_uri = encodeURIComponent(payload.redirect_uri)
      // }
      const authCode = yield call(appService.auth, payload);
      yield put({ type: 'authEnd', payload: { authCode } })
    },
  },
}
