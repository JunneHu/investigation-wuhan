import dva, { connect } from 'dva';
import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import arrow from './images/arrow.svg';
import search from './images/search.svg';
import passport from './images/passport.svg';
import arrows from './images/arrows.svg';
import fold from './images/fold.svg';
import avatar from './images/avatar.svg';
import setting from './images/setting.svg';
import message from './images/message.svg';
import collect from './images/collect.svg';
import refresh from './images/refresh.svg';
import custom from './images/custom.svg';
import fullscreen from './images/fullscreen.svg';
import restore from './images/restore.svg';
import skin from './images/skin.svg';
import exit from './images/exit.svg';
import lock from './images/lock.svg';
import api from '../../configs/api';
import { isFullscreen } from '../../utils/fullScreenHelper';

import { Link } from 'react-router-dom'
import Favs from './Favs';
import DropPanel from '../Controls/DropPanel';
import './less/usercenter.less';
import $ from 'jquery';

class Userinfo extends React.Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
      showTheme: false,
      barData: [
        {
          theme: 'yellow',
          isActive: true
        },
        {
          theme: 'dark',
          isActive: false
        },
        {
          theme: 'light',
          isActive: false
        },
        {
          theme: 'red',
          isActive: false
        },
        {
          theme: 'green',
          isActive: false
        },
        {
          theme: 'blue',
          isActive: false
        },
        {
          theme: 'purple',
          isActive: false
        },
        {
          theme: 'pink',
          isActive: false
        }
      ]
    };
  }

  componentWillMount() {
    const { props: { dispatch } } = this;
    dispatch({ type: 'publicLayout/reqUserinfo' });


    // 获取当前主题色，更新bar选中的样式
    const nowTheme = localStorage.getItem('theme');
    const { barData } = this.state;
    if (nowTheme) {
      for (let i = 0, len = barData.length; i < len; i++) {
        if (barData[i].theme === nowTheme) {
          barData[i].isActive = true;
        } else {
          barData[i].isActive = false;
        }
      }
      this.setState({ barData });
    }
  }

  fullScreen() {
    const el = document.getElementsByTagName('html')[0];
    const rfs = el.requestFullScreen
      || el.webkitRequestFullScreen
      || el.mozRequestFullScreen
      || el.msRequestFullScreen;

    let wscript = null;

    if (typeof rfs !== 'undefined' && rfs) {
      rfs.call(el);
      return;
    }

    if (typeof window.ActiveXObject !== 'undefined') {
      wscript = new ActiveXObject('WScript.Shell');
      if (wscript) {
        wscript.SendKeys('{F11}');
      }
    }
  }

  exitFullScreen() {
    const el = document;
    const cfs = el.cancelFullScreen
      || el.webkitCancelFullScreen
      || el.mozCancelFullScreen
      || el.exitFullScreen;
    let wscript = null;

    if (typeof cfs !== 'undefined' && cfs) {
      cfs.call(el);
      return;
    }

    if (typeof window.ActiveXObject !== 'undefined') {
      wscript = new ActiveXObject('WScript.Shell');
      if (wscript != null) {
        wscript.SendKeys('{F11}');
      }
    }
  }

  handleFullScreen = () => {
    if (!isFullscreen()) { // 进入全屏,多重短路表达式
      this.fullScreen();
      if (this.props.onFullScreen) {
        this.props.onFullScreen(true);
      }
    } else { // 退出全屏,三目运算符
      this.exitFullScreen();

      if (this.props.onFullScreen) {
        this.props.onFullScreen(false);
      }
    }
  }

  handleRefresh = () => {
    const xFrame = $('.tab-page-container:visible').find('iframe');
    const src = xFrame.attr('src');
    xFrame.attr('src', src);
  }

  handleLogoutx = () => {
    const redirectUrl = window.location.origin;
    const logoutUrl = `${configs.host.passport.auth + api.auth}?client_id=${configs.authorId || configs.clientId}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=get_user_info&state=xyz`;

    window.location.href = configs.host.passport.auth + api.logout + '?returnurl=' + encodeURIComponent(logoutUrl);
  }

  handleLogout = () => {
    // if (document.getElementsByClassName('LRADMS_iframe').length > 0) {
    //   document.getElementsByClassName('LRADMS_iframe')[0].contentWindow.document.cookie = 'Fulu_LoginUserKey_2016=""; path=/';
    //   document.getElementsByClassName('LRADMS_iframe')[0].contentWindow.document.cookie = '__RequestVerificationToken=""; path=/';
    //   document.getElementsByClassName('LRADMS_iframe')[0].contentWindow.document.cookie = 'currentmoduleId=""; path=/';
    // }
    const redirectUrl = window.location.origin;
    const logoutUrl = `${configs.host.passport.auth + api.auth}?client_id=${configs.authorId || configs.clientId}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=get_user_info&state=xyz`;

    window.location.href = configs.host.passport.auth + api.logout + '?returnurl=' + encodeURIComponent(logoutUrl);
  }


  handleThemeChange = (theme, index) => {
    if (this.props.onThemeChange) {
      this.props.onThemeChange(theme);
    }

    const { barData } = this.state;
    for (let i = 0, len = barData.length; i < len; i++) {
      barData[i].isActive = false;
    }
    barData[index].isActive = true;
    this.setState({ barData });
  }

  changeTheme = (themeClassName) => {
    const { showTheme } = this.state;
    const userGrid = document.getElementsByClassName('user-grid');
    const listData = userGrid[0].childNodes;
    let themeIndex; // 获取切换主题控制按钮是第几个li
    for (let i = 0, len = listData.length; i < len; i += 1) {
      if (listData[i].className.indexOf(themeClassName) !== -1) {
        themeIndex = i;
        break;
      }
    }
    const themeBarSort = (themeIndex + 1) % 3; // 控制按钮一行排3个，取模计算主题按钮排第几个
    console.log('themeBarSort', themeBarSort);
    let themebarLeft = 0;
    switch (themeBarSort) {
      case 0:
        themebarLeft = '-209px';
        break;
      case 1:
        themebarLeft = '-10px';
        break;
      case 2:
        themebarLeft = '-110px';

        break;
      default:
        break;
    }
    this.setState({ showTheme: !showTheme, themebarLeft });
  }

  render() {
    const isIframe = this.props.currentMenu.openMode === 'iframe';
    const { showTheme, barData } = this.state;
    const { isFullscreen } = this.props;
    return (
      <div className="user-center">
        <ul className="user-center-inner">
          <li className="user-center-item">
            <Favs />
          </li>
          <li className="user-center-item anole-badge" style={{ display: 'none' }}>
            <a href="javascript:;">
              <Icon className="icon" glyph={message} />
              <sup className="anole-badge-dot"></sup>
            </a>
          </li>
          <li className="user-center-item ">

            <DropPanel
              className="anole-droppanel"
              header={(
                <div className="anole-droppanel-trigger">
                  <span>{this.props.userinfo.realName}</span>
                  <Icon className="icon" glyph={arrow} />
                </div>
              )}>
              <div className="anole-droppanel-content">
                <div className="user">
                  <div className="user-info">
                    <div className="user-avatar">
                      <Icon className="icon" glyph={avatar} />
                    </div>
                    <div className="user-name">{this.props.userinfo.realName}</div>
                    <div className="user-setting">
                      <Link to='/info'>
                        <Icon className="icon" glyph={setting} />
                      </Link>
                    </div>
                  </div>
                  <ul className="user-grid">
                    {isIframe &&
                      <li className="user-grid-item" onClick={this.handleRefresh}>
                        <a href="#">
                          <Icon className="icon" glyph={refresh} />
                          <span>刷新</span>
                        </a>
                      </li>
                    }

                    <li className="user-grid-item" onClick={this.handleFullScreen}>
                      {isFullscreen ?
                        (
                          <a href="javascript:void(0)">
                            <Icon className="icon" glyph={restore} />
                            <span>退出全屏</span>
                          </a>
                        )
                        :
                        (
                          <a href="javascript:void(0)">
                            <Icon className="icon" glyph={fullscreen} />
                            <span>全屏</span>
                          </a>
                        )
                      }

                    </li>

                    <li className="user-grid-item">
                      <Link to='/settings'>
                        <Icon className="icon" glyph={custom} />
                        <span>自定义主页</span>
                      </Link>
                    </li>

                    <li className="user-grid-item theme-control" onClick={() => this.changeTheme('theme-control')}>
                      <a
                        href="#"
                        className={showTheme ? 'theme-on' : ''}
                      >
                        <Icon glyph={skin} className={showTheme ? 'theme-on icon' : 'icon'} />
                        <span className={showTheme ? 'theme-on' : ''} >换肤</span>
                      </a>
                      {showTheme &&
                        <div className="theme-bar" style={{ left: this.state.themebarLeft }}>
                          <div className="theme-bar-content">
                            {
                              barData.map((v, i) => (
                                <button
                                  className={v.isActive ? 'theme-bar-item bar-on' : 'theme-bar-item'}
                                  onClick={() => this.handleThemeChange(v.theme, i)}>
                                  <p className={`bar-inner bar-${v.theme}`} />
                                </button>
                              ))
                            }

                          </div>

                        </div>

                      }
                      {showTheme &&
                        <p className="triangle-border" />
                      }
                      {showTheme &&
                        <p className="triangle-body" />
                      }

                    </li>


                    {/* <li className="user-grid-item">
                          <a href="#">
                            <Icon className="icon" glyph={lock} />
                            <span>锁定</span>
                          </a>
                        </li> */}
                    <li className="user-grid-item">
                      <a href="javascript:void(0)"
                        onClick={this.handleLogout}>
                        <Icon className="icon" glyph={exit} />
                        <span>退出</span>
                      </a>
                    </li>

                  </ul>
                </div>
              </div>
            </DropPanel>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  var layout = state.publicLayout || {};
  return {
    userinfo: layout.userinfo || {},
    currentMenu: layout.currentMenu || {},
  };
}

export default connect(mapStateToProps)(Userinfo);
