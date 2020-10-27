import commonApi from './commonApi';

export default {
   ...commonApi,

   commitQueryTaskList: '/task/v1/commitQueryTaskList', // 获取任务列表
   commitQueryTask: '/task/v1/commitQueryTask', // 添加任务
   contentDetailList: '/result/v1/contentDetailList', // 获取详情列表
   tradeInfoList: '/result/v1/tradeInfoList', // 获取交易信息列表
   detailTradeInfoList: '/result/v1/detailTradeInfoList', // 获取交易信息列表
   baseInfoList: '/result/v1/baseInfoList', // 获取基本信息详情
   detailBaseInfoList: '/result/v1/detailBaseInfoList', // 获取基本信息详情

  getJdGameList: '/api/CardInfo/GetJDOrderInfo', // 京东网游订单列表
  DownJDOrderInfo: '/api/CardInfo/DownJDOrderInfo',
  getJdTelFareList: '/api/CardInfo/GetJDCardInfo', // 京东话费卡密列表
  DownJDCardInfo: '/api/CardInfo/DownJDCardInfo',

  getGameCompany: '/api/CardInfo/GetAppleQSUserInfo', // 手游-千手商户信息查询
  DownAppleQSUserInfo: '/api/CardInfo/DownAppleQSUserInfo',
  getGamePhoneCard: '/api/CardInfo/GetAppleCardInfo', // 手游-苹果卡卡密查询
  DownAppleCardInfo: '/api/CardInfo/DownAppleCardInfo', 

  ImportCSCCard: '/api/CardInfo/ImportCSCCard', // 导入CSC的卡

  getCscCard: '/api/CardInfo/SearchCSCCard', // csc卡号查询
  DownCSCCard: '/api/CardInfo/DownCSCCard', 

  cSCUserInfoQueryState: '/api/CardInfo/CSCUserInfoQueryState',  // 查看查询审核状态
  
  GetCSCStockList: '/api/CardInfo/GetCSCStockList', // 获取通道信息
  getSCSUserInfo: '/api/CardInfo/SearchCSCUserInfo', // 用户信息
  DownCSCUserInfo: '/api/CardInfo/DownCSCUserInfo',
  getUserImg: '/api/CardInfo/GetUserImg' // 获取CSC用户图片
  /*********财务管理模块end**********/
};
