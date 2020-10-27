import axios from '../utils/axios';
import Api from '../configs/api';

export function queryList(params) {
  // if(__DEV__){
  //   let data = Mock.mock({
  //     "data": {
  //       "list|10": [
  //         {
  //           "id": "@id",
  //           "kmOrderId": "@id",
  //           "rechargePrice|1-100": 100,
  //           "payAccount": "@id",
  //           "payStatus|1": [0,1],
  //           "startTime": "@datetime",
  //           "endTime": "@datetime",
  //           "bankOrderId": "@id",
  //           "payAddress": "@ip",
  //           "description": "@cparagraph(1, 3)",
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
  //    });
  //    return Promise.resolve(data);
  // }
  return axios.get(configs.host.policeSearch2 + Api.getGameCompany, { 'params': params});
}
