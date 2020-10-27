import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Spin, message, Row, Col, Form, Switch, Input, DatePicker, Tabs, Checkbox, Select, Modal } from 'antd';
import './less/cscUser.less';
import moment from 'moment';
import api from '../../configs/api';
import { toParams } from '../../utils/toParams';
import { cutWordByWidth, getScrollWidth, getScrollHeight, showScoll } from '../../utils/common';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

class CSCUser extends React.Component {

  constructor(props) {
    super(props);
    let searchInfo = '', choseTab = [], showTime = false, checkAll = false;
    if (props.location.state) {
      searchInfo = props.location.state
    }
    if (searchInfo && searchInfo.showModule) {
      choseTab = searchInfo.showModule.split(',');
      showTime = choseTab.find(item => item === 'CashInfo' || item === 'LoginIpInfo' || item === 'UserTradeInfo');
      checkAll = choseTab.length === 5
    }
    this.state = {
      moduleCount: {},
      userInfo: [],
      bankInfo: [],
      cashInfo: [],
      loginIpInfo: [],
      userTradeInfo: [],
      total: 0,
      postData: {
        PageIndex: 1,
        PageSize: 10,
        choseTab: choseTab || [],
      },
      checkboxOptions: [],
      startValue: searchInfo ? moment(searchInfo.startTime) : null,
      endValue: searchInfo ? moment(searchInfo.endTime) : null,
      endOpen: false,
      searchArr: [{
        label: '用户信息',
        value: 'UserInfo'
      }, {
        label: '银行卡信息',
        value: 'BankInfo'
      }, {
        label: '提现信息',
        value: 'CashInfo'
      }, {
        label: '登录IP信息',
        value: 'LoginIpInfo'
      }, {
        label: '用户交易明细',
        value: 'UserTradeInfo'
      }],
      checkAll,
      indeterminate: false,
      allCheckIndex: [],
      activeKey: 'UserInfo',
      CSCStockList: [],
      showTime,
      showTab: [],
      imgDetail: '',
      showImg: false,
      searchInfo,
    }
  }

  componentWillMount() {
    const { searchArr, checkboxOptions, allCheckIndex } = this.state;
    searchArr.map((text) => {
      checkboxOptions.push(text);
      allCheckIndex.push(text.value);
    })
    this.setState({
      checkboxOptions,
      allCheckIndex
    })
    const { props: { dispatch } } = this;
    dispatch({ type: 'cscUser/getCSCStockList' });
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { cscUser } = nextProps;
    const { postData, activeKey } = this.state;
    if (cscUser.getCSCUserInfoResult !== props.cscUser.getCSCUserInfoResult) {
      const { code, data } = cscUser.getCSCUserInfoResult;
      if (code === '0') {
        const { list, current, pageSize, pageTotal } = data;
        let tol = 0;
        if (list.length) {
          list[0].loginIpInfo && list[0].loginIpInfo.map((text, i) => {
            text.key = (i + 1) + (current - 1) * pageSize;
          })
          if (activeKey === 'BankInfo') {
            tol = list[0].moduleCount.bankInfo
          } else if (activeKey === 'CashInfo') {
            tol = list[0].moduleCount.cashInfo
          } else if (activeKey === 'LoginIpInfo') {
            tol = list[0].moduleCount.loginIpInfo
          } else if (activeKey === 'UserTradeInfo') {
            tol = list[0].moduleCount.userTradeInfo
          } else {
            tol = 0
          }
          this.setState({
            moduleCount: list[0].moduleCount,
            userInfo: [list[0].userInfo],
            bankInfo: list[0].bankInfo,
            cashInfo: list[0].cashInfo,
            loginIpInfo: list[0].loginIpInfo,
            userTradeInfo: list[0].userTradeInfo,
            showTab: postData.choseTab,
            total: tol,
          })
        } else {
          this.setState({
            moduleCount: {},
            userInfo: [],
            bankInfo: [],
            cashInfo: [],
            loginIpInfo: [],
            userTradeInfo: [],
            showTab: [],
            total: 0,
          })
        }


      } else if (code === '1') {
        // message.info(cscUser.getCSCUserInfoResult.message);
        Modal.warning({
          title: cscUser.getCSCUserInfoResult.message,
        });
        this.setState({
          moduleCount: {},
          userInfo: [],
          bankInfo: [],
          cashInfo: [],
          loginIpInfo: [],
          userTradeInfo: [],
          showTab: [],
          total: 0,
        })
      } else {
        message.error(cscUser.getCSCUserInfoResult.message);
      }
    }
    if (cscUser.getCSCStockListResult !== props.cscUser.getCSCStockListResult) {
      const { code, data } = cscUser.getCSCStockListResult;
      if (code === '0') {
        this.setState({
          CSCStockList: data.list,
        });
      }
    }
    if (cscUser.getUserImg !== props.cscUser.getUserImg) {
      const { code, data, messageType } = cscUser.getUserImg;
      if (code === '0') {
        if (messageType === 'error') {
          message.info(data.list);
        } else {
          this.setState({
            imgDetail: data.list,
            showImg: true
          });
        }
      }
    }
  }
  init = () => {
    const { props: { dispatch }, state: { postData, activeKey, searchInfo } } = this;
    const { choseTab, UserName, UserAccount, UserIDCard } = postData;
    if (choseTab.length < 1) {
      message.warning('选择要查询的信息')
      return false;
    }
    if (!UserName && !UserAccount && !UserIDCard) {
      message.warning('至少填写用户帐号、用户姓名、身份证号其中一个')
      return false;
    }
    if (choseTab.indexOf('CashInfo') > -1 || choseTab.indexOf('LoginIpInfo') > -1 || choseTab.indexOf('UserTradeInfo') > -1) {
      if (!postData.StartTime || !postData.EndTime) {
        message.warning('请输入时间范围搜索')
        return false;
      }
    }
    postData.ShowModule = choseTab.join(",");
    if (activeKey === 'BankInfo' || activeKey === 'CashInfo' || activeKey === 'LoginIpInfo' || activeKey === 'UserTradeInfo') {

    }
    const postD = {
      ShowModule:  postData.QuerySite ? postData.ShowModule : activeKey,
      UserAccount: postData.UserAccount,
      UserIDCard: postData.UserIDCard,
      UserName: postData.UserName,
      BankAccount: postData.BankAccount,
      StockID: postData.StockID,
      StartTime: postData.StartTime,
      EndTime: postData.EndTime,
      PageSize: postData.PageSize,
      PageIndex: postData.PageIndex,
      QuerySite: postData.QuerySite ? 1 : 0
    }
    if (searchInfo) {
      postD.key = searchInfo.key;
    }
    dispatch({ type: 'cscUser/getSCSUserInfo', payload: postD });
  }
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }
  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }
  changeCheckbox = (nowCheck) => {
    const { postData, checkAll } = this.state;
    postData.choseTab = nowCheck;
    if (nowCheck.indexOf('CashInfo') > -1 || nowCheck.indexOf('LoginIpInfo') > -1 || nowCheck.indexOf('UserTradeInfo') > -1) {
      this.setState({
        showTime: true,
      })
    } else {
      this.setState({
        showTime: false,
      })
    }
    this.setState({
      postData,
      indeterminate: !!nowCheck.length && (nowCheck.length < this.state.allCheckIndex.length),
      checkAll: nowCheck.length === this.state.allCheckIndex.length,
    });
  }
  onCheckAllChange = (e) => {
    const { postData } = this.state;
    postData.choseTab = e.target.checked ? this.state.allCheckIndex : [];
    this.setState({
      postData,
      indeterminate: false,
      checkAll: e.target.checked,
      activeKey: 'UserInfo',
    }, () => {
      const { choseTab } = postData
      if (choseTab.indexOf('CashInfo') > -1 || choseTab.indexOf('LoginIpInfo') > -1 || choseTab.indexOf('UserTradeInfo') > -1) {
        this.setState({
          showTime: true,
        })
      } else {
        this.setState({
          showTime: false,
        })
      }
    });
  }
  changeTab = (val) => {
    const { postData } = this.state;
    postData.PageIndex = 1;
    this.setState({
      activeKey: val,
      postData,
    }, () => {
      this.init()
    });
  }
  onSearch = () => {
    this.props.form.validateFields((err, values) => {
      const { postData } = this.state;
      values.StartTime = values.StartTime ? moment(values.StartTime).format('YYYY-MM-DD HH:mm:ss') : '';
      values.EndTime = values.EndTime ? moment(values.EndTime).format('YYYY-MM-DD HH:mm:ss') : '';
      Object.assign(postData, values);
      postData.PageIndex = 1;
      this.setState({
        postData,
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
  DownExcel = () => {
    this.props.form.validateFields((err, values) => {
      const { postData, searchInfo } = this.state;
      values.StartTime = values.StartTime ? moment(values.StartTime).format('YYYY-MM-DD HH:mm:ss') : '';
      values.EndTime = values.EndTime ? moment(values.EndTime).format('YYYY-MM-DD HH:mm:ss') : '';
      Object.assign(postData, values);
      this.setState({
        postData
      }, () => {
        const { choseTab, UserName, UserAccount, UserIDCard } = postData;
        if (choseTab.length < 1) {
          message.warning('选择要下载的信息')
          return false;
        }
        if (!UserName && !UserAccount && !UserIDCard) {
          message.warning('至少填写用户帐号、用户姓名、身份证号其中一个')
          return false;
        }
        if (choseTab.indexOf('CashInfo') > -1 || choseTab.indexOf('LoginIpInfo') > -1 || choseTab.indexOf('UserTradeInfo') > -1) {
          if (!postData.StartTime || !postData.EndTime) {
            message.warning('请输入时间范围下载')
            return false;
          }
        }
        const postD = {
          ShowModule: postData.ShowModule || '',
          UserAccount: postData.UserAccount || '',
          UserIDCard: postData.UserIDCard || '',
          UserName: postData.UserName || '',
          BankAccount: postData.BankAccount || '',
          StockID: postData.StockID || '',
          StartTime: postData.StartTime || '',
          EndTime: postData.EndTime || '',
          PageSize: postData.PageSize || '',
          PageIndex: postData.PageIndex || '',
          QuerySite: postData.QuerySite ? 1 : 0,
        }
        if (searchInfo) {
          postD.key = searchInfo.key;
        }
        const params = toParams(postD);
        location.href = `${configs.host.policeSearch2}${api.DownCSCUserInfo}?${params}`;
      })
    });
  }
  showCardImg = (UserAccount, IsFace) => {
    const postD = {
      UserAccount,
      IsFace
    }
    // const params = toParams(postD);
    // location.href = `${configs.host.policeSearch2}${api.getUserImg}?${params}`;
    this.props.dispatch({ type: 'cscUser/getUserImg', payload: postD });
  }
  handleCancel = () => {
    this.setState({
      showImg: false
    })
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    const { dataSource, total, postData, startValue, endValue, endOpen, searchInfo,
      checkboxOptions, indeterminate, checkAll, activeKey, CSCStockList, showTime, showTab, imgDetail, showImg } = this.state;
    const {
      moduleCount,
      userInfo,
      bankInfo,
      cashInfo,
      loginIpInfo,
      userTradeInfo,
    } = this.state;
    const columns1 = [{
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      width: '80',
    }, {
      title: '身份证号',
      dataIndex: 'userAccount',
      key: 'userAccount',
      width: '180',
    }, {
      title: '身份证照片',
      width: '180',
      render: (text) => (
        <div>
          <a className="bluefont" style={{ marginRight: '20px' }} onClick={() => { this.showCardImg(text.userAccount, 'true'); }}>正面</a>
          <a className="bluefont" onClick={() => { this.showCardImg(text.userAccount, 'false'); }}>反面</a>
        </div>
      )
    }, {
      title: '联系电话',
      dataIndex: 'userTel',
      key: 'userTel',
      width: '160',
    }, {
      title: '联系QQ',
      dataIndex: 'userQQ',
      key: 'userQQ',
      width: '140',
    }, {
      title: '注册IP',
      dataIndex: 'registIp',
      key: 'registIp',
      width: '160',
    }, {
      title: '最后一次登录时间',
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime',
      width: '180',
    }, {
      title: '最近一次登录IP',
      dataIndex: 'lastLoginIp',
      key: 'lastLoginIp',
      width: '180',
    }];
    const columns2 = [{
      title: '姓名',
      dataIndex: 'bankRegistName',
      key: 'bankRegistName',
      width: '20%',
    }, {
      title: '开户行',
      dataIndex: 'bank',
      key: 'bank',
      width: '20%',
    }, {
      title: '银行卡号',
      dataIndex: 'bankNo',
      key: 'bankNo',
      width: '60%',
    }];
    const columns3 = [{
      title: '申请提现时间',
      dataIndex: 'applyCashTime',
      key: 'applyCashTime',
      width: '180',
    }, {
      title: '提现银行',
      dataIndex: 'cashBank',
      key: 'cashBank',
      width: '160',
    }, {
      title: '银行卡号',
      dataIndex: 'cashBankNo',
      key: 'cashBankNo',
      width: '200',
    }, {
      title: '提现金额',
      dataIndex: 'cashMoney',
      key: 'cashMoney',
      width: '140',
    }];
    const columns4 = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: '20%',
    }, {
      title: '登录时间',
      dataIndex: 'loginTime',
      key: 'loginTime',
      width: '40%',
    }, {
      title: '登录IP',
      dataIndex: 'loginIp',
      key: 'loginIp',
      width: '40%',
    }];
    const columns5 = [{
      title: '卡号',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
      width: '180',
    }, {
      title: '通道名称',
      dataIndex: 'stockName',
      key: 'stockName',
      width: '100',
    }, {
      title: '提交用户帐号',
      dataIndex: 'userTradeAccount',
      key: 'userTradeAccount',
      width: '180',
    }, {
      title: '提交时间',
      dataIndex: 'storageTime',
      key: 'storageTime',
      width: '180',
    }, {
      title: '真实面值',
      dataIndex: 'trueparvalue',
      key: 'trueparvalue',
      width: '100',
    }, {
      title: '结算金额',
      dataIndex: 'settlemoney',
      key: 'settlemoney',
      width: '100',
    }, {
      title: '消耗渠道',
      dataIndex: 'siteName',
      key: 'siteName',
    }];
    const pagination = {
      total,
      showSizeChanger: true,
      pageSize: postData.PageSize,
      current: postData.PageIndex,
      pageSizeOptions: ['10', '30', '50'],
      onShowSizeChange: (current, pageSize) => {
        Object.assign(postData, { PageSize: pageSize, PageIndex: current })
        this.setState({ postData }, () => {
          this.init()
        })
      },
      onChange: (current) => {
        Object.assign(postData, { PageIndex: current })
        this.setState({ postData }, () => {
          this.init()
        })
      },
    };
    const isfetching = !!(this.props.loading && this.props.loading.effects['cscUser/getSCSUserInfo']);
    return (
      <div className="content-c csc-user">
        <Spin spinning={isfetching}>
          <Form>
            <Row>
              <Col span={24} className="choseSearchInfo">
                <FormItem
                  label={'选择要查询的信息'}
                >
                  {getFieldDecorator('choseSearchInfo')(
                    <div>
                      <Checkbox
                        indeterminate={indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={checkAll}
                      >
                        全选
                      </Checkbox>
                      <CheckboxGroup
                        onChange={this.changeCheckbox}
                        value={postData.choseTab}
                        options={checkboxOptions}
                      />
                    </div>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24} className="choseSearchInfo">
                <FormItem
                  label={'是否查询敏感信息'}
                >
                  {getFieldDecorator('QuerySite', {
                    initialValue: searchInfo ? true : false,
                    valuePropName: 'checked',
                  })(
                    <Switch checkedChildren="是" unCheckedChildren="否" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <FormItem
                  label={'用户帐号'}
                >
                  {getFieldDecorator('UserAccount', {
                    initialValue: searchInfo ? searchInfo.userAccount : '',
                  })(
                    <Input />
                    )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  label={'用户姓名'}
                >
                  {getFieldDecorator('UserName', {
                    initialValue: searchInfo ? searchInfo.userName : '',
                  })(
                    <Input />
                    )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  label={'通道名称'}
                >
                  {getFieldDecorator('StockID', {
                    initialValue: searchInfo ? searchInfo.stockID : '',
                  })(
                    <Select>
                      {
                        CSCStockList.map((text) => {
                          return <Option value={text.stockID}>{text.stockName}</Option>
                        })
                      }
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  label={'身份证号'}
                >
                  {getFieldDecorator('UserIDCard', {
                    initialValue: searchInfo ? searchInfo.userIDCard : '',
                  })(
                    <Input />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <FormItem
                  label={'银行卡号'}
                >
                  {getFieldDecorator('BankAccount', {
                    initialValue: searchInfo ? searchInfo.bankAccount : '',
                  })(
                    <Input />
                    )}
                </FormItem>
              </Col>
              {
                postData.choseTab.map((item) => {
                  if (item === 'LoginIpInfo') {
                    return (
                      <Col span={6}>
                        <FormItem
                          label={'登录IP'}
                        >
                          {getFieldDecorator('LoginIp', {
                            initialValue: searchInfo ? searchInfo.loginIp : '',
                          })(
                            <Input />
                            )}
                        </FormItem>
                      </Col>
                    )

                  }
                })
              }
              {
                showTime &&
                <Col span={12} className="time-item">
                  <FormItem
                    label={'时间范围'}
                  >
                    {getFieldDecorator('StartTime', {
                      initialValue: startValue,
                    })(
                      <DatePicker
                        disabledDate={this.disabledStartDate}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={startValue}
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                      />
                      )}
                  </FormItem>
                  <span className="pull-left" style={{ padding: '4px 15px' }}>至</span>
                  <FormItem
                    label={''}
                    className="last-item"
                  >
                    {getFieldDecorator('EndTime', {
                      initialValue: endValue,
                    })(
                      <DatePicker
                        disabledDate={this.disabledEndDate}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={endValue}
                        onChange={this.onEndChange}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange}
                      />
                      )}
                  </FormItem>
                </Col>
              }
              <Col span={8}>
                <Button type="primary" onClick={this.onSearch}>查询</Button>
                <Button onClick={this.handleReset}>重置</Button>
                <Button onClick={this.DownExcel}>导出Excel</Button>
              </Col>
            </Row>
          </Form>
          {
            showTab.length > 0 ?
              <Tabs activeKey={this.state.activeKey} onChange={this.changeTab} type="card">
                {
                  showTab.indexOf('UserInfo') > -1 && <TabPane tab="用户身份信息" key="UserInfo" />
                }
                {
                  showTab.indexOf('BankInfo') > -1 && <TabPane tab="银行卡信息" key="BankInfo" />
                }
                {
                  showTab.indexOf('CashInfo') > -1 && <TabPane tab="提现信息" key="CashInfo" />
                }
                {
                  showTab.indexOf('LoginIpInfo') > -1 && <TabPane tab="登陆IP信息" key="LoginIpInfo" />
                }
                {
                  showTab.indexOf('UserTradeInfo') > -1 && <TabPane tab="用户交易信息" key="UserTradeInfo" />
                }
              </Tabs>
              :
              ''
          }
          {
            (moduleCount.userInfo >= 0 || moduleCount.bankInfo >= 0 || moduleCount.cashInfo >= 0 || moduleCount.loginIpInfo >= 0 || moduleCount.userTradeInfo >= 0)
              ?
              (activeKey === 'UserInfo' && <Table columns={columns1} dataSource={userInfo} pagination={false} bordered={true} scroll={{ x: getScrollWidth(columns1) }} />) ||
              (activeKey === 'BankInfo' && <Table columns={columns2} dataSource={bankInfo} pagination={pagination} bordered={true} scroll={{ x: getScrollWidth(columns2) }} />) ||
              (activeKey === 'CashInfo' && <Table columns={columns3} dataSource={cashInfo} pagination={pagination} bordered={true} scroll={{ x: getScrollWidth(columns3) }} />) ||
              (activeKey === 'LoginIpInfo' && <Table columns={columns4} dataSource={loginIpInfo} pagination={pagination} bordered={true} scroll={{ x: getScrollWidth(columns4) }} />) ||
              (activeKey === 'UserTradeInfo' && <Table columns={columns5} dataSource={userTradeInfo} pagination={pagination} bordered={true} scroll={{ x: getScrollWidth(columns5) }} />)
              :
              <div className="data-nothing"><div className="bg" />暂无展示信息~</div>
          }
        </Spin>
        <Modal visible={showImg} footer={null} onCancel={this.handleCancel}>
          <img style={{ width: '100%' }} src={imgDetail} />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(CSCUser)
