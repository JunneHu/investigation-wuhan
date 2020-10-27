import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';

import development from './images/development.svg';// 开发平台
import clouddata from './images/clouddata.svg'; // 福云大数据
import customerservice from './images/customerservice.svg';// 客服
import fulumanager from './images/fulumanager.svg';// 福禄总管
import oa from './images/oa.svg';// OA
import pass from './images/pass.svg';// 通行证
import personal from './images/personal.svg';// 人事行政
import projectmanager from './images/projectmanager.svg'; // 项目管理
import sre from './images/sre.svg'; // 运维
import marketing from './images/marketing.svg'; // 销售平台
import erp from './images/erp.svg'; // 销售平台

class AppIcon extends React.Component {

  static propTypes = {
    type: PropTypes.string
  }

  static defaultProps = {

  }

  getImageByType = (type) => {
    switch (type) {
      case 'personal': return personal;// 行政办公
      case 'projectmanager': return projectmanager;// 项目管理
      case 'customerservice': return customerservice;// 客服工单
      case 'clouddata': return clouddata;// 分析统计
      case 'sre': return sre;// 维护平台
      case 'development': return development;// 开发平台
      case 'pass': return pass;// 通行证
      case 'oa': return oa;// OA
      case 'marketing': return marketing; // 销售平台
      case 'fulumanager': return fulumanager; // 福禄总管
      case 'erp': return erp; // erp
      default: return fulumanager;// 福禄总管
    }
  }

  render() {
    const { type, ...restProps } = this.props;
    return (
      <Icon {...restProps} glyph={this.getImageByType(type)} />
    );
  }
}

export default AppIcon;
