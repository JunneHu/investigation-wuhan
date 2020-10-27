import React from 'react';
import { Input } from 'antd';
const TextArea = Input.TextArea;

export default class NumTextArea extends React.Component {
  onChange = (e) => {
    const { value } = e.target;
    const reg = /^[0-9|x|X|,]*$/;
    if (reg.test(value)) {
      this.props.onChange(value);
    }
  }
  handleOnblur = (e,callback) => {
    if (callback) {
     callback(e.target.value.trim())
   }
 }
  render() {
    return (
      <TextArea
        {...this.props}
        onChange={this.onChange}
        onBlur={(e) => { this.handleOnblur(e, this.props.onBlur) }}
      />
    );
  }
}
