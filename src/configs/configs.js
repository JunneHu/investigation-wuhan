//本地开发环境
var configs = {
  name: 'SteamManager.Web',
  version: '1.0.0-beta.0',
  productName: '福禄管家-警企协查平台',
  productVersion: 'X1',
  clientId:'10000026',
  authorId:'10000026',
  accessToken:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE3OEJBNEJGMDZGQzkzMDY1QUEyNTgyRjU1QzcyMkE2IiwiY2xpZW50X2lkIjoiMTAwMDAwMDMiLCJuYW1lIjoiODAwMSIsIm5pY2tuYW1lIjoi56ym54aZIiwicGhvbmVfbnVtYmVyIjoiMTg2MjcxMTU2NTciLCJlbWFpbCI6Ijc3NTE0NTU0QHFxLmNvbSIsInJvbGUiOiJVc2VyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoxNTMxIiwiYXVkIjoiYXBpIiwiZXhwIjoxNTIxNzcyNDYxLCJuYmYiOjE1MTY1ODg0NjF9.cfYs3h1KmMdExHPNevec1s2CLOSEcAuN1aIXiTiouhc',
  host: {
    passport:{
      'getUserInfo': 'http://10.0.0.138:8087',//找通行证拿用户信息
      'auth': 'http://10.0.0.138:8090',// 找通行证拿code
      'authCode': 'http://10.0.1.30:10087'//根据code找业务线拿token
    },
    common:'http://dev.steward.k8s.ichnb.com',//左侧导航和头部导航 福禄管家通用接口
    steward:'http://test.steward.k8s.ichnb.com',
    webapi:'http://dev.openplatform.k8s.ichnb.com',//开发平台接口
    log:'http://dev.log.k8s.ichnb.com',
    
    policeSearch: 'http://10.0.1.151:8096/pe-investigation', // 南京警企协查
    policeSearch2: 'http://10.0.1.30:10087', // 武汉警企协查
  }
};


