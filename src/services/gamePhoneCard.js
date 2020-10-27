import axios from '../utils/axios';
import Api from '../configs/api';

export function queryList(params) {
  // if(__DEV__){
  //   let data = Mock.mock({
  //     "data": {
  //       "list|10": [
  //         {
  //           "id": "@id",
  //           "cardNo": "@id",
  //           "facePrice|1-100": 100,
  //           "cardPwd|1-100": 100,
  //           "currencyType|1-100": 100,
  //           "realPrice|1-100": 100,
  //           "description": "原因呢",
  //           "importTime": "@datetime",
  //           "usingFinishTime": "@datetime",
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
  return axios.get(configs.host.policeSearch2 + Api.getGamePhoneCard, { 'params': params});
}
