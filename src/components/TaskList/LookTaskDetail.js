import React from 'react';
import PropTypes from 'prop-types';
import dva, { connect } from 'dva';
import { Modal, Table, Spin } from 'antd';
import LookBaseInfo from '../../routes/LookBaseInfo';
import LookTradeInfo from '../../routes/LookTradeInfo';

class LookTaskDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          dataSource: [],
          total: 0,
          postData: {
            pagenum: 1,
            pagesize: 10,
            id: props.setId,
          },
          showBaseInfo: false,
          showTradeInfo: false,
          setLine: {},
        }
    }
    componentWillMount() {
        this.init();
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { taskList } = nextProps;
        const { postData } = this.state;
        if (taskList.detailResult !== props.taskList.detailResult) {
          const { code, data, count, total } = taskList.detailResult;
          if (code === 1) {
            data.map((text, i)=>{
              text.key = (i+1) + (postData.pagenum-1) * postData.pagesize;
            })
            this.setState({
              dataSource: data,
              total: count,
            })
          }
        }
    }
    init = () => {
        const { props: { dispatch }, state: { postData } } = this;
        dispatch({ type: 'taskList/detailList', payload: postData });
    }
    showModal = (type) => {
      if (type === 'base') {
        this.setState({
          showBaseInfo: true,
        });
      } else if (type === 'trade') {
        this.setState({
          showTradeInfo: true,
        });
      }
    }
    hideModal = () => {
      this.setState({
        showBaseInfo: false,
        showTradeInfo: false,
      })
    }
    render() {
        const { dataSource, total, postData, showBaseInfo, showTradeInfo } = this.state;
        const columns = [{
          title: '查询内容',
          dataIndex: 'content',
          key: 'content',
          width: '30%',
        },{
          title: '基本信息',
          dataIndex: 'baseinfo_type',
          key: 'baseinfo_type',
          width: '15%',
          render: (text) => (
            <span>
            {
              text ? '有' : '无'
            }
            </span>
          )
        },{
          title: '交易信息',
          dataIndex: 'tradeinfo_type',
          key: 'tradeinfo_type',
          width: '15%',
          render: (text) => (
            <span>
            {
              text ? '有' : '无'
            }
            </span>
          )
        },{
          title: '操作',
          width: '40%',
          render: (text, record) => {
            return (
                <span>
                  <a style={{ marginRight: '20px' }} onClick={() => { this.showModal('base'); this.setState({ setLine: record }) }}>查看基本信息</a>
                  <a onClick={() => { this.showModal('trade'); this.setState({ setLine: record }) }}>查看交易信息</a>
                </span>
            )
          }
        }];
        const pagination = {
          total,
          showSizeChanger: true,
          pageSize: postData.pagesize,
          current: postData.pagenum,
          pageSizeOptions: ['10', '30', '50'],
          onShowSizeChange: (current, pageSize) => {
            Object.assign(postData, { pagenum: current, pagesize: pageSize })
            this.setState({ postData }, () => {
              this.init()
            })
          },
          onChange: (current) => {
            Object.assign(postData, { pagenum: current })
            this.setState({ postData }, () => {
              this.init()
            })
          },
        };
        return (
            <div>
                <Modal
                    title='查看详情'
                    width={900}
                    visible
                    onCancel={this.props.hideModal}
                    footer={null}
                >
                  <Spin spinning={this.props.loading && this.props.loading.effects['taskList/detailList']}>
                    <Table columns={columns} dataSource={dataSource} pagination={pagination} bordered={true} />
                  </Spin>
                </Modal>
                {
                  showBaseInfo &&
                  <LookBaseInfo
                    hideModal={this.hideModal}
                    setLine={this.state.setLine}
                  />
                }
                {
                  showTradeInfo &&
                  <LookTradeInfo
                    hideModal={this.hideModal}
                    setLine={this.state.setLine}
                  />
                }
            </div>
        );
    }
}

export default LookTaskDetail
