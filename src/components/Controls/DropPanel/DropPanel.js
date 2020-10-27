import dva, { connect } from 'dva';
import React from 'react';
import PropTypes from 'prop-types';
import './less/droppanel.less';

import {
  Link
} from 'react-router-dom'

class DropPanel extends React.Component {

  static propTypes = {
    header:PropTypes.element,
    align:PropTypes.string, //panel对齐
    style: PropTypes.object,
    headerStyle: PropTypes.object,
    bodyStyle: PropTypes.object
  }

  static defaultProps = {
    align:'right'
  }

  componentWillMount() {
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className='drop-panel-container' style={{...this.style}}>
        <div className='panel-header' style={{...this.props.headerStyle}}>
          {this.props.header}
        </div>
        <div className='panel-body' style={{...this.props.bodyStyle, [this.props.align]:0}}>
          {this.props.children}
        </div>
      </span>
    );
  }
}

export default DropPanel;
