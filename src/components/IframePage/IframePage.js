import React from 'react';
import PropTypes from 'prop-types';
import dva, { connect } from 'dva';
import { Icon } from 'antd';
import { auth } from '../../utils/axios';
import './less/iframePage.less';

class IframePage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
     
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const query = this.props.currentMenu || {};

    if (!query.urlAddress) {
      return <span></span>
    }

    if (!localStorage.getItem('access_token')) {
      auth();
      return;
    }

    let urlAddress = query.urlAddress || '';

    if (urlAddress.indexOf('http') !== 0) {
      urlAddress = (query.host || '') + urlAddress;
    }
    
    if (urlAddress.indexOf('?') > 0) {
      urlAddress = urlAddress + '&access_token=' + localStorage.getItem('access_token') + '&moduleid=' + query.moduleId;
    } else {
      urlAddress = urlAddress + '?access_token=' + localStorage.getItem('access_token') + '&moduleid=' + query.moduleId;
    }
    return (
      <div className='iframe-container'>
          <iframe
            className='LRADMS_iframe' 
            id={'iframe' + query.moduleId}
            src={urlAddress}></iframe>
        </div>
    );
  }
}

function mapStateToProps(state) {
  var publicLayout = state.publicLayout || {};
  return {
    currentMenu: publicLayout.currentMenu || {},
  };
}


export default connect(mapStateToProps)(IframePage);
