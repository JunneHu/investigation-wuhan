//预发布环境
var configs = {
  name: 'SteamManager.Web',
  version: '1.0.0-rc.0',
  productName: '福禄管家-福禄steam饰品交易平台',
  productVersion: 'X1',
  clientId:'10000026',
  accessToken:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE3OEJBNEJGMDZGQzkzMDY1QUEyNTgyRjU1QzcyMkE2IiwiY2xpZW50X2lkIjoiMTAwMDAwMDMiLCJuYW1lIjoiODAwMSIsIm5pY2tuYW1lIjoi56ym54aZIiwicGhvbmVfbnVtYmVyIjoiMTg2MjcxMTU2NTciLCJlbWFpbCI6Ijc3NTE0NTU0QHFxLmNvbSIsInJvbGUiOiJVc2VyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoxNTMxIiwiYXVkIjoiYXBpIiwiZXhwIjoxNTIxNzcyNDYxLCJuYmYiOjE1MTY1ODg0NjF9.cfYs3h1KmMdExHPNevec1s2CLOSEcAuN1aIXiTiouhc',
  host: {
    passport:{
      'getUserInfo': 'http://120.27.192.107:8087',//找通行证拿用户信息
      'auth': 'http://120.27.192.107:8090', // 找通行证拿code
      'authCode': 'http://118.178.35.133:8096/pe-investigation' //根据code找业务线拿token
    },
    webapi:'http://47.96.62.187:10081',//开发平台接口
    common:'http://47.96.62.187:10080',//左侧导航和头部导航 福禄管家通用接口

    policeSearch2: 'http://10.0.1.30:10087', // 武汉警企协查
  }
};
