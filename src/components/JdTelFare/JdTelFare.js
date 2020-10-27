import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Spin, message, Row, Col, Form, Input, DatePicker, Upload } from 'antd';
import './less/jdTelFare.less';
import moment from 'moment';
import api from '../../configs/api';
import { toParams } from '../../utils/toParams';
import { cutWordByWidth, getScrollWidth, getScrollHeight, showScoll } from '../../utils/common';

const FormItem = Form.Item;
const Search = Input.Search;

class JDTelFare extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
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
    const { jdTelFare } = nextProps;
    if (jdTelFare.queryResult !== props.jdTelFare.queryResult) {
      const { code, data } = jdTelFare.queryResult;
      if (code === '0') {
        const { list } = data;
        this.setState({
          dataSource: list,
        })
        showScoll(list);
      } else {
        message.error(jdTelFare.queryResult.message)
      }
    }
  }
  init = () => {
    const { props: { dispatch }, state: { postData } } = this;
    if (!postData.JdOrderId) {
      message.warning('请输入订单号查询')
      return false;
    }
    dispatch({ type: 'jdTelFare/queryList', payload: postData });
  }
  getRowsData = (key) => {
    const { dataSource } = this.state;
    if (!dataSource) return false;
    const rows = [0];
    for (let k = 0; k < dataSource.length - 1; k += 1) {
      if (dataSource[k][key] !== dataSource[k + 1][key]) {
        rows.push(k + 1);
      }
    }
    rows.push(dataSource.length);
    return rows;
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
  renderOrderId = (value, row, index) => {
    const scopeRowsData = this.getRowsData('jdOrderNo');
    const obj = {
      children: value,
      props: {},
    };
    obj.props.rowSpan = 0;
    for (let i = 0; i < scopeRowsData.length - 1; i += 1) {
      if (index === scopeRowsData[i]) {
        obj.props.rowSpan = scopeRowsData[i + 1] - scopeRowsData[i];
        break;
      }
    }
    return obj;
  }
  renderFaceValue = (value, row, index) => {
    const scopeRowsData = this.getRowsData('facePrice');
    const obj = {
      children: value,
      props: {},
    };
    obj.props.rowSpan = 0;
    for (let i = 0; i < scopeRowsData.length - 1; i += 1) {
      if (index === scopeRowsData[i]) {
        obj.props.rowSpan = scopeRowsData[i + 1] - scopeRowsData[i];
        break;
      }
    }
    return obj;
  }
  renderBuyNum = (value, row, index) => {
    const scopeRowsData = this.getRowsData('quantity');
    const obj = {
      children: value,
      props: {},
    };
    obj.props.rowSpan = 0;
    for (let i = 0; i < scopeRowsData.length - 1; i += 1) {
      if (index === scopeRowsData[i]) {
        obj.props.rowSpan = scopeRowsData[i + 1] - scopeRowsData[i];
        break;
      }
    }
    return obj;
  }
  renderBuyTime = (value, row, index) => {
    const scopeRowsData = this.getRowsData('orderTime');
    const obj = {
      children: value,
      props: {},
    };
    obj.props.rowSpan = 0;
    for (let i = 0; i < scopeRowsData.length - 1; i += 1) {
      if (index === scopeRowsData[i]) {
        obj.props.rowSpan = scopeRowsData[i + 1] - scopeRowsData[i];
        break;
      }
    }
    return obj;
  }
  onSearch = () => {
    this.props.form.validateFields((err, values) => {
      const { postData } = this.state;
      // values.StartTime = values.StartTime ? moment(values.StartTime).format('YYYY-MM-DD HH:mm:ss') : '';
      // values.EndTime = values.EndTime ? moment(values.EndTime).format('YYYY-MM-DD HH:mm:ss') : '';
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
    const { postData } = this.state;
    this.props.form.resetFields();
    this.props.form.setFieldsValue({ 'profile': '' })
    postData.JdOrderId = '';
    this.setState({
      postData
    });
  }
  changePro = (evt) => {
    // console.log('object', evt.target.files[0]);
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
          reader.readAsText(file, "utf-8");
          reader.onload = function (x) {
            // 读取完毕后输出结果
            const res = this.result.replace(/\r\n/ig, ',')
            const { postData } = that.state;
            postData.JdOrderId = res
            that.setState({
              postData
            }, () => {
              that.props.form.setFieldsValue({ 'JdOrderId': postData.JdOrderId })
            })
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
                  let proId = '';
                  result.Sheet1.length && result.Sheet1.map((text, i) => {
                    if (i < result.Sheet1.length - 1) {
                      proId += text + ',';
                    } else {
                      proId += text;
                    }
                  });
                  const { postData } = that.state;
                  postData.JdOrderId = proId
                  that.setState({
                    postData
                  }, () => {
                    that.props.form.setFieldsValue({ 'JdOrderId': postData.JdOrderId })
                  })
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
      // values.StartTime = values.StartTime ? moment(values.StartTime).format('YYYY-MM-DD HH:mm:ss') : '';
      // values.EndTime = values.EndTime ? moment(values.EndTime).format('YYYY-MM-DD HH:mm:ss') : '';
      Object.assign(postData, values);
      this.setState({
        postData
      }, () => {
        if (!postData.JdOrderId) {
          message.warning('请输入订单号导出')
          return false;
        }
        const params = toParams(postData);
        location.href = `${configs.host.policeSearch2}${api.DownJDCardInfo}?${params}`;
      })
    });

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, postData, startValue, endValue, endOpen, proUrl } = this.state;
    const columns = [{
      title: '京东订单号',
      dataIndex: 'jdOrderNo',
      key: 'jdOrderNo',
      width: '150px',
      render: this.renderOrderId
    }, {
      title: '面值',
      dataIndex: 'facePrice',
      key: 'facePrice',
      width: '80px',
      render: this.renderFaceValue
    }, {
      title: '购买数量',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '80px',
      render: this.renderBuyNum
    }, {
      title: '购买时间',
      dataIndex: 'orderTime',
      key: 'orderTime',
      width: '170px',
      render: this.renderBuyTime
    }, {
      title: '卡号',
      dataIndex: 'cardInfos',
      key: 'cardInfos',
      width: '200px',
      render: (text) => {
        if (text && text.length > 0) {
          let res = '';
          text.map((item, i) => {
            if(i == text.length-1){
              res += item.cardNo
            } else {
              res += item.cardNo + '，'
            }
          })
          return res;
        }
      }
    }];

    const isfetching = !!(this.props.loading && this.props.loading.effects['jdTelFare/queryList']);
    return (
      <div className="content-c jd-telFare">
        <Spin spinning={isfetching}>
          <Form className="search-line">
            <Row>
              <Col span={8} className="order-item">
                <FormItem
                  label={'京东订单号'}
                >
                  {getFieldDecorator('JdOrderId')(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12} className="chose-bg">
                <div className="chosePro">
                  <FormItem>
                    {getFieldDecorator('profile')(
                      <input type="file" onChange={this.changePro} className="file-input" />
                    )}
                  </FormItem>
                  <Button className="file-btn">选择文件</Button>
                </div>
                <Button type="primary" onClick={this.onSearch} style={{ marginRight: '15px' }}>查询</Button>
                <Button onClick={this.handleReset}>重置</Button>
              </Col>
              <Col span={4}>
                <Button className="pull-right" onClick={this.DownExcel}>导出Excel</Button>
              </Col>
            </Row>
          </Form>
          <Table columns={columns} dataSource={dataSource} pagination={false} bordered={true} scroll={{ x: getScrollWidth(columns) }} />
        </Spin>
      </div>
    );
  }
}

export default Form.create()(JDTelFare);
