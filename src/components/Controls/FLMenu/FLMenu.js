import {
  connect
} from 'react-redux';
import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Spin
} from 'antd';
import _ from 'lodash';
import queryString from 'query-string';

import MenuNode from './MenuNode';
import MenuPanel from './MenuPanel';

import './less/menu.less';
import { Scrollbars } from 'react-custom-scrollbars';
import arrow from './images/arrow.svg';
import search from './images/search.svg';
import passport from './images/passport.svg';
import arrows from './images/arrows.svg';
import fold from './images/fold.svg';


class FLMenu extends Component {
  static propTypes = {
    mode: PropTypes.string, // 'panel', 'children' 是否要打开新的panel
    collapsed: PropTypes.boolean, // 第一级菜单是否折叠
    menus: PropTypes.array,
    apps: PropTypes.array,
    onMenuItemClick: PropTypes.func,
    onToggleButtonClick: PropTypes.func,
    currentMenu: PropTypes.object,
    loading: PropTypes.boolean
  }

  static defaultProps = {
    mode: 'panel',
    collapsed: false,
    onMenuItemClick: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedKeys: [],
      activedKeys: [], // 鼠标移上去后 激活当前选项和父级选项
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentMenu && nextProps.currentMenu !== this.props.currentMenu) {
      const { currentMenu } = nextProps;
      const query = queryString.parse(window.location.search);

      if (currentMenu && currentMenu.moduleId && query.code) {
        return this.renderNavWhenRefresh(currentMenu);
      }

      // 如果没有传递appid
      // 或者 应用数据还没获取
      // 或者 被已经有被选中的应用
      // 则不再设置选中应用和获取菜单
      const xApp = this.getSelectedApp();
      if (!query.appid || !this.getApps().length || xApp.appId) {
        return;
      }

      const app = this.getApps().find(each => each.appId === (query.appid ||  configs.clientId));

      if (app) {
        this.setState({
          selectedKeys: [app.appId],
        });
      }
    }
  }

  handleTogglePanel = (isCollapsed) => {
    if (this.props.onTogglePanel) {
      this.props.onTogglePanel(isCollapsed);
    }
  }

  renderNavWhenRefresh = (sMenu) => {
    if (!sMenu || !sMenu.moduleId) return;
    const ancestors = [sMenu];
    this.findAncestors(sMenu, ancestors);
    const xApp = this.getApps().find(each => each.appId === sMenu.appId);
    if (!xApp) {
      return;
    }

    ancestors.unshift(xApp);
    const lv2M = ancestors[1];
    let collapsedlv3 = true;
    if (lv2M && lv2M.moduleId) {
      const lv3Menus = this.props.menus.find(each => each.parentId === lv2M.moduleId);
      if (lv3Menus) {
        collapsedlv3 = false;
      }
    }

    const keys = ancestors.map(each => each.moduleId || each.appId);

    this.setState({
      selectedKeys: keys
    }, () => {
      this.handleTogglePanel(collapsedlv3);
    });
  }

  handleAppClick = (pmenu) => {
    const menu = { ...pmenu };
    // 打开新的lv1菜单 如果域名不一样直接跳转 否则为单页面应用
    if (this.state.selectedKeys.indexOf(menu.appId) === -1) { // 打开lv1菜单
      menu.hostUrl = (menu.hostUrl || '').trim();
      if (menu.appId === configs.clientId || menu.hostUrl === window.location.href) {
        this.setState({
          selectedKeys: [menu.appId],
        }, () => {
          this.handleTogglePanel(true);
        });
      } else {
        window.location.href = `${menu.hostUrl}?appid=${menu.appId}`;
      }
    } else { // 关闭lv1菜单
      this.setState({
        selectedKeys: [],
      }, () => {
        this.handleTogglePanel(true);
      });
    }
  }

  handleMenuItemHover = (menu) => {

    if(!menu) {
      return this.setState({
        activedKeys:[]
      });
    }

    if(!menu.moduleId) {
      return this.setState({
        activedKeys:[menu.appId]
      })
    }

    const ancestors = [menu];
    this.findAncestors(menu, ancestors);

    const ids = ancestors.map(each => each.moduleId);
    ids.push(menu.appId);

    this.setState({
      activedKeys: ids
    })
  }

  handleMenuItemClick = (menu) => {
    var { selectedKeys } = this.state;
    // 如果当前菜单是第1级菜单(应用)
    if (!menu.moduleId) {
      return this.handleAppClick(menu);
    }

    const ancestors = [menu];
    this.findAncestors(menu, ancestors);

    var ids = ancestors.map(each => each.moduleId);
    ids.push(menu.appId);

    // toggel lv3 submenu
    if(menu.moduleId && menu.parentId !== '0' && !menu.isMenu && selectedKeys.indexOf(menu.moduleId) > -1) {
      ids = _.reject(ids, each => each === menu.moduleId);
    } 

    this.setState({
      selectedKeys: ids
    }, () => {
      if (menu.isMenu) {
        this.props.onMenuItemClick(ancestors, menu);
      }

      // 如果当前菜单是第2级菜单
      if (menu.moduleId && menu.parentId === '0') {
        this.handleTogglePanel(!this.hasLv3Menus(menu))
      }

    });
  }

  findAncestors = (menu, ancestors) => {
    if (!this.props.menus || !this.props.menus.length || menu.parentId === '0') {
      return;
    }
    const p = this.props.menus.find(each => each.moduleId === menu.parentId);
    if (p) {
      ancestors.unshift(p);
      this.findAncestors(p, ancestors);
    }
  }

  hasLv3Menus = (lv2Menu) =>
    lv2Menu && lv2Menu.moduleId
    && this.props.menus.find(each => each.parentId === lv2Menu.moduleId);

  getSelectedLv2Menu = () => {
    const {
      selectedKeys
    } = this.state;
    if (!selectedKeys.length) {
      return {};
    }

    const xApp = this.getSelectedApp();
    if (!xApp || !xApp.appId) {
      return {};
    }

    return this.props.menus.find(each =>
      each.parentId === '0' &&
      each.appId === xApp.appId &&
      selectedKeys.indexOf(each.moduleId) > -1) || {};
  }

  getSelectedApp = () => {
    const {
      selectedKeys
    } = this.state;
    if (!selectedKeys.length) return {};

    return this.getApps().find(each => selectedKeys.indexOf(each.appId) > -1) || {};
  }

  getApps = () => {
    if (this.props.apps) return this.props.apps;
    const p = this.props.menus.filter(each => !each.moduleId);

    return p;
  }

  /* 
    isRenderLv3 是否渲染 lv3及以后的菜单
    当mode == 'panel'的时候 主菜单只渲染1、2两级菜单
   */
  handleRender = (parent, isRenderLv3) => {
    let pmenus = [];

    if (!parent) {
      pmenus = this.getApps().filter(each => each.isCustomerShow);
    } else if (!parent.moduleId) { // 如果父类是应用
      pmenus = this.props.menus.filter(item =>
        item.appId === parent.appId && item.parentId === '0');
    } else { // 如果父类是菜单

      if(this.props.mode === 'panel' && !isRenderLv3) {
        return;
      }
      pmenus = this.props.menus.filter(item => item.parentId === parent.moduleId);
    }

    if (!pmenus.length) return;
    var xMenus = _.sortBy(pmenus, 'sortCode');
    return xMenus.map(each => (
      <MenuNode
        key={each.moduleId}
        selectedKeys={this.state.selectedKeys}
        activedKeys={this.state.activedKeys}
        onMenuItemClick={this.handleMenuItemClick}
        onMenuItemHover={this.handleMenuItemHover}
        dataSource={this.props.menus}
        collapsed={this.props.collapsed}
        menu={each}
        mode={this.props.mode}
      >
        {
          this.handleRender(each, isRenderLv3)
        }
      </MenuNode>
    ));
  }


  render() {
    const lv2Menu = this.getSelectedLv2Menu();
    return (
      <div className="anole-menu-wrapper">
        <div className="anole-menu-main">
          <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}>
            <ul className="anole-menu" onMouseOut={this.handleMenuItemHover.bind(this, null)}>
              {this.props.loading &&
                <div style={{ width: 200 }}>
                  <Spin
                    style={{ padding: 5, marginLeft: 70, marginTop: 40 }}
                    indicator={
                      <Icon
                        type="loading"
                        style={{ fontSize: 50 }}
                        spin
                      />
                    }
                  />
                </div>
              }
              {
                 this.handleRender()
              }
            </ul>
          </Scrollbars>
        </div>

        {
          this.props.mode === 'panel' && lv2Menu &&
          <MenuPanel
            panelCollapsed={this.props.panelCollapsed}
            onTogglePanel={this.props.onTogglePanel.bind(this, !this.props.panelCollapsed)}
            selectedKeys={this.state.selectedKeys}
            onMenuItemClick={this.handleMenuItemClick}
            onMenuItemHover={this.handleMenuItemHover}
            parentMenu={lv2Menu}
            dataSource={this.props.menus}
          >
            {this.handleRender(lv2Menu, true)}
          </MenuPanel>
        }
      </div>
    );
  }
}

export default connect(({
  state
}) => ({ ...state
}))(FLMenu);
