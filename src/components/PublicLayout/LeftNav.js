import { connect } from 'react-redux';
import React, { Component } from 'react'
import { Menu, Button, Input, Select, Spin, Dropdown, message } from 'antd';
import queryString from 'query-string';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import Icon from '../Icon';
import SearchInput from './SearchInput';
import FLMenu from '../Controls/FLMenu';

import arrow from './images/arrow.svg';
import search from './images/search.svg';
import passport from './images/passport.svg';
import arrows from './images/arrows.svg';
import fold from './images/fold.svg';

const Search = Input.Search;

import styles from './less/LeftNav.less';

const SubMenu = Menu.SubMenu;

import {
  Link
} from 'react-router-dom'

class LeftNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
  }

  componentWillMount() {
    const { props: { dispatch } } = this;
    dispatch({ type: 'publicLayout/reqInitLeftNav' });
  }

  handleSearch =(value, opt) => {
    var xMenu = opt.props.menu;
    var xApp = this.props.dataSource.find(each => each.appId === xMenu.appId) || {};

    if (xMenu.openMode === 'iframe') {

      var xPath =  '/iframe/' + xMenu.moduleId;

      if (xApp.hostUrl) {
        window.location.href = xApp.hostUrl + xPath + '?appid=' + xMenu.appId;
      } else {
        message.error('当前菜单所属应用的host不存在');
      }

    } else if (xMenu.openMode === 'self') {
      window.location.href = (xApp.hostUrl || xMenu.host) + xMenu.urlAddress + '?appid=' + xMenu.appId;
    }
  }

  handleSwitchOrganize = (evt) => {
    const organize = evt.item.props.dataref;

    this.props.dispatch({
      type: 'publicLayout/reqSwitchOrganize',
      payload: organize
    });
  }

  getDropdownMenus = () => {
    return (
      <Menu
        onClick={this.handleSwitchOrganize}>
        {this.renderMenuItems(this.props.organizes.filter(each => each.category === 2))}
      </Menu>
    )
  }

  renderMenuItems = (organizes) => {
    return organizes.map(each => (
      <Menu.Item
        key={each.id}
        dataref={each}>
        <span>{each.shortName}</span>
      </Menu.Item>
    ));
  }

  render() {
    var { currentOrganize, organizes, currentUser } = this.props;
    var defaultOrganize = organizes.find(each => each.id === currentUser.currentOrganizeId) || {};

    return (
      <div className="sidebar">
        <div className="sidebar-container">
          <h1 className="logo">
            <a href="/">福禄网络</a>
          </h1>
          {
            configs.clientId === '10000031'
            ?
            <div className="company">
              <Dropdown
                trigger={['click']}
                overlay={this.getDropdownMenus()}
                placement="bottomLeft">
                <div className="company-inner">
                  {currentOrganize.shortName || defaultOrganize.shortName || ''}
                  <Icon className="icon" glyph={arrow} />
                </div>
              </Dropdown>
            </div>
            :
            <div className="company-inner ant-dropdown-trigger">
              {currentOrganize.shortName || defaultOrganize.shortName || ''}
            </div>
          }

          <SearchInput
            dataSource={this.props.menus}
            placeholder="查找菜单"
            onSelect={this.handleSearch}
            style={{width:180, marginTop:30,marginBottom:10}}/>

          <a
            href="javascript:;"
            onClick={this.props.onToggleMenu.bind(this, !this.props.collapsed)}
            className="anole-menu-main-toggle">
            <Icon className="icon" glyph={fold} />
          </a>
        </div>

        <FLMenu
          mode='panel'
          apps={this.props.dataSource}
          menus={this.props.menus}
          loading={this.props.loading}
          collapsed={this.props.collapsed}
          panelCollapsed={this.props.panelCollapsed}
          currentMenu={this.props.currentMenu}
          onMenuItemClick={this.props.onFuncMenuClick}
          onTogglePanel={this.props.onTogglePanel}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  var publicLayout = state.publicLayout || {};
  var loading = state.loading || {};

  return {
    dataSource: publicLayout.app || [],
    organizes: publicLayout.organizes || [],
    menus: publicLayout.menus || [],
    currentMenu: publicLayout.currentMenu || {},
    breadcrumbMenu: publicLayout.breadcrumbMenu,
    currentOrganize: publicLayout.currentOrganize || {},
    currentUser: publicLayout.userinfo || {},
    loading: (loading.effects ||{})['publicLayout/reqInitLeftNav'],
  }
}

export default connect(mapStateToProps)(LeftNav);
