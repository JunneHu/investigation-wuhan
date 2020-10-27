import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './less/menu.less';
import { Scrollbars } from 'react-custom-scrollbars';
import arrow from './images/arrow.svg';
import search from './images/search.svg';
import passport from './images/passport.svg';
import arrows from './images/arrows.svg';
import fold from './images/fold.svg';
import Icon from '../../Icon';

export default class MenuPanel extends Component {
  static propTypes = {
    parentMenu: PropTypes.object,
    onMenuItemClick: PropTypes.func,
    onMenuItemHover: PropTypes.func,
    collapsed: PropTypes.bool,
    selectedKeys: PropTypes.array,
    dataSource: PropTypes.array
  }

  render() {
    return (
      <div className="anole-menu-panel">
        { (this.props.children && this.props.children.length) &&
          <a href="javascript:;" 
            onClick={this.props.onTogglePanel}
            className="anole-menu-panel-toggle">
            <Icon className="icon" glyph={fold} />
          </a>
        }
          
        <h3 className="anole-menu-panel-heading">
          {this.props.parentMenu.fullName}
        </h3>

        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}>
          <ul className="anole-menu" onMouseOut={this.props.onMenuItemHover.bind(this, null)}>
            {
              this.props.children
            }
          </ul>
        </Scrollbars>
          
      </div>
    );
  }
}
