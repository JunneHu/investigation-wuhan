import axios from '../utils/axios';
import Api from '../configs/api';

export function queryList(params) {
  // if (__DEV__) {
  //   let data = Mock.mock({
  //     "data": { ////cardId passName postUserAccount postTime usetTme realFaceValue price useWay
  //       "list|10": [
  //         {
  //           "id": "@id",
  //           'cardId': "@id",
  //           "passName": '@csentence(5)',
  //           "postUserAccount": "@natural",
  //           "postTime": "@datetime",
  //           "usetTme": "@datetime",
  //           "realFaceValue|0-100": 100,
  //           "price|0-100": 100,
  //           "useWay|1": ['通卡科技', '渠道1', '渠道2', '渠道3'],
  //         }
  //       ],
  //       "total": 30,
  //       "current": 1,
  //       "pageSize": 10,
  //       "pageTotal": 3
  //     },
  //     "statistics": {
  //       "total": 30
  //     },
  //     "code": "0",
  //     "message": "string",
  //     "messageType": "none"
  //   });
  //   return Promise.resolve(data);
  // }
  return axios.get(configs.host.policeSearch2 + Api.getCscCard, { 'params': params });
}
export function importCSCCard(params) {
  return axios.post(configs.host.policeSearch2 + Api.ImportCSCCard, params);
}
