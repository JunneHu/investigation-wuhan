import React, { Component } from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom';
import AppIcon from '../AppIcon';
import Icon from '../../Icon';
import './less/menu.less';
import arrows from './images/arrows.svg';

import './less/menu.less';

class MenuNode extends Component {
  static propTypes = {
    menu: PropTypes.object,
    collapsed: PropTypes.boolean,
    disabled: PropTypes.boolean,
    selectedKeys: PropTypes.array,
    activedKeys: PropTypes.array,
    onMenuItemClick: PropTypes.func,
    onMenuItemHover: PropTypes.func,
    children: PropTypes.element
  }

  componentWillMount() {
  }

  /*
    如果urlAddress是完整的链接则跳转到iframe
    如果url开头是'winform' 则打开本地应用
    如果url是相对地址则通过路由跳转
  */
  renderMenu(isSelected, isActived) {
    const { menu, disabled } = this.props;
    let xPath = menu.urlAddress;
    if (menu.openMode === 'iframe') {
      xPath = `/iframe/${menu.moduleId}`;
    }
    const xClass = classNames({
      'anole-menu-item': true,
      'anole-menu-item-selected': isSelected,
      'anole-menu-item-active': isActived,
      'anole-menu-item-disabled': disabled
    });

    return (
      <li
        key={menu.moduleId}
        onMouseOver={this.handleMenuItemHover.bind(this, menu)}
        onClick={this.handleMenuItemClick.bind(this, menu)}
        className={xClass}>
        <Tooltip placement="right" title={this.props.collapsed && menu.parentId == '0' ? menu.fullName : null}>
          <div>
            {
              (menu.openMode === 'self' || menu.openMode === 'iframe') ?
                <Link
                  className='anole-menu-item-text'
                  to={{ pathname: xPath, query: menu }}
                  target={menu.IsNewTab !== '_self' ? menu.IsNewTab : ''}
                  title={menu.fullName}>
                  {menu.fullName}
                </Link>
                :
                <span
                  className='anole-menu-item-text'
                  to={{ pathname: xPath, query: menu }}
                  onClick={() => { console.log('使用exe打开'); }}
                  target={menu.IsNewTab !== '_self' ? menu.IsNewTab : ''}
                  title={menu.fullName}>
                  {menu.fullName}
                </span>
            }

          </div>
        </Tooltip>
      </li>
    );
  }

  renderSubMenu(isSelected, isActived) {
    const { onMenuItemClick, menu, disabled } = this.props;

    const xClass = classNames({
      'anole-menu-submenu': true,
      'anole-menu-submenu-open': isSelected,
      'anole-menu-submenu-active': isActived,
      'anole-menu-submenu-disabled': disabled
    })

    return (
      <li
        key={menu.moduleId}
        className={xClass}
        target={menu.IsNewTab !== '_self' ? menu.IsNewTab : ''}>
        <Tooltip placement="right" title={this.props.collapsed && menu.parentId == '0' ? menu.fullName : null}>
          <div
            className='anole-menu-submenu-title'
            onMouseOver={this.handleMenuItemHover.bind(this, menu)}
            onClick={this.handleMenuItemClick.bind(this, menu)}>
            <a href="javascript:void(0);" className="anole-menu-item-text">{menu.fullName}</a>
            {
              (this.props.mode === 'children' || menu.parentId != '0') &&
              <Icon className="icon anole-menu-item-arrow" glyph={arrows} />
            }
          </div>
        </Tooltip>

        <ul
          className="anole-menu anole-menu-sub"
          style={{ height: this.calcHeight(isSelected, this.props.children, 30) }}>
          {
            this.props.children
          }
        </ul>
      </li>
    );
  }

  renderApp = (isSelected, isActived) => {
    const { onMenuItemClick, menu, disabled } = this.props;

    const xClass = classNames({
      'anole-menu-submenu': true,
      'anole-menu-submenu-open': isSelected,
      'anole-menu-submenu-active': isActived,
      'anole-menu-submenu-disabled': disabled
    })

    return (
      <li key={menu.appId} className={xClass}>
        <Tooltip placement="right" title={this.props.collapsed ? menu.fullName : null}>
          <div
            onClick={this.handleMenuItemClick.bind(this, menu)}
            onMouseOver={this.handleMenuItemHover.bind(this, menu)}
            className="anole-menu-submenu-title">
            <AppIcon className="icon anole-menu-item-icon" type={menu.logoUrl} />
            <span className="anole-menu-item-text">{menu.fullName}</span>
            <Icon className="icon anole-menu-item-arrow" glyph={arrows} />
          </div>
        </Tooltip>
        <ul
          className="anole-menu anole-menu-sub"
          style={{ height: this.calcHeight(isSelected, this.props.children) }}>
          {
            this.props.children
          }
        </ul>
      </li>
    );
  }

  calcHeight = (isSelected, nodes, height) => {
    height = height || 40;
    return isSelected && nodes && nodes.length ? nodes.length * height : 0;
  }

  handleMenuItemClick = (menu) => {
    const { onMenuItemClick } = this.props;
    if (onMenuItemClick) onMenuItemClick(menu);
  }

  handleMenuItemHover = (menu) => {
    const { onMenuItemHover } = this.props;
    if (onMenuItemHover) onMenuItemHover(menu);
  }

  render() {
    const { selectedKeys, activedKeys, menu } = this.props;
    const isApp = !menu.moduleId;
    const isSubMenu = !menu.isMenu;
    const menuId = menu.moduleId || menu.appId;
    const isSelected = selectedKeys.indexOf(menuId) > -1;
    const isActived = activedKeys.indexOf(menuId) > -1;

    if (isApp) return this.renderApp(isSelected, isActived);
    if (isSubMenu) return this.renderSubMenu(isSelected, isActived);
    return this.renderMenu(isSelected, isActived);
  }
}

export default MenuNode;
