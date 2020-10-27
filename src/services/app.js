import axios from '../utils/axios';
//import axios from 'axios';
import api from '../configs/api';

export function getUserInfo() {
    return axios.post(configs.host.passport.getUserInfo + api.getUserInfo);
}

export function auth(payload) {
    return axios.post(configs.host.passport.authCode + api.authCode, payload);
}
