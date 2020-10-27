import axios from '../utils/axios';
import Api from '../configs/api';

export function queryList(params) {
  // if(__DEV__){
  //   let data = Mock.mock({
  //     "data": {
  //       "list|10": [
  //         {
  //           "id": "@id",
  //           "time": "@datetime",
  //           "name": '@csentence(5)',
  //           "total|1-100": 100,
  //           "account": "@id",
  //           "buyerIp": "@id",
  //           "status|1": [1, 2, 3, 4],
  //           "cardInfo": "@cparagraph(1, 3)"
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
  return axios.get(configs.host.policeSearch2 + Api.getJdGameList, {params: params}); 
}
