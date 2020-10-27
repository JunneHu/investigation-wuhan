import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './less/tabs.less';
import close from './images/close.svg';
import collect from './images/collect.svg';
import Icon from '../../Icon';
import classNames from 'classnames';

class Tabs extends React.Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);

  }

  handleClose = (tab) => {
    this.props.onClose && this.props.onClose(tab);
  }

  setTabClass = (key) => {
    return classNames('anole-tabs-tab', {'anole-tabs-tab-active': this.props.activeTabKey === key });
  }

  handleClick = (tab) => {
    if(this.props.activeTabKey !== tab.pathname) {
      this.props.onChange && this.props.onChange(tab);
    }
  }

  isInnerPage = (pathname) => {
    const innerPage = {
      '/':'首页',
      '/settings':'自定义主页',
      '/fav':'收藏',
      '/info':'个人信息'
    }
    return innerPage[pathname] || '';
  }

  
  handleCollect = (favInfo, menu) => {
    if(favInfo) {
      this.props.dispatch({type:'publicLayout/reqDelFav', payload:favInfo.id});
      return;
    }

    var xMenu = JSON.parse(JSON.stringify(menu));

    var ancestors =[xMenu];
    this.findAncestors(xMenu, ancestors);
    var xApp = this.props.apps.find(each => each.appId == xMenu.appId);
    if(!xApp) {
      return message.error('添加收藏失败');
    }

    ancestors.unshift(xApp);

    xMenu.fullName = ancestors.map(each => each.fullName).join('-');
    xMenu.host = xApp.hostUrl || window.location.origin;
    this.props.dispatch({ type: 'publicLayout/reqSaveFav', payload: xMenu });
  }

  findAncestors = (menu, ancestors) => {
    if (!this.props.menus || !this.props.menus.length || menu.parentId == 0) {
      return;
    }
    const p = this.props.menus.find(each => each.moduleId == menu.parentId);
    if (p) {
      ancestors.unshift(p);
      this.findAncestors(p, ancestors);
    }
  }

  getFavInfo = (xMenu) => {
    const { apps, favs } = this.props;
    if (!xMenu) return null;

    const xApp = apps.find(each => each.appId === xMenu.appId);
    if (!xApp) {
      return null;
    }

    return favs.find(each => xApp.hostUrl === each.host
        && (each.collectSrc === xMenu.urlAddress || each.collectSrc === `/iframe/${xMenu.moduleId}`));
  }

  render() {
    const { dataSource } = this.props;

    return (
      <div className="anole-tabs anole-tabs-main">
        <div className="anole-tabs-bar">
          <ul className="anole-tabs-nav">
            {
              dataSource.filter(each => !!each.pathname).map(each => {
                const favInfo = this.getFavInfo(each.currentMenu);
                const collectClass = classNames('icon', 'anole-tabs-tab-collect', {'anole-tabs-tab-collect-active':!!favInfo})
                return (
                  <li className={this.setTabClass(each.pathname)} key={each.pathname}>
                    {!this.isInnerPage(each.pathname) &&
                      <Icon
                        className={collectClass}
                        style={{ cursor: 'pointer' }}
                        onClick={this.handleCollect.bind(this, favInfo, each.currentMenu)} 
                        glyph={collect} />
                    }
                    <span onClick={this.handleClick.bind(this, each)}>{each.currentMenu.fullName}</span>
                    {each.pathname !== '/' &&
                      <Icon
                        onClick={this.handleClose.bind(this, each)} 
                        style={{cursor:'pointer'}} 
                        className="icon anole-tabs-tab-close" 
                        glyph={close} />
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="anole-tabs-content" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  var app = state.app || {};
  var userInfo = app.userInfo;
  var authCode = app.authCode;
  var loading = state.loading;
  var publicLayout = state.publicLayout || {};
  
  return {
    favs: publicLayout.favs || [],
    menus:publicLayout.menus || [],
    apps:publicLayout.app || []
  };
}

export default connect(mapStateToProps)(Tabs);

