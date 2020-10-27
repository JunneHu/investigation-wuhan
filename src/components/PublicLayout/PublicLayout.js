import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import url from 'url';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Icon, Spin, LocaleProvider } from 'antd';

import LeftNav from './LeftNav';
import axios, { auth } from '../../utils/axios';
import api from '../../configs/api';
import './less/publicLayout.less';
import './less/app.less';
import './less/TopNav.less';
import Tabs from '../Controls/Tabs';
import TabComponent from './TabComponent';
import ContentPage from '../ContentPage';
import UserCenter from './UserCenter';
import { isFullscreen } from '../../utils/fullScreenHelper';

class PublicLayout extends React.Component {

  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      theme: localStorage.getItem('theme') || 'yellow',
      collapsed: false,
      panelCollapsed: true
    };

    console.log('app init');
  }

  /* 登录逻辑
    1.跳转到登录页
    2.登录成功后会跳转回当前应用并携带code和state
    3.通过code获取access_token，设置axios的headers 并将access_token存入localStorage
    4.通过access_token获取用户信息
  */
  componentWillMount() {
    const { code, state } = url.parse(window.location.href, true).query;
    const payload = {
      pathname: '/',
      currentMenu: { urlAddress: '/', fullName: '首页' },
      component: React.createElement(ContentPage)
    }

    // 默认添加首页到tabpage中
    this.props.dispatch({ type: 'publicLayout/addTabPage', payload })


    if (code && !localStorage.getItem('access_token')) {
      this.props.dispatch({ type: 'app/auth', payload: { code, state, redirect_uri: localStorage.getItem('redirectUrl') } });
    } else {
      this.props.dispatch({ type: 'app/getUserInfo' });
    }
  }

  componentDidMount() {
    const that = this;
    window.onresize = function onresize() {
      that.setState({
        isFullscreen: isFullscreen()
      });
    };
  }

  componentWillReceiveProps(nextProps) {
    const { userInfo, authCode, apps, menus } = nextProps;
    const urlQuery = url.parse(window.location.href, true).query;

    // 路由切换
    if (this.props.location.pathname !== nextProps.location.pathname
      && this.props.tabPages.length) {
      this.handleAddTabPage(nextProps, nextProps.location.query);
    }

    if (userInfo !== this.props.userInfo) {
      if (!userInfo || userInfo.code != '0') {
        localStorage.setItem('access_token', '');
        auth();
      }
    } else if (authCode !== this.props.authCode) {
      if (authCode && authCode.code === '0') {
        localStorage.setItem('authCount', 0);
        localStorage.setItem('access_token', authCode.data.access_token);

        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
        this.props.dispatch({ type: 'app/getUserInfo' });
      } else {
        auth();
      }
    } else {
      // 登录成功
    }

    if (apps !== this.props.apps && menus !== this.props.menus && apps.length && menus.length) {
      const menu = this.props.location.query;
      if (menu && menu.moduleId) {
        this.props.dispatch({ type: 'publicLayout/setCurrentMenu', payload: menu });
      } else {
        const { pathname } = window.location;

        /*
          1.根据host找到对应的应用
          2.根据host和pathname找到对应的菜单
          3.如果菜单不存在，并且当前pathname不是内页则跳转到403
        */
        const xApp = apps.find(each => each.appId === (urlQuery.appid || configs.clientId));

        if (xApp) {
          const xMenu = menus.find(each =>
            (each.urlAddress === pathname || pathname === `/iframe/${each.moduleId}`) // iframepage 使用/iframe/moduleId作路由
            && each.appId === xApp.appId);

          if (xMenu && xMenu.moduleId) {
            this.props.dispatch({ type: 'publicLayout/setCurrentMenu', payload: xMenu });
            this.handleAddTabPage(nextProps, xMenu);
            return;
          }
        }

        if (!this.isInnerPage() && !__DEV__) {
          window.location.href = '/403';
        } else {
          this.props.dispatch({ type: 'publicLayout/setCurrentMenu', payload: null });
          this.handleAddTabPage(nextProps, {});
        }
      }
    }
  }

  handleAddTabPage = (nextProps, menu) => {
    const { xc } = nextProps;
    const x = React.createElement(xc, { ...nextProps.props });

    const innerPage = this.isInnerPage();
    if (innerPage) {
      menu = { fullName: innerPage };
    }

    const payload = {
      pathname: nextProps.location.pathname,
      currentMenu: menu || {},
      component: x
    }

    this.setState({
      activeTabKey: payload.pathname
    }, () => {
      this.props.dispatch({ type: 'publicLayout/addTabPage', payload })
    });
  }

  handleToggleMenu = (isCollapsed) => {
    if (!_.isUndefined(isCollapsed)) {
      return this.setState({ collapsed: isCollapsed });
    }

    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed
    })
  }

  handleTogglePanel = (isCollapsed) => {

    if (!_.isUndefined(isCollapsed)) {
      return this.setState({ panelCollapsed: isCollapsed });
    }

    const { panelCollapsed } = this.state;
    this.setState({
      panelCollapsed: !panelCollapsed
    })
  }

  handleFuncMenuClick = (ancestors, menu) => {
    if (menu && menu.isMenu) {
      this.props.dispatch({ type: 'publicLayout/setCurrentMenu', payload: menu });
    }
  }

  isInnerPage = (pathname) => {
    pathname = pathname || window.location.pathname;
    const innerPage = {
      '/': '首页',
      '/settings': '自定义主页',
      '/fav': '收藏',
      '/info': '个人信息'
    }
    return innerPage[pathname] || '';
  }

  findAncestors = (menu, ancestors) => {
    if (!this.props.menus || !this.props.menus.length || menu.parentId == 0) {
      return;
    }
    const p = this.props.menus.find(each => each.moduleId === menu.parentId);
    if (p) {
      ancestors.unshift(p);
      this.findAncestors(p, ancestors);
    }
  }

  renderChild = () => {
    const activeTabKey = this.state.activeTabKey || '';

    if (!this.props.tabPages.length) {
      return '';
    }

    return this.props.tabPages.map((each, index) => (
      <TabComponent
        key={each.pathname || Math.random()+''}
        model={each.currentMenu}
        isShow={activeTabKey === each.pathname}
        component={each.component} />
    ));
  }

  handleTabChange = (tab) => {
    this.setState({
      activeTabKey: tab.pathname
    }, () => {
      this.props.dispatch({
        type: 'publicLayout/success',
        payload: {
          currentMenu: tab.currentMenu
        }
      });
    });
  }

  handleTabClose = (tab) => {
    const isCurrent = tab.pathname === this.state.activeTabKey;

    this.props.dispatch({
      type: 'publicLayout/delTabPage',
      payload: {
        activeTabKey: tab.pathname,
        isCurrent
      }
    });

    if (isCurrent) {
      this.setState({
        activeTabKey: '/'
      }, () => {
        this.props.history.push('/');
      });
    }
  }

  handleThemeChange = (theme) => {
    localStorage.setItem('theme', theme);
    this.setState({
      theme
    });
  }

  render() {
    const { userInfo, authCode } = this.props;
    const { collapsed, panelCollapsed, theme } = this.state;

    const menuFloded = collapsed ? 'menu-folded' : 'menu-unfolded';
    const panelFloded = panelCollapsed ? 'menu-panel-folded' : 'menu-panel-unfolded';


    if (userInfo && authCode) {
      return (
        <LocaleProvider locale={zhCN}>
          <div className={classNames('app', `app-${theme}`, menuFloded, panelFloded, { fullscreen: this.state.isFullscreen })}>
            <div className="topbar">
              <Tabs
                dataSource={this.props.tabPages}
                activeTabKey={this.state.activeTabKey}
                onChange={this.handleTabChange}
                onClose={this.handleTabClose} />
              <UserCenter
                isFullscreen={this.state.isFullscreen}
                onThemeChange={this.handleThemeChange} />
            </div>
            <LeftNav
              collapsed={this.state.collapsed}
              panelCollapsed={this.state.panelCollapsed}
              onFuncMenuClick={this.handleFuncMenuClick}
              onToggleMenu={this.handleToggleMenu}
              onTogglePanel={this.handleTogglePanel} />

            <div className="container">
              {this.renderChild()}
            </div>
          </div>
        </LocaleProvider>
      );
    }
    // 如果获取accessToken失败 则重新认证
    if (authCode && authCode.code !== '0') {
      auth();
      // return (
      //   <div style={{ width: '100%', textAlign: 'center' }}>
      //     <p style={{ textAlign: 'center', marginTop: 200 }}>{authCode.message || ''}</p>
      //   </div>
      // );
    }

    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Spin style={{ textAlign: 'center', width: '100%', marginTop: 200 }}
          indicator={<Icon type="loading" style={{ fontSize: 50 }} />}>
        </Spin>
        <p style={{ textAlign: 'center', marginTop: 10 }}>通行证认证中,请耐心等候...</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const app = state.app || {};
  const userInfo = app.userInfo;
  const authCode = app.authCode;
  const loading = state.loading;
  const publicLayout = state.publicLayout || {};

  return {
    userInfo,
    authCode,
    tabPages: publicLayout.tabPages || [],
    menuLoading: loading.effects['publicLayout/reqInitLeftNav'],
    authLoading: loading.effects['publicLayout/setCurrentMenu'],
    apps: publicLayout.app || [],
    menus: publicLayout.menus || [],
    currentMenu: publicLayout.currentMenu || {},
  };
}

export default connect(mapStateToProps)(PublicLayout);
