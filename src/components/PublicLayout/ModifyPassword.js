import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Form, Card, Input, Upload, Button, Icon, Tabs, Col, Row } from 'antd';
const FormItem = Form.Item;  

import {
  Link
} from 'react-router-dom'

 class ModifyPassword extends React.Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  componentWillMount() {
   
  }

  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();  
    this.props.form.validateFieldsAndScroll((err,values)=>{  
      if(!err){  
        this.props.form.resetFields();//清空提交的表单 
        values.UserId = this.props.userinfo;
        this.props.dispatch({type:'publicLayout/reqModifyPassword', payload:values})
      }  
    })  
  }  

  render() {
    const { getFieldDecorator } = this.props.form;  
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span:3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    return (
      <div style={this.props.style} className='information-password'>
          <Form>
            <FormItem {...formItemLayout} label='旧密码'>  
              {getFieldDecorator('oldPassword', {  
                rules:[{
                  required:true,message:'请输入旧密码'  
                },{
                  pattern:/^[a-zA-Z0-9_]{6,16}$/,
                  message: '密码是长度为6~16的字母、数字、下划线组成' 
                }]  
              })(  
                <Input type='password' placeholder="请输入旧密码"/>
              )}  
            </FormItem>
            <FormItem {...formItemLayout} label='新密码'>  
              {getFieldDecorator('password', {  
                rules:[{
                  required:true,message:'请输入新密码',
                },{
                  pattern:/^[a-zA-Z0-9_]{6,16}$/,
                  message: '密码是长度为6~16的字母、数字、下划线组成' 
                },{
                  message:'新密码不能与旧密码一样',
                  validator: (rule, value, callback) => {
                    const { getFieldValue } = this.props.form
                    if (value && value === getFieldValue('oldPassword')) {
                        return callback('新密码不能与旧密码一样');
                    }

                    return callback()
                  }
                }]  
              })(  
                <Input type='password' placeholder="请输入新密码"/>
              )}  
            </FormItem>
            <FormItem {...formItemLayout} label="重复新密码">  
              {getFieldDecorator('confirmPassword', {  
                rules:[{
                  required:true,message:'请重复新密码',
                  validator: (rule, value, callback) => {
                    const { getFieldValue } = this.props.form
                    if (value && value !== getFieldValue('password')) {
                        return callback('两次输入不一致！')
                    }

                    return callback()
                  } 
                }]  
              })(  
                <Input type='password' placeholder="请重复新密码"/>
              )}  
            </FormItem>
          </Form>
          <Row>
            <Col span={3}></Col>
            <Col span={8}>
              <Button onClick={this.handleSubmit} type="primary">提交</Button>
            </Col>
          </Row>
      </div>
    );
  }
}

ModifyPassword = Form.create()(ModifyPassword); 

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(ModifyPassword);
