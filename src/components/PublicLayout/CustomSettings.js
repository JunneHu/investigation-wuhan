import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import './less/customSettings.less';
import { Card, Button } from 'antd';
import { withRouter } from 'react-router';

import AppIcon from '../Controls/AppIcon';

@withRouter
class CustomSettings extends React.Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
  }

  handleSetCustomApps = (app) => {
    this.props.dispatch({type: 'publicLayout/reqSetCustomApps', payload: {
      appId: app.appId,
      isShow: !app.isCustomerShow,
    }});
  }

  initApps = (apps) => {
    var xApps = _.chain(apps).values().sortBy('sortCode').value();
 
    return xApps.map((o, i) => {
      return (
        <li key={o.appId} className= {!o.isCustomerShow ? 'settings-item-info disabled' :'settings-item-info'}>
          <AppIcon type={o.logoUrl} className='icon' style={{fontSize: 50}} />
          <span className='settings-item-name'>{o.fullName}</span>
          <span className='settings-item-opt' onClick={this.handleSetCustomApps.bind(this, o)}>
            {!o.isCustomerShow ? '添加' :'隐藏'}
          </span>
        </li>
      );
    });
  }

  handleGoBack = () => {
    this.props.history.go(-1);
  }

  render() {
    return (
      <Card
        className="custom-settings-container"
        title={
          <span>
            <b style={{fontSize:'14px', height:"32px", lineHeight:'32px', color:'#525252'}}>自定义主页</b>
            <Button onClick={this.handleGoBack} style={{float:'right'}}>返回</Button>
          </span>
        }>
        <ul className='custom-settings-content'>
          <li>
            <p className="custom-settings-classtitle" style={{display:'none'}}><span className='custom-settings-item'>订制子应用</span></p>
            <ul>
              {this.initApps(this.props.apps)}
            </ul>
          </li>
        </ul>
      </Card>
    );
  }
}

// export default CustomSettings;
function mapStateToProps(state) {
  const layout = state.publicLayout || {};
  return {
    apps: layout.app || [],
  }
}

export default connect(mapStateToProps)(CustomSettings);

