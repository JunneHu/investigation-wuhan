import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './less/basicInformation.less';
import Contact from './Contact';
import ModifyPassword from './ModifyPassword';
import { withRouter } from 'react-router';


import { Form, Card, Input, Upload, Button, Icon, Tabs, Radio , message } from 'antd';
const FormItem = Form.Item;  

@withRouter
class BasicInformation extends React.Component {

  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state ={
      selectedIndex: 0,
      selectedTitle: '基本信息'
    }
  }

  uploadProps = {
    name: 'avator',
    action: '//jsonplaceholder.typicode.com/posts/',
    accept:'.jpg, .png, .jpeg',
    headers: {
      //authorization: 'authorization-text',
    },
  }

  handleUploadedChange = (info) => {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上次成功`);
      // #TODO 获取真实的头像路径字段
      this.props.dispatch({type: 'publicLayout/modifyAvator', payload: info.file.response.data})
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上次失败.`);
    }
  }

  handleNavClick = (index, title) => {
    this.setState({
      selectedIndex: index,
      selectedTitle: title
    })
  }

  handleGoBack = () => {
    this.props.history.go(-1);
  }

  render() {
    const { getFieldDecorator } = this.props.form;  

    return (
      <div>
        <div className='basic-information-nav'>
          <p className={this.state.selectedIndex == 0 ? 'active' : ''}
            onClick={this.handleNavClick.bind(this, 0, '基本信息')}
          >基本信息</p>
          <p className={this.state.selectedIndex == 1 ? 'active' : ''}
            onClick={this.handleNavClick.bind(this, 1, '联系方式')}
          >联系方式</p>
          <p className={this.state.selectedIndex == 2 ? 'active' : ''}
            onClick={this.handleNavClick.bind(this, 2, '我的头像')}
          >我的头像</p>
          <p className={this.state.selectedIndex == 3 ? 'active' : ''}
            onClick={this.handleNavClick.bind(this, 3, '修改密码')}
          >修改密码</p>
         
        </div>
        <div className='basic-information-content'>
          <div className='basic-information-header'>
            <b>{this.state.selectedTitle}</b>
            <Button
              onClick={this.handleGoBack} 
              style={{float:'right', marginRight:10}}>返回</Button>
          </div>
          <div className='basic-information-body'>
            <div className='information-basic' style={{display: this.state.selectedIndex == 0 ? 'block':'none'}}>
              <p className='information-item'><span>账号：</span><span className="information-item-info">{this.props.userinfo.account}</span></p>
              <p className='information-item'><span>工号：</span><span className="information-item-info">{this.props.userinfo.enCode}</span></p>
              <p className='information-item'><span>姓名：</span><span className="information-item-info">{this.props.userinfo.realName}</span></p>
              <div className='information-item'><span>性别：</span>
                <span className="information-item-info">{this.props.userinfo.gender === 1 ? '男' : '女'}</span>
              </div>
              <p className='information-item'><span>公司：</span><span className="information-item-info">{this.props.userinfo.organizeName}</span></p>
              <p className='information-item'><span>部门：</span><span className="information-item-info">{this.props.userinfo.departmentName}</span></p>
              <p className='information-item'><span>主管：</span><span className="information-item-info">{this.props.userinfo.manager}</span></p>
              <p className='information-item'><span>岗位：</span><span className="information-item-info">{this.props.userinfo.dutyName}</span></p>
              <p className='information-item'><span>职位：</span><span className="information-item-info">{this.props.userinfo.postName}</span></p>
              <p className='information-item'><span>角色：</span><span className="information-item-info">{this.props.userinfo.roleName}</span></p>
              <p className='information-item'><span>自我介绍：</span><span className="information-item-introduce">{this.props.userinfo.description}</span></p>
            </div>
            <Contact userinfo={this.props.userinfo} style={{display: this.state.selectedIndex == 1 ? 'block':'none'}}></Contact>
            <div className='information-avator' style={{display: this.state.selectedIndex == 2 ? 'block':'none'}}>
              <Upload {...this.uploadProps} onChange={this.handleUploadedChange}>
                <Button>
                  <Icon type="upload" /> 添加Logo
                </Button>
              </Upload>
              <p>建议上传图片尺寸为100x100，大小不超过2M。</p>
            </div>
            <ModifyPassword style={{display: this.state.selectedIndex == 3 ? 'block':'none'}}></ModifyPassword>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  var layout = state.publicLayout || {};
  return { userinfo: layout.userinfo || {} };
}

BasicInformation = Form.create()(BasicInformation); 
// export default BasicInformation
export default connect(mapStateToProps)(BasicInformation);
