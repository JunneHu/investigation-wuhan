import axios from '../utils/axios';
import Api from '../configs/api';

export function queryList(params) {
  return axios.get(configs.host.policeSearch2 + Api.cSCUserInfoQueryState, {params});
}
