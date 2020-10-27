// import queryString from 'query-string';
import * as service from '../services/publicLayout';
import { getUuid } from '../utils/decorator';
import {message} from 'antd';
import _ from 'lodash';
export default {
  namespace: 'publicLayout',
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
    //目前收藏没有使用分页 故头部导航收藏和收藏管理使用的是同一个数据源 
    //同时可以更加该数据源判断是否已经收藏
    *reqTopFavs(action, {call, put}) {
      const res = yield call(service.getFavs);

      if(res.code !='0' || !res.data) {
        return message.error('获取收藏失败' );;
      }
      
      yield put({
        type: 'getTopFavs',
        payload: {
          topFavs: res.data.list || []
        }
      });
    },

    *reqGetFavs(action, {call, put}) {
      const res = yield service.getFavs() //call(service.getFavs);

      if(res.code !='0' || !res.data) {
        return message.error('获取收藏失败' );;
      }

      yield put({
        type: 'getFavs',
        payload: {
          favs: res.data.list || []
        }
      });
    },

    *reqDelFav(action, {call, put}) {
      const res = yield call(service.delFav, action.payload);

      if (res.code !='0' || !res.data) {
        return message.error(res.message || '取消收藏失败' );
      }

      message.success('取消收藏成功');

      yield put({
        type: 'reqGetFavs',
      });
    },

    *reqSaveFav(action, { call, put }) {

      const { payload = {} } = action;

      const fav = {
        collectModId: payload.moduleId,
        collectTitle: payload.fullName,
        collectSrc: payload.urlAddress,
        host: payload.host,
      };

      if (payload.isMenu) {
        fav.collectSrc = `/iframe/${payload.moduleId}`;
      }

      const res = yield call(service.saveFav, fav);

      if (res.code !='0' || !res.data) {
        return message.error(res.message || '收藏失败' );
      }
      message.success('收藏成功');
      yield put({
        type: 'reqGetFavs',
        payload: fav
      });
    },
    *reqApps(action, {call, put}) {
      const res = yield call(service.fetchApps);

      if(res.code !='0' || !res.data) {
        return message.error('获取数据失败');
      }

      yield put({
        type: 'getApps',
        payload: {
          app: res.data.list || [],
        },
      });
    },
    *reqSetCustomApps(action, {call, put}) {
      var payload = action.payload;
      if(!payload || !payload.appId) {
        return message.error('自定义应用参数错误');
      }
      const res = yield call(service.setCustomApps, payload.appId, payload.isShow);
      if(res.code !='0' || !res.data) {
        return message.error('用户设置失败');
      }

      yield put({
        type: 'setCustomApps',
        payload: action.payload,
      });
    },
    *reqMenus(action, {call, put}) {
      const res = yield call(service.fetchMenus, action.payload);
      if(res.code !='0' || !res.data) {
        return message.error('获取菜单失败');
      }

      yield put({
        type: 'getMenus',
        payload: {
          menus: res.data.list || [],
        }
      });
    },
    /*
      1：获取所有的授权的菜单
      2：根据菜单从应用中筛选出授权的应用
      3：根据有权限的应用id获取应用列表
      4：层级渲染
    */
    *reqInitLeftNav(action, {call, put}) {
      const res = yield call(service.getAuthApps, {rows:1000});
      if(res.code !='0' || !res.data) {
        return message.error('获取所有应用数据失败');
      }

      var xApps = res.data.list || [];

      const mRes = yield call(service.getAuthMenus);

      if(mRes.code !='0' || !mRes.data) {
        return message.error('获取所有授权菜单数据失败');
      }

      const xRes = yield call(service.getCompanies);
      if(xRes.code !==  '0' || !xRes.data) {
        return message.error('获取公司列表数据失败');
      }

      const collectRes = yield service.getFavs();
      if(collectRes.code !==  '0' || !collectRes.data) {
        return message.error('获取收藏数据失败');
      }

      var xMenus = mRes.data.list || [];

      var xAuthAppIds = _.uniq(xMenus.map(each => each.appId));

      var authApps = xApps.filter(each => xAuthAppIds.indexOf(each.appId) >= 0);

      yield put({
        type: 'initLeftNav',
        payload: {
          app: authApps || [],
          menus: xMenus,
          favs:collectRes.data.list || [],
          organizes: xRes.data.list || []
        },
      });

    },
    *reqSearchMenus(action, {call, put}) {
      yield put({
        type: 'searchMenus',
        payload: {
          searchMenus: [],
          isSearching: true,
        }
      });
      const res = yield call(service.searchMenus, action.payload);
      if(res.code !='0' || !res.data) {
        return message.error('搜索菜单失败');
      }
      
      yield put({
        type: 'searchMenus',
        payload: {
          searchMenus: res.data.list || [],
          isSearching: false,
        }
      });
    },

    *reqUserinfo(action, {call, put}) {
      const res = yield call(service.getUserinfo, action.payload);

      if(res.code !='0' || !res.data) {
        return message.error('获取用户信息失败');
      }
      
      yield put({
        type: 'getUserinfo',
        payload: {
          userinfo: res.data
        },
      });
    },

    *reqModifyUserinfo(action, {call, put}) {
      const res = yield call(service.modifyUserinfo, action.payload);

      if(res.code !='0' || !res.data) {
        return message.error(res.message || '修改失败');
      }
      
      yield put({
        type: 'modifyUserinfo',
        payload: action.payload,
      });
    },

    *reqModifyPassword(action, {call, put}) {
      const res = yield call(service.modifyPassword, action.payload);

      if(res.code !='0' || !res.data) {
        return message.error(res.message || '密码修改失败');
      }
      
      yield put({
        type: 'modifyUserinfo',
        payload: action.payload,
      });
    },

    *reqSwitchOrganize(action, {call, put}) {
      if(!action.payload || !action.payload.id) {
        return message.error('请选择需要切换的公司');
      }

      const res = yield call(service.switchOrganize, action.payload.id);

      if(res.code !='0' || !res.data) {
        return message.error(res.message || '切换公司失败');
      }

      message.success(res.message || '公司切换成功');

      yield put({
        type: 'success',
        payload: {
          currentOrganize: action.payload
        }
      });
    },

    *setCurrentMenu(action, { call, put }) {
      var menu = action.payload || {};

      yield put({
        type: 'setCurrentMenuStart',
        payload: {
          currentMenu: menu,
          authBtns:[]
        }
      });

      if(menu.moduleId) {
        const res = yield call(service.authBtn, {moduleid: menu.moduleId});

        if(res.code !='0' || !res.data ) {
          return message.error(res.message || '获取页面按钮权限失败');
        }

        yield put({
          type: 'setCurrentMenuEnd',
          payload: {
            authBtns:res.data.list || []
          }
        });
      } else {
        yield put({
          type: 'setCurrentMenuEnd',
          payload: {
            authBtns: []
          }
        });
      }
    },
  },
  reducers: {
    success(state, {payload}) {
      return {
        ...state,
        ...payload,
      };  
    },
    getTopFavs(state, {payload}) {
      return {
        ...state,
        ...payload,
      };  
    },
    getFavs(state, {payload}) {
      return {
        ...state,
        ...payload,
      };  
    },
    setCurrentMenuStart(state, {payload}) {
      var p = {...state, ...payload};
      return p;
    },
    setCurrentMenuEnd(state, {payload}) {
      var p = {...state, ...payload};
      return p;
    },

    delFav(state, {payload}) {
      var favs = JSON.parse(JSON.stringify(state.favs || []));
      var topFavs = JSON.parse(JSON.stringify(state.topFavs || []));

      favs = _.reject(favs, each => each.id == payload );
      topFavs = _.reject(topFavs, each => each.id == payload );
      return {
        ...state, favs, topFavs
      };  
    },

    saveFav(state, {payload}) {
      var topFavs = JSON.parse(JSON.stringify(state.topFavs || []));

      var p = _.find(topFavs, each => each.id == payload.id);

      if(!p) {
        topFavs.unshift(payload);
      }
      
      return {
        ...state, topFavs
      };  
    },

    /*
      payload格式: {id:'', fullName:'', title:'', pathname:''}
    */
    getHints(state, {payload}) {
      var storage=window.localStorage;
      if(!storage) return;

      var hints = JSON.parse(storage.getItem("hint") || '[]');
      hints = _.uniqBy(hints, 'id'); //去重

      if(payload && payload.id) {
        hints = _.reject(hints, each => each.id == payload.id);  //如果存在相同记录 则删除以前的
        hints.unshift(payload)
      }

      hints = hints.slice(0, 50)
      storage.setItem("hint",JSON.stringify(hints));
      return {
        ...state,
        hints,
      };  
    },

    delHint(state, {payload}) {
      var storage=window.localStorage;
      if(!storage) return;

      var hints = JSON.parse(storage.getItem("hint") || '[]');
      hints = _.reject(hints, each => each.id == payload);

      storage.setItem("hint",JSON.stringify(hints));

      return {
        ...state,
        hints,
      };  
    },

    getApps(state, {payload}) {
      var p = {
        ...state,
        ...payload,
      };

      return p
    },
    initLeftNav(state, {payload}) {
      var p = {
        ...state,
        ...payload,
      };

      return p
    },
    getMenus(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    getBreadcrumb(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    searchMenus(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    setCustomApps(state, {payload}) {
      var xState ={...state}
      var p = JSON.parse(JSON.stringify(state.app));

      var xApp = p.find(each => each.appId == payload.appId);
      if(xApp) {
        xApp.isCustomerShow = payload.isShow;
      }

      xState.app = p;
      return xState;
    },

    getUserinfo(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },

    modifyUserinfo(state, {payload}) {
      message.success('密码修改成功');

      return {
        ...state,
        ...payload,
      };
    },
    
    addTabPage(state, {payload}) {
      var tabPages = state.tabPages || [];
      var curr = _.find(tabPages, each => each.pathname === payload.pathname);

      if (!curr) {
        tabPages.push(payload);
      }

      if (tabPages.filter(each => !!each.pathname).length > 6) {

        var index = _.findIndex(tabPages, each => each.pathname && each.pathname !== '/');
        tabPages[index] = {};
      }

      state.tabPages = [...tabPages];

      return {
        ...state,
      };
    },

    // 删除的时候不移除 只置空 这样可以避免页面的TabComponent重新render
    delTabPage(state, {payload}) {
      var index = _.findIndex(state.tabPages, each => each.pathname === payload.activeTabKey);
      if(index >= 0) {
        state.tabPages.splice(index, 1, {});
        state.tabPages = [...state.tabPages];
      }
     
      return {
        ...state,
      };
    },
  },
};
