import axios from '../utils/axios';
import Api from '../configs/api';

export function queryList(params) {
  // if(__DEV__){
  //   let data = Mock.mock({
  //     "data": {
  //       "list|10": [
  //         {
  //           "id": "@id",
  //           "jdOrderNo|1": ['123456789','789456123'],
  //           "facePrice|1": ['100','10'],
  //           "quantity|1": ['100','10'],
  //           "orderTime|1": ['2018-02-28 12:12:12','2018-02-28 13:10:01'],
  //           "cardInfos": "@id",
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
  return axios.get(configs.host.policeSearch2 + Api.getJdTelFareList, {params: params});
}
export function downExcel(params) {
  return axios.get(configs.host.policeSearch2 + Api.DownJDCardInfo, {params: params});
}
