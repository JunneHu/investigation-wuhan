import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Spin, message, Row, Col, Form, Input, DatePicker, Upload } from 'antd';
import './less/gamePhoneCard.less';
import moment from 'moment'
import api from '../../configs/api';
import { toParams } from '../../utils/toParams'; 
import { cutWordByWidth, getScrollWidth, showScoll } from '../../utils/common';

const FormItem = Form.Item;

class GamePhoneCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      total: 0,
      postData: {
        PageIndex: 1,
        PageSize: 10,
      },
      startValue: null,
      endValue: null,
      endOpen: false,
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
    const { gamePhoneCard } = nextProps;
    if (gamePhoneCard.queryResult !== props.gamePhoneCard.queryResult) {
      const { messageType, data } = gamePhoneCard.queryResult;
      if (messageType === 'error') {
        message.error(gamePhoneCard.queryResult.message)
      } else{
        const { list, total } = data;
        this.setState({
          dataSource: list,
          total,
        })
        showScoll(list);
      }
    }
  }
  init = () => {
    const { props: { dispatch }, state: { postData } } = this;
    if(!postData.CardNo){
      message.warning('请输入卡号查询')
      return false;
    }
    dispatch({ type: 'gamePhoneCard/queryList', payload: postData });
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
  onSearch = () => {
    this.props.form.validateFields((err, values) => {
      const { postData } = this.state;
      // values.StartTime = values.StartTime ? moment(values.StartTime).format('YYYY-MM-DD HH:mm:ss') : '';
      // values.EndTime = values.EndTime ? moment(values.EndTime).format('YYYY-MM-DD HH:mm:ss') : '';
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
      // values.StartTime = values.StartTime ? moment(values.StartTime).format('YYYY-MM-DD HH:mm:ss') : '';
      // values.EndTime = values.EndTime ? moment(values.EndTime).format('YYYY-MM-DD HH:mm:ss') : '';
      Object.assign(postData, values);
      this.setState({
        postData
      }, () => {
        if (!postData.CardNo) {
          message.warning('请输入卡号导出')
          return false;
        }
        const params = toParams(postData);
        location.href=`${configs.host.policeSearch2}${api.DownAppleCardInfo}?${params}`
      })
    });
    
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, total, postData, startValue, endValue, endOpen } = this.state;
    const columns = [{
      title: '卡号',
      dataIndex: 'cardNo',
      key: 'cardNo',
      width: '180px',
    }, {
      title: '面值',
      dataIndex: 'realPrice',
      key: 'realPrice',
      width: '80px',
    }, {
      title: '币种',
      dataIndex: 'currencyType',
      key: 'currencyType',
      width: '80px',
    }, {
      title: '原因',
      dataIndex: 'description',
      key: 'description',
      width: '200px',
    }, {
      title: '导入时间',
      dataIndex: 'importTime',
      key: 'importTime',
      width: '170px',
    }, {
      title: '消耗时间',
      dataIndex: 'usingFinishTime',
      key: 'usingFinishTime',
      width: '170px',
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
    const isfetching = !!(this.props.loading && this.props.loading.effects['gamePhoneCard/queryList']);
    return (
      <div className="content-c game-card">
        <Spin spinning={isfetching}>
          <Form>
            <Row>
              <Col span={6}>
                <FormItem 
                  label={'卡号'}
                >
                  {getFieldDecorator('CardNo')(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={16} className="time-item">
                {/*<FormItem
                  label={'时间范围'}
                >
                  {getFieldDecorator('StartTime', {
                    initialValue: ''
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
                    initialValue: ''
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
                  </FormItem>*/}
                <Button type="primary" onClick={this.onSearch}>查询</Button>
                <Button onClick={this.handleReset}>重置</Button>
              </Col>
              <Col span={2}>
                <Button onClick={this.DownExcel}>导出Excel</Button>
              </Col>
            </Row>
          </Form>
          <div className="card-list">
            <Table columns={columns} dataSource={dataSource} pagination={pagination} bordered={true} scroll={{ x: getScrollWidth(columns) }} />
            {
              /*
              <div className="total-mess"><span>合计数量：200</span><span>订单金额合计：200</span><span>成本合计：20</span></div>
              */
            }
          </div>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(GamePhoneCard)
