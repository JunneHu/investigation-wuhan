import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Form, Card, Input, Upload, Button, Icon, Tabs, Col, Row } from 'antd';
const FormItem = Form.Item;  


 class Contact extends React.Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  componentWillMount() {
  }

  handleSubmit = (e) => {
    e.preventDefault();  
    this.props.form.validateFieldsAndScroll((err,values)=>{  
      if(!err){  
        //this.props.onClose();
        this.props.form.resetFields();//清空提交的表单 
        values.userId = this.props.userinfo.userId;
        this.props.dispatch({type:'publicLayout/reqModifyUserinfo', payload:values})
        
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
      <div style={this.props.style} className='information-contact'>
          <Form>
            <FormItem {...formItemLayout} label='手机'>  
              {getFieldDecorator('mobile', {  
                initialValue:this.props.userinfo.mobile,
                rules:[{
                  required:true,message:'请输入手机号'  
                }]  
              })(  
                <Input placeholder="请输入手机号"/>
              )}  
            </FormItem>
            <FormItem  {...formItemLayout} label='邮箱'>  
              {getFieldDecorator('email', {  
                initialValue:this.props.userinfo.email,
                rules:[{
                  required:true,message:'请输入邮箱'  
                },{
                      pattern:/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                      message: '邮箱格式不正确' 
                }]  
              })(  
                <Input placeholder="请输入邮箱"/>
              )}  
            </FormItem>
            <FormItem  {...formItemLayout} label='微信'>  
              {getFieldDecorator('weChat', {  
                initialValue:this.props.userinfo.weChat,
                rules:[{
                  message:'请输入微信'  
                }]  
              })(  
                <Input placeholder="请输入微信"/>
              )}  
            </FormItem>
           <FormItem  {...formItemLayout} label='QQ'>  
              {getFieldDecorator('oicq', {  
                initialValue:this.props.userinfo.oicq,
                rules:[{
                  required:true,message:'请输入QQ'  
                }]  
              })(  
                <Input placeholder="请输入QQ"/>
              )}  
            </FormItem>
            <FormItem {...formItemLayout} label='现居住地址'>  
              {getFieldDecorator('currentAddress', {  
                initialValue:this.props.userinfo.currentAddress,
                rules:[{
                  message:'请输入现居住地址'  
                }]  
              })(  
                <Input placeholder="请输入现居住地址"/>
              )}  
            </FormItem>
            <FormItem {...formItemLayout} label='紧急联系人'>  
                {getFieldDecorator('emergencyContactPerson', {  
                  initialValue:this.props.userinfo.emergencyContactPerson,
                  rules:[{
                    required:true,message:'请输入紧急联系人'  
                  }]  
                })(  
                  <Input placeholder="请输入紧急联系人"/>
                )}  
              </FormItem>
            <FormItem {...formItemLayout} label='紧急联系方式'>  
                {getFieldDecorator('emergencyContactNumber', {  
                  initialValue:this.props.userinfo.emergencyContactNumber,
                  rules:[{
                    required:true,message:'请输入紧急联系方式'  
                  }]  
                })(  
                  <Input placeholder="请输入紧急联系方式"/>
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

Contact = Form.create()(Contact); 

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(Contact);
