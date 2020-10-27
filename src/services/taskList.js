import axios from '../utils/axios';
import Api from '../configs/api';

export function queryList(params) {
  // if (__DEV__) {
  //   let data = Mock.mock({
  //     "code": 1,
  //     "message": "查询成功",
  //     "data|10": [
  //       {
  //         "id": "@id",
  //         "type|1": ['0', '1', '2'],
  //         "content|1": ['420115856985623/452365211456621', '12365885566/12345678989', '5656226541255632', '4217002870004668438/4217002870004668556'],
  //         "createtime": "@datetime",
  //         "status|1": ['0', '1', '2', '3'],
  //         "operation_type|1": ['0', '1']
  //       }
  //     ],
  //     "count": 2305,
  //     "total": 46
  //   });
  //   return Promise.resolve(data);
  // }
  return axios.post(configs.host.policeSearch + Api.commitQueryTaskList, params);
}
export function addAction(params) {
  // if (__DEV__) {
  //   let data = Mock.mock({
  //     "code": 1,
  //     "message": "提交成功",
  //   });
  //   return Promise.resolve(data);
  // }
  return axios.post(configs.host.policeSearch + Api.commitQueryTask, params);
}

export function queryDetailList(params) {
  // if (__DEV__) {
  //   let data = Mock.mock({
  //     "code": 1,
  //     "message": "查询成功",
  //     "data|10": [
  //       {
  //         "id": "@id",
  //         "content": '@natural',
  //       }
  //     ],
  //     "count": 5912,
  //     "total": 14
  //   });
  //   return Promise.resolve(data);
  // }
  return axios.post(configs.host.policeSearch + Api.contentDetailList, params);
}

export function queryTradeInfoList(params) {
  // if (__DEV__) {
  //   let data = Mock.mock({
  //     "code": 1,
  //     "message": "查询成功",
  //     "data|10": [
  //       {
  //         "id": "@id",
  //         "ordertime": "@datetime",
  //         "account": "@id",
  //         "goodsname": "@csentence(5)",
  //         "purchase_num|1-100": 100,
  //         "amount_money|1-100": 100,
  //         "status|1": ['成功', '失败', '可疑', '未处理', '处理中'],
  //       }
  //     ],
  //     "count": 5912,
  //     "total": 14
  //   });
  //   return Promise.resolve(data);
  // }
  if (params.content) {
    return axios.post(configs.host.policeSearch + Api.detailTradeInfoList, params);
  } else {
    return axios.post(configs.host.policeSearch + Api.tradeInfoList, params);
  }
}
export function queryBaseInfoList(params) {
  // if (__DEV__) {
  //   let data = Mock.mock({
  //     "code": 1,
  //     "message": "查询成功.",
  //     "data|0-4": [
  //       {
  //         "source_type|1": [0, 1, 2, 3],
  //         "source_name|1": ['卡门网站点信息', '云接口', '牵手平台', '寄售卡'],
  //         "username|0-1": "@csentence(5)",
  //         "phone|0-1": "15992874762",
  //         "card_no|0-1": "@id",
  //         "bank_no|0-1": "@id",
  //         "organizename|0-1": "公司名称_auL8Y",
  //         "siteid|0-1": "@id",
  //         "sitename|0-1": "站点名称_WuuqzkB2",
  //         "register_time|0-1": "@datetime",
  //         "cloud_api_code|0-1": "@id",
  //         "cloud_api_name|0-1": "接口名称_eDziW",
  //         "sex|1": [0, 1],
  //       },
  //     ],
  //     "count": 1,
  //     "total": 4,
  //   });
  //   return Promise.resolve(data);
  // }
  if (params.content) {
    return axios.post(configs.host.policeSearch + Api.detailBaseInfoList, params);
  } else {
    return axios.post(configs.host.policeSearch + Api.baseInfoList, params);
  }
}
