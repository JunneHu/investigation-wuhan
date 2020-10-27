import React from 'react';
import PropTypes from 'prop-types';
import dva, { connect } from 'dva';
import {  Input, Icon } from 'antd';

class ClearableInput extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
  }

  handleEmpty = () => {
    if(this.inputRef) {
      this.inputRef.focus();
    }
    this.props.onChange({target:{value:''}})
  }

  render() {
    const suffix = this.props.value 
      ? <Icon type="close-circle" onClick={this.handleEmpty} /> 
      : null;

    return (
      <Input 
        onChange={this.props.onChange}
        style={this.props.style} 
        value={this.props.value}
        placeholder={this.props.placeholder} 
        suffix={suffix}
        ref={(ele) => this.inputRef = ele} />
    );
  }
}


export default ClearableInput;
