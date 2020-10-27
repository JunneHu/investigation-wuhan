import axios from '../utils/axios';
import Api from '../configs/api';

export function getSCSUserInfo(params) {
//  if(__DEV__){
//     let data = Mock.mock({
//       "data": {
//         "list": [
//           {
//             "moduleCount": {
//               "userInfo": 0,
//               "bankInfo": 0,
//               "cashInfo": 0,
//               "loginIpInfo": 0,
//               "userTradeInfo": 0
//             },
//             "userInfo": {
//               "userAccount": "string",
//               "userName": "string",
//               "userTel": "string",
//               "userQQ": "string",
//               "registTime": "2018-03-13T08:54:36.746Z",
//               "registIp": "string",
//               "lastLoginTime": "2018-03-13T08:54:36.746Z",
//               "lastLoginIp": "string"
//             },
//             "bankInfo": [
//               {
//                 "bankRegistName": "string",
//                 "bank": "string",
//                 "bankNo": "string"
//               }
//             ],
//             "cashInfo": [
//               {
//                 "applyCashTime": "string",
//                 "cashBank": "string",
//                 "cashBankNo": "string",
//                 "cashMoney": "string",
//                 "processTime": "string"
//               }
//             ],
//             "loginIpInfo": [
//               {
//                 "loginTime": "string",
//                 "loginIp": "string"
//               }
//             ],
//             "userTradeInfo": [
//               {
//                 "cardNumber": "string",
//                 "stockName": "string",
//                 "userTradeAccount": "string",
//                 "storageTime": "string",
//                 "trueparvalue": "string",
//                 "settlemoney": "string",
//                 "siteName": "string"
//               }
//             ]
//           }
//         ]
//       },
//       "statistics": {
//         "total": 30
//       },
//       "code": "0",
//       "message": "string",
//       "messageType": "info"
//      });
//      return Promise.resolve(data);
//   }
  return axios.get(configs.host.policeSearch2 + Api.getSCSUserInfo, {params: params});
}
export function getCSCStockList(params) {
  //   if(__DEV__){
  //   let data = Mock.mock({
  //     "data": {
  //       "list|10": [
  //         {
  //           "stockID": "@id",
  //           "stockName": '@csentence(5)',
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
  return axios.get(configs.host.policeSearch2 + Api.GetCSCStockList, { 'params': params });
}
export function getUserImg(params) { 
  return axios.get(configs.host.policeSearch2 + Api.getUserImg, { 'params': params });
}

// export function getWithdrawInfo(params) {
//   if(__DEV__){
//   let data = Mock.mock({
//     "data": {
//       "list|10": [
//         {
//           "id": "@id",
//           "withdrawTime": "@datetime",
//           "bankName": '@csentence(5)',
//           "bankCard": "@id",
//           "withdrawPrice|0-100": 100,
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
// return axios.get(Api.getWithdrawInfo, { 'params': params});
// }

// export function getLoginIp(params) {
//   if(__DEV__){
//   let data = Mock.mock({
//     "data": {
//       "list|10": [
//         {
//           "id": "@id",
//           "loginTime": "@datetime",
//           "loginIp": "@ip",
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
// return axios.get(Api.getLoginIp, { 'params': params});
// }

// export function getTradeInfo(params) {
//   if(__DEV__){
//   let data = Mock.mock({
//     "data": {
//       "list|10": [
//         {
//           "id": "@id",
//           "cardId": "@id",
//           "passName": '@csentence(5)',
//           "postUserAccount": "@natural",
//           "postTime": "@datetime",
//           "realFaceValue|0-100": 100,
//           "endPrice|0-100": 100,
//           "usePass": "@csentence(3)",
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
// return axios.get(Api.getTradeInfo, { 'params': params});
// }
