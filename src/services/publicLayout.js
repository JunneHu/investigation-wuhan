import axios from '../utils/axios';
import { getUuid } from '../utils/decorator';
import Api from '../configs/api';

/**********用户收藏start*************/
export function getFavs() {
  //mockGetFavs();
  return axios.get(configs.host.common + Api.getFavs)
}

export function delFav(favId) {
  // mockDelFav();
  return axios.delete(configs.host.common + Api.delFav(favId))
}

export function saveFav(favs) {
  return axios.post(configs.host.common + Api.saveFav, favs)
}
/**********用户收藏end*************/


/**********导航start*************/
export function fetchApps() {
  // mockFetchApps();
  return axios({
    method: 'get',
    url: configs.host.common + Api.getApps,
  });
}

export function setCustomApps(appId, isShow) {
  return axios.put(configs.host.webapi + Api.setCustomApps(appId, isShow))
}

export function fetchMenus(appId) {
  //mockFetchMenus(appId);
  return axios.get(configs.host.common + Api.getMenus(appId));
}

export function getAuthApps(conditions) {
  // mockFetchApps();
  var params = conditions || {};

  return axios.get(configs.host.webapi + Api.getAuthApps, {params});
}

export function getAuthMenus(conditions) {
  conditions = conditions ||{};
  var params = {};

  if(conditions.appId) {
    params.appId = conditions.appId;
  }
  //mockFetchMenus(appId);
  //TODO 确认host地址
  return axios.get(configs.host.common + Api.getAuthMenus, {params});
}

export function searchMenus(keyword) {
  var url = configs.host.common + Api.searchMenus;
  return axios.get(url, {params: {fullName: keyword}});
}
/**********导航end*************/

/**********用户信息start*************/
export function getUserinfo() {
  //mockGetUserinfo();
  return axios.get(configs.host.common + Api.userinfo)
}

export function modifyUserinfo(userinfo) {
  // mockModifyUserinfo();
  return axios.put(configs.host.common + Api.modifyUserinfo, userinfo)
}

//pwd -> {password:'', oldPassword:''}
export function modifyPassword(pwd) {
  // mockModifyPassword();
  var params = new URLSearchParams();
  params.append('password', pwd.password);
  params.append('oldPassword', pwd.oldPassword);
  params.append('access_token', localStorage.getItem('access_token'));
  return axios.post(configs.host.passport.getUserInfo + Api.changepwd, params);
}
/**********用户信息end*************/

// 获取公司列表
export function getCompanies() {
  return axios.get(configs.host.common + Api.getCompanies);
}

// 设置当前公司

export function switchOrganize(companyId) {
  return axios.put(configs.host.common + Api.switchOrganize(companyId));
}

// 获取菜单的按钮权限
export function authBtn(payload) {
  return axios.get(configs.host.common + Api.getAuthButtons, { params: payload });
}

