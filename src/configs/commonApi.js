export default {
  /* *************************导航通用************************* */
  getApps: '/api/application/authlist', // 获取所有已经授权的应用的接口 弃用
  getAuthApps: '/api/Apps', // 获取所有已经授权的应用的接口
  getAuthMenus: '/api/Module/modules/getauthlist', // 获取所有已经授权的应用的接口 xx
  setCustomApps: (appId, isShow) => `/api/Apps/${appId}/${isShow}`, // 501
  getMenus: (appId) => `/api/module/modules/${appId}`,
  searchMenus: '/api/system/module',

  getMemberInfo: '/api/organize/users/GetUserInfo',
  userinfo: '/api/organize/users/userinfo',
  modifyUserinfo: '/api/BaseSystem/BaseUser/modifyUserinfo', // miss
  modifyPassword: '/api/BaseSystem/BaseUser/RevisePassword', // miss

  getFavs: '/api/organize/usercollects',
  delFav: id => `/api/organize/usercollects/${id}`,
  saveFav: '/api/organize/usercollects',

  getUserInfo: '/api/passport/getuserinfo',
  authCode: '/api/AuthorizationCode',
  auth: '/oauth/authorize',
  logout: '/user/logout',
  changepwd: '/api/passport/changepwd',
  getAuthButtons: '/api/module/modulebutton/getauthlist', // 根据菜单获取页面按钮权限
  getCompanies: '/api/organize/organizes/nameandidlist',
  switchOrganize: (organizeId) => `/api/organize/users/SwitchOrganize/${organizeId}`,
  /* *************************导航通用************************* */
}
