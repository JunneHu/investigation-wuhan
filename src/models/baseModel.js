import { message } from 'antd';
import _ from 'lodash';
import Promise from 'bluebird';

/*
  primaryKey: model的主键id 默认为'id'
  service: 对应的ajax请求服务类
*/
export default class BaseModel {
  constructor(service, primaryKey) {
    this.srv = service;
    this.state = {};
    this.primaryKey = primaryKey || 'id';

    this.subscriptions = {
      setup({history, dispatch}, onError) {
        return history.listen(() => {
        });
      },
    };
   
    this.effects ={};
    this.effects.reqCreate = (function* reqCreate(action, {call, put}) {
        const res = yield this.srv.create(action.payload || {}).catch(err => {
          return err;
        });

        if(res.code !='0' || !res.data) {
          return message.error(res.message || '添加数据失败');
        } else {
          message.info('添加数据成功');
        }

        yield put({
          type: 'reqRetrieve',
          payload: action.pageConditions || {},
        });
    }).bind(this);

    this.effects.reqUpdate = (function* reqUpdate(action, {call, put}) {
      var payload = action.payload || {};
      const res = yield this.srv.update(payload[this.primaryKey], action.payload || {}).catch(err => {
        return err;
      });

      if(res.code !='0' || !res.data) {
        return message.error(res.message || '更新数据失败');
      } else {
        message.info('更新数据成功');
      }

      yield put({
        type: 'update',
        payload: action.payload || {},
      });
    }).bind(this);

    this.effects.reqToggleEnable = (function* reqToggleEnable(action, {call, put}) {
      var payload = action.payload || {};
      const res = yield this.srv.toggleEnable(payload[this.primaryKey], !payload.isDisable).catch(err => {
        return err;
      });

      if(res.code !='0' || !res.data) {
          if(payload.isDisable === true){
              return message.error(res.message || '禁用设置失败')
           }else if(payload.isDisable === false){
              return message.error(res.message || '启用设置失败')
          }
      } else {
          if(payload.isDisable === true){
              message.info('启用设置成功');
          }else if(payload.isDisable === false){
              message.info('禁用设置成功');
          }
      }

      yield put({
        type: 'reqRetrieve',
        payload: action.pageConditions || {},
      });
    }).bind(this);

    this.effects.reqRemove = (function* reqRemove(action, {call, put}) {
        var payload = action.payload || {};
        var primaryKey = this.primaryKey;
        const res = yield this.srv.remove(payload[primaryKey]).catch(err => {
          return err;
        });

        if(res.code !='0' || !res.data) {
          return message.error(res.message || '删除数据失败');
        } else {
          message.info('删除数据成功');
        }

        yield put({
          type: 'reqRetrieve',
          payload: action.pageConditions || {
          },
        });
    }).bind(this);

    this.effects.reqGetDetail = (function* reqRemove(action, {call, put}) {
        var payload = action.payload || {};
        var primaryKey = this.primaryKey;
        if(!payload || !payload[primaryKey]) {
          return message.error('获取详情失败');
        }
        const res = yield this.srv.getDetail(payload[primaryKey], payload).catch(err => {
          return err;
        });

        if(res.code !='0' || !res.data) {
          return message.error(res.message || '获取数据失败');
        }

        yield put({
          type: 'getDetail',
          payload: {
            selectedModel: res.data
          },
        });
    }).bind(this);

    this.effects.reqMultiRemove = (function* reqRemove(action, {call, put}) {
        var payload = action.payload || {};
        var primaryKey = this.primaryKey;
        const res = yield this.srv.multiRemove(payload.ids || payload).catch(err => {
          return err;
        });

        if(res.code !='0' || !res.data) {
          return message.error(res.message || '删除数据失败');
        } else {
          message.info('删除数据成功');
        }

        yield put({
          type: 'reqRetrieve',
          payload: action.pageConditions,
        });
    }).bind(this);

    this.effects.reqRetrieve = (function* reqRetrieve (action, {call, put}) {
      const res = yield this.srv.retrieve( action.payload || {}).catch(err => {
        return err;
      });
      if(res.code !='0' || !res.data) {
        return message.error(res.message || '获取数据失败');
      }

      if(action.payload && action.payload.page > 1 && res.data.list.length == 0) {
        action.payload.page = action.payload.page - 1;
        yield put({
          type: 'reqRetrieve',
          payload: action.payload,
        });
      } else {
        yield put({
          type: 'retrieve',
          payload: res.data,
        });
      }
      
    }).bind(this);

    this.reducers = {
      retrieve(state, {payload}) {
        var p = {...state, ...payload};
        return p;
      },
      getDetail(state, {payload}) {
        var p = {...state, ...payload};
        return p;
      }, 
    };

    this.reducers.update = (function(state, {payload}) {
      primaryKey = this.primaryKey;
      var p = {...state };
      var list = [...p.list];
      var xModel = _.find(list, each => each[primaryKey] == payload[primaryKey]);
      if(xModel) {
        for(var key in payload) {
          if(xModel.hasOwnProperty(key)) {
            xModel[key] = payload[key];
          }
        }
      }
      return p;
    }).bind(this);
  }
} 
