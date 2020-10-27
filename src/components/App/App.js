import React from 'react';
import url from 'url';
import axios from 'axios';
import { auth } from '../../configs/api';

const ClientId = 'fl7236a0c8e83fa133';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('date', Math.round(new Date().getTime() / 1000));
    console.log(this.props);
    console.log('href', window.location.href);
    const { code, state } = url.parse(window.location.href, true).query;
    console.log('codexxx',  code);
    console.log('code', code && !localStorage.getItem('access_token'));
    if (code && !localStorage.getItem('access_token')) {
      this.props.dispatch({ type: 'app/auth', payload: { code, state, redirect_uri: localStorage.getItem('redirectUrl') } });
    } else {
      this.props.dispatch({ type: 'app/getUserInfo' });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userInfo, authCode } = nextProps;
    console.log( userInfo !== this.props.userInfo);
    console.log('zzzzzz', userInfo);
    if (userInfo !== this.props.userInfo) {
      if (userInfo.status === 401) {
        localStorage.setItem('access_token', '');
        this.auth();
      }
    }

    if (authCode !== this.props.authCode) {
      console.log('authCode', authCode);
      if (authCode.code === '0') {
        localStorage.setItem('authCount', 0);
        localStorage.setItem('access_token', authCode.data.access_token);

        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
        this.props.dispatch({ type: 'app/getUserInfo' });
      } else {
        this.auth();
      }
    } else {
    }
  }

  auth = () => {
    const count = parseInt(localStorage.getItem('authCount') || 0);
    const lastAuthTime = parseInt(localStorage.getItem('lastAuthTime') || 0);
    const current = Math.round(new Date().getTime() / 1000);
    // 1分钟3次重试防止后端出现授权失败, 前端死循环
    if (count > 2 && current - lastAuthTime < 60 * 1000) {
      localStorage.setItem('authCount', 0);
      return;
    }
    localStorage.setItem('authCount', count + 1);
    localStorage.setItem('lastAuthTime', current);


    // code 用来授权, 重定向地址需要移除code参数以免影响后期授权
    const redirectUrl = window.location.href.replace(/code=/g, 'code2=');
    localStorage.setItem('redirectUrl', redirectUrl);
    window.location.href = `${auth}?client_id=${ClientId}&redirect_uri=${redirectUrl}&response_type=code&scope=get_user_info&state=xyz`;
  }

  render() {
    const { userInfo } = this.props;
    return (
      <pre>
        {JSON.stringify(userInfo || {}, null, 2)}
      </pre>
    );
  }
}

export default App;
