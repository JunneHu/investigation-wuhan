import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Spin, message, Row, Col, Form, Input } from 'antd';
import Icons, * as icons from '../Icon/Icon';
import './less/gameCompany.less';
import api from '../../configs/api';
import { toParams } from '../../utils/toParams'; 
import { cutWordByWidth, getScrollWidth, getScrollHeight, showScoll } from '../../utils/common';

const FormItem = Form.Item;
const Search = Input.Search;

class GameCompany extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      total: 0,
      postData: {
        PageIndex: 1,
        PageSize: 10,
      },
    }
  }

  componentWillMount() {
    // this.init();
  }
  componentDidMount() {
    const { dataSource } = this.state;
    showScoll(dataSource);
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { gameCompany } = nextProps;
    if (gameCompany.queryResult !== props.gameCompany.queryResult) {
      const { code, data, statistics } = gameCompany.queryResult;
      if (code === '0') {
        const { list } = data;
        this.setState({
          dataSource: list,
          total: statistics.total,
        })
        showScoll(list);
      }
    }
  }
  init = () => {
    const { props: { dispatch }, state: { postData } } = this;
    if(!postData.IdNumber){
      message.warning('请输入身份证号查询')
      return false;
    }
    dispatch({ type: 'gameCompany/queryList', payload: postData });
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }
  onSearch = () => {
    this.props.form.validateFields((err, values) => {
      const { postData } = this.state;
      Object.assign(postData,values);
      postData.PageIndex = 1;
      this.setState(() => {
        postData
      }, () => {
        this.init();
      })
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.setState({
    });
  }
  DownExcel=()=>{
    this.props.form.validateFields((err, values) => {
      const { postData } = this.state;
      Object.assign(postData, values);
      this.setState({
        postData
      }, () => {
        if(!postData.IdNumber){
          message.warning('请输入身份证号查询')
          return false;
        }
        const params = toParams(postData);
        location.href=`${configs.host.policeSearch2}${api.DownAppleQSUserInfo}?${params}`;
      })
    });
    
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, total, postData } = this.state;
    const { startValue, endValue, endOpen } = this.state;
    const columns = [{
      title: '商户名',
      dataIndex: 'name',
      key: 'name',
      width: 75,
      render: cutWordByWidth.bind(this, 75),
    }, {
      title: '商户手机号',
      dataIndex: 'phone_number',
      key: 'phone_number',
      render: cutWordByWidth.bind(this, 120),
    }, {
      title: '商户身份证',
      dataIndex: 'id_number',
      key: 'id_number',
      width: 180,
      render: cutWordByWidth.bind(this, 180),
    }, {
      title: '绑定银行',
      dataIndex: 'bank_name',
      key: 'bank_name',
      width: 200,
      render: cutWordByWidth.bind(this, 200),
    }, {
      title: '绑定银行卡号',
      dataIndex: 'bank_card',
      key: 'bank_card',
      width: 150,
      render: cutWordByWidth.bind(this, 150),
    }, {
      title: '公司名字',
      dataIndex: 'corporate_name',
      key: 'corporate_name',
      width: 150,
      render: cutWordByWidth.bind(this, 150),
    }, {
      title: '注册时间',
      dataIndex: 'register_time',
      key: 'register_time',
      width: 150,
      render: cutWordByWidth.bind(this, 150),
    }, {
      title: '最后登录时间',
      dataIndex: 'last_login_time',
      key: 'last_login_time',
      width: 150,
      render: cutWordByWidth.bind(this, 150),
    }];
    // const pagination = {
    //   total,
    //   showSizeChanger: true,
    //   pageSize: postData.PageSize,
    //   current: postData.PageIndex,
    //   pageSizeOptions: ['10', '30', '50'],
    //   onShowSizeChange: (current, pageSize) => {
    //     Object.assign(postData, { PageSize: pageSize, PageIndex: current })
    //     this.setState({ postData }, () => {
    //       this.init()
    //     })
    //   },
    //   onChange: (current) => {
    //     Object.assign(postData, { PageIndex: current })
    //     this.setState({ postData }, () => {
    //       this.init()
    //     })
    //   },
    // };
    const isfetching = !!(this.props.loading && this.props.loading.effects['gameCompany/queryList']);
    return (
      <div className="content-c game-company">
        <Spin spinning={isfetching}>
          <Form>
            <Row>
              <Col span={20}> 
                <FormItem
                  label={'身份证号'}
                >
                  {getFieldDecorator('IdNumber')(
                    <Input />
                    )}
                </FormItem>
                <Button type="primary" onClick={this.onSearch}>查询</Button>
                <Button onClick={this.handleReset}>重置</Button>
              </Col>
              <Col span={4}>
                <Button className="pull-right" onClick={this.DownExcel}>导出Excel</Button>
              </Col>
            </Row>
          </Form>
          <div className="company-list">
            <Table columns={columns} dataSource={dataSource} pagination={false} bordered={true} scroll={{ x: getScrollWidth(columns) }} />
            {/* 
            <div className="total-mess"><span>合计数量：200</span><span>订单金额合计：200</span><span>成本合计：20</span></div>
            */}
            </div>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(GameCompany)
