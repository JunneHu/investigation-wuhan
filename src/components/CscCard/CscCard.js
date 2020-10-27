import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Spin, message, Row, Col, Form, Input, DatePicker, Upload } from 'antd';
import './less/cscCard.less';
import moment from 'moment'
import api from '../../configs/api';
import { toParams } from '../../utils/toParams';
import { cutWordByWidth, getScrollWidth, getScrollHeight, showScoll } from '../../utils/common';

const FormItem = Form.Item;

class CSCCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      total: 0,
      postData: {
        PageIndex: 1,
        PageSize: 10,
        userId: props.publicLayout.userinfo.idCard,
      },
      startValue: null,
      endValue: null,
      endOpen: false,
    }
  }

  componentWillMount() {
    //this.init();
  }

  componentDidMount() {
    const { dataSource } = this.state;
    showScoll(dataSource);
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { cscCard } = nextProps;
    if (cscCard.queryResult !== props.cscCard.queryResult) {
      const { code, data } = cscCard.queryResult;
      if (code === '0') {
        const { list, total } = data;
        this.setState({
          dataSource: list,
          total,
        })
        showScoll(list);
      } else {
        message.error(cscCard.queryResult.message)
      }
    }
    if (cscCard.importResult !== props.cscCard.importResult) {
      const { code, data } = cscCard.importResult;
      if (code === '0') {
        message.success(`成功导入${data}条数据`)
      } else {
        message.error(cscCard.importResult.message)
      }
    }
  }
  init = () => {
    const { props: { dispatch }, state: { postData } } = this;
    if (!postData.StartTime || !postData.EndTime) {
      message.warning('请输入时间范围搜索')
      return false;
    }
    postData.profile = '';
    dispatch({ type: 'cscCard/queryList', payload: postData });
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
      values.StartTime = values.StartTime ? moment(values.StartTime).format('YYYY-MM-DD HH:mm:ss') : '';
      values.EndTime = values.EndTime ? moment(values.EndTime).format('YYYY-MM-DD HH:mm:ss') : '';
      Object.assign(postData, values);
      postData.PageIndex = 1;
      this.setState({
        postData
      }, () => {
        this.init();
      })
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
    this.props.form.setFieldsValue({ 'profile': '' })
    this.setState({
    });
  }
  importCard = (res) => {
    const { props: { dispatch }, state: { postData } } = this;
    const postD = {
      data: res,
      userId: postData.userId
    }
    dispatch({ type: 'cscCard/importCSCCard', payload: postD });
  }
  changePro = (evt) => {
    const { postData } = this.state;
    const that = this;
    const file = evt.target.files[0];
    if (!!file) {
      const fileType = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel' || file.type === 'text/plain';
      if (!fileType) {
        message.error('文件上传格式要求使用excel、txt的文件格式');
        return false;
      } else {
        if (file.type === 'text/plain') {
          const reader = new FileReader();
          reader.readAsText(file, 'utf-8');
          reader.onload = function (x) {
            // 读取完毕后输出结果
            // console.log('12212esee', this.result, x);
            // const res= this.result;
            // const res = this.result.replace(/\r\n/ig, ',')
            // console.log('res', res);
            let arr = this.result.split(/\r\n/ig);
            let arr1 = [];
            arr.map(text => {
              arr1.push({
                cardNumber: text
              })
            })
            that.importCard(arr1);
            // var p = XLSX.read(this.result, {type:"array"})
            // console.log('xxxxx', p)
          }
        } else {
          const X = XLSX;
          const XW = {
            /* worker message */
            msg: 'xlsx',
            /* worker scripts */
            worker: './resources/js/xlsxworker.js'
          };
          if (typeof Worker === 'undefined') return;
          if (typeof FileReader === "undefined" || !(FileReader.prototype || {}).readAsBinaryString) return;
          const f = file;
          const reader = new FileReader();
          reader.onload = function (x) {
            var data = x.target.result;
            //xw(data, process_wb);
            var worker = new Worker(XW.worker);
            worker.onmessage = function (e) {
              switch (e.data.t) {
                case 'ready': break;
                case 'e': console.error(e.data.d); break;
                case XW.msg:
                  const workbook = JSON.parse(e.data.d);
                  var result = {};
                  workbook.SheetNames.map((sheetName) => {
                    var roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
                    if (roa.length) result[sheetName] = roa;
                  });
                  let arr1 = [];
                  result.Sheet1.map(text => {
                    arr1.push({
                      cardNumber: text[0]
                    })
                  })
                  that.importCard(arr1);
              }
            };
            worker.postMessage({ d: data, b: 'binary' });
          };
          reader.readAsBinaryString(f);
        }
      }
    }
  }
  DownExcel = () => {
    this.props.form.validateFields((err, values) => {
      const { postData } = this.state;
      values.StartTime = values.StartTime ? moment(values.StartTime).format('YYYY-MM-DD HH:mm:ss') : '';
      values.EndTime = values.EndTime ? moment(values.EndTime).format('YYYY-MM-DD HH:mm:ss') : '';
      Object.assign(postData, values);
      this.setState({
        postData
      }, () => {
        if (!postData.StartTime || !postData.EndTime) {
          message.warning('请输入时间范围导出')
          return false;
        }
        const params = toParams(postData);
        location.href = `${configs.host.policeSearch2}${api.DownCSCCard}?${params}`
      })
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, total, postData, startValue, endValue, endOpen } = this.state;
    const columns = [{
      title: '卡号',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
      width: 150,
      render: cutWordByWidth.bind(this, 150),
    }, {
      title: '通道名称',
      dataIndex: 'stockName',
      key: 'stockName',
      width: 120,
      render: cutWordByWidth.bind(this, 120),
    }, {
      title: '提交用户帐号',
      dataIndex: 'userAccount',
      key: 'userAccount',
      width: 150,
      render: cutWordByWidth.bind(this, 150)
    }, {
      title: '提交时间',
      dataIndex: 'storageTime',
      key: 'storageTime',
      width: 150,
      render: cutWordByWidth.bind(this, 150)
    }, {
      title: '使用时间',
      dataIndex: 'useTime',
      key: 'useTime',
      width: 150,
      render: cutWordByWidth.bind(this, 150)
    }, {
      title: '真实面值',
      dataIndex: 'trueParValue',
      key: 'trueParValue',
      width: 100,
      render: cutWordByWidth.bind(this, 100)
    }, {
      title: '结算金额',
      dataIndex: 'settleMoney',
      key: 'settleMoney',
      width: 100,
      render: cutWordByWidth.bind(this, 100)
    }, {
      title: '消耗渠道',
      dataIndex: 'siteName',
      key: 'siteName',
      width: 150,
      render: cutWordByWidth.bind(this, 150),
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
    const isfetching = !!(this.props.loading && this.props.loading.effects['cscCard/queryList']) || !!(this.props.loading && this.props.loading.effects['cscCard/importCSCCard']);

    return (
      <div className="content-c csc-card">
        <Spin spinning={isfetching}>
          <Form>
            <Row>
              <Col span={20} className="chose-bg">
                <div className="chosePro">
                  <FormItem>
                    {getFieldDecorator('profile')(
                      <input type="file" onChange={this.changePro} className="file-input" />
                    )}
                  </FormItem>
                  <Button className="file-btn">导入卡号</Button>
                </div>
                <FormItem
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
                </FormItem>
                <Button type="primary" onClick={this.onSearch}>查询</Button>
                <Button onClick={this.handleReset}>重置</Button>
              </Col>
              <Col span={4}>
                <Button className="pull-right" onClick={this.DownExcel}>导出Excel</Button>
              </Col>
            </Row>
          </Form>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            bordered={true}
            scroll={{ x: getScrollWidth(columns) }}
          />
        </Spin>
      </div>
    );
  }
}

export default Form.create()(CSCCard)
