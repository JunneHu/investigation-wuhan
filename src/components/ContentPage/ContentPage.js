import React from 'react';
import PropTypes from 'prop-types';
import dva, { connect } from 'dva';
import { Icon } from 'antd';
import './less/contentPage.less';
import welcome from '../../sprite/welcome.jpg';

class ContentPage extends React.Component {

  static propTypes = {

  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUpdate() {
  }


  componentDidUpdate() {
  
  }

  render() {
    return (
      <div className='workflow-container'>
        <img src={welcome} style={{width: 297, margin: '100px auto 0px', display: 'block'}} />
      </div>
    );
  }
}

export default ContentPage;
