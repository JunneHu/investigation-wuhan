import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Spin, message, Row, Col, Form, Input, Upload } from 'antd';
import './less/jdGame.less';
import api from '../../configs/api';
import { toParams } from '../../utils/toParams';
import { cutWordByWidth, getScrollWidth, getScrollHeight, showScoll } from '../../utils/common';

const FormItem = Form.Item;
const Search = Input.Search;

class JDGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
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
    const { jdGame } = nextProps;
    if (jdGame.queryResult !== props.jdGame.queryResult) {
      const { code, data } = jdGame.queryResult;
      if (code === '0') {
        const { list } = data;
        this.setState({
          dataSource: list,
        })
        showScoll(list);
      } else {
        message.error(jdGame.queryResult.message)
      }
    }
  }
  init = () => {
    const { props: { dispatch }, state: { postData } } = this;
    if (!postData.JdOrderNo) {
      message.warning('请输入订单号查询')
      return false;
    }
    dispatch({ type: 'jdGame/queryList', payload: postData });
  }
  onSearch = () => {
    this.props.form.validateFields((err, values) => {
      const { postData } = this.state;
      Object.assign(postData, values);
      postData.PageIndex = 1;
      this.setState({ postData }, () => {
        this.init();
      })
    });
  }
  handleReset = () => {
    const { postData } = this.state;
    this.props.form.resetFields();
    this.props.form.setFieldsValue({ 'profile': '' })
    postData.JdOrderNo = '';
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
          reader.readAsText(file, 'utf-8');
          reader.onload = function (x) {
            // 读取完毕后输出结果
            // console.log('12212esee', this.result, x);
            // const res= this.result;
            const res = this.result.replace(/\r\n/ig, ',')
            // console.log('res', res);
            const { postData } = that.state;
            postData.JdOrderNo = res
            that.setState({
              postData
            }, () => {
              that.props.form.setFieldsValue({ 'JdOrderNo': postData.JdOrderNo })
            })
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
                  let proId = '';
                  result.Sheet1.length && result.Sheet1.map((text, i) => {
                    if (i < result.Sheet1.length - 1) {
                      proId += text + ',';
                    } else {
                      proId += text;
                    }
                  });
                  const { postData } = that.state;
                  postData.JdOrderNo = proId
                  that.setState({
                    postData
                  }, () => {
                    that.props.form.setFieldsValue({ 'JdOrderNo': postData.JdOrderNo })
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
      Object.assign(postData, values);
      this.setState({
        postData
      }, () => {
        //const { props: { dispatch } } = this;
        if (!postData.JdOrderNo) {
          message.warning('请输入订单号导出')
          return false;
        }
        const params = toParams(postData);
        location.href = `${configs.host.policeSearch2}${api.DownJDOrderInfo}?${params}`
      })
    });

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, postData } = this.state;
    const columns = [{
      title: '京东订单号',
      dataIndex: 'jdOrderNo',
      key: 'jdOrderNo',
      render: cutWordByWidth.bind(this, 120),
    }, {
      title: '下单时间',
      dataIndex: 'jdPayTime',
      key: 'jdPayTime',
      width: 160,
      render: cutWordByWidth.bind(this, 160),
    }, {
      title: '商品名称',
      dataIndex: 'productName',
      key: 'productName',
      render: cutWordByWidth.bind(this, 120),
    }, {
      title: '总价',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 75,
      render: cutWordByWidth.bind(this, 75),
    }, {
      title: '充值帐号',
      dataIndex: 'account',
      key: 'account',
      width: 160,
      render: cutWordByWidth.bind(this, 160),
    }, {
      title: '买家IP',
      dataIndex: 'buyerIp',
      key: 'buyerIp',
      width: 120,
      render: cutWordByWidth.bind(this, 120),
    }, {
      title: '订单状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      width: 100,
      render: cutWordByWidth.bind(this, 100),
    }, {
      title: '卡密信息',
      dataIndex: 'cards',
      key: 'cards',
      width: 160,
      render: cutWordByWidth.bind(this, 160),
    }];
    const isfetching = !!(this.props.loading && this.props.loading.effects['jdGame/queryList']);
    return (
      <div className="content-c jd-game">
        <Spin spinning={isfetching}>
          <Form>
            <Row>
              <Col span={8}>
                <FormItem
                  label={'京东订单号'}
                >
                  {getFieldDecorator('JdOrderNo', {
                    initialValue: postData.JdOrderNo,
                  })(
                    <Input />
                    )}
                </FormItem>
              </Col>
              <Col span={10} className="btn-bg chose-bg">
                <div className="chosePro">
                  <FormItem>
                    {getFieldDecorator('profile')(
                      <input type="file" onChange={this.changePro} className="file-input" />
                    )}
                  </FormItem>
                  <Button className="file-btn">选择文件</Button>
                </div>
                <Button type="primary" onClick={this.onSearch}>查询</Button>
                <Button onClick={this.handleReset}>重置</Button>
              </Col>
              <Col span={6}>
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

export default Form.create()(JDGame)
