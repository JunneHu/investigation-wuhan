import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

@withRouter
class TabComponent extends React.Component {

  static propTypes = {
    isShow: PropTypes.bool,
    component: PropTypes.element
  }

  static defaultProps = {
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isShow !== nextProps.isShow && this.dom) {
      this.dom.style.display = nextProps.isShow ? 'block' : 'none';
    }
  }

  // 当切换已有菜单的时候 只通过修改样式来隐藏和显示
  // 可以避免重新渲染组件
  shouldComponentUpdate(nextProps) {
    if (this.props.component !== nextProps.component) {
      return true;
    }
    return false;
  }

  render() {
    const { isShow, component, ...restProps } = this.props;
    if (!component) {
      return '';
    }

    return (
      <div className="tab-page-container" style={{ display: isShow ? 'block' : 'none' }} ref={(dom) => { this.dom = dom; }}>
        {React.cloneElement(component, {...restProps})}
      </div>
    );
  }
}


export default TabComponent;
