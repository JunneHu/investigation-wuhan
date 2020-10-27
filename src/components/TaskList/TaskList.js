import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Spin, message, Tooltip, Popover } from 'antd';
import AddTask from './AddTask';
import LookTaskDetail from '../../routes/LookTaskDetail';
import LookBaseInfo from '../../routes/LookBaseInfo';
import LookTradeInfo from '../../routes/LookTradeInfo';
import './less/taskList.less';

class TaskList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      total: 0,
      postData: {
        pagenum: 1,
        pagesize: 10,
      },
      showModal: false,
      showDetailModal: false,
      showBaseInfo: false,
      showTradeInfo: false,
      setId: '',
    }
  }

  componentWillMount() {
    this.init();
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { taskList } = nextProps;
    const { postData } = this.state;
    if (taskList.queryResult !== props.taskList.queryResult) {
      const { code, data, count, total } = taskList.queryResult;
      if (code === 1) {
        data.map((text, i) => {
          text.key = (i + 1) + (postData.pagenum - 1) * postData.pagesize;
        })
        this.setState({
          dataSource: data,
          total: count,
        })
      }
    }
    if (taskList.addResult !== props.taskList.addResult) {
      const { code } = taskList.addResult;
      if (code === 1) {
        message.success(taskList.addResult.message)
        this.hideModal();
        this.init();
      } else {
        message.error(taskList.addResult.message)
      }
    }
  }
  init = () => {
    const { props: { dispatch }, state: { postData } } = this;
    dispatch({ type: 'taskList/queryList', payload: postData });
  }
  addTask = (values) => {
    const { props: { dispatch } } = this;
    dispatch({ type: 'taskList/add', payload: values });
  }
  showModal = (type) => {
    if (type === 'add') {
      this.setState({
        showModal: true,
      })
    } else if (type === 'detail') {
      this.setState({
        showDetailModal: true,
      });
    } else if (type === 'base') {
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
      showModal: false,
      showDetailModal: false,
      showBaseInfo: false,
      showTradeInfo: false,
    })
  }
  reload = () => {
    this.setState({
      postData: {
        pagenum: 1,
        pagesize: 10,
      }
    }, () => {
      this.init();
    })
  }
  render() {
    const { dataSource, total, postData, showModal, showDetailModal, showBaseInfo, showTradeInfo } = this.state;
    const columns = [{
      title: '编号',
      dataIndex: 'key',
      key: 'key',
      width: '10%',
    }, {
      title: '查询类型',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      render: (text) => {
        switch (text) {
          case 0:
            return '身份证';
            break;
          case 1:
            return '手机号';
            break;
          case 2:
            return '银行卡';
            break;
        }
      }
    }, {
      title: '查询内容',
      dataIndex: 'content',
      key: 'content',
      width: '30%',
      render: (text) => (
        <div>
          {
            text && text.toString().length > 37 ?
              <Popover placement="right" title={'查询内容'} content={text}>
                <div>
                  {text.toString().slice(0, 37) + '...'}
                </div>
              </Popover>
              :
              text
          }
        </div>
      )
    }, {
      title: '提交时间',
      dataIndex: 'createtime',
      key: 'createtime',
      width: '20%',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (text) => {
        switch (text) {
          case 0:
            return <span className="orangefont">列队中</span>;
            break;
          case 1:
            return <span className="bluefont">正在查询</span>;
            break;
          case 2:
            return <span className="greenfont">查询完成</span>;
            break;
          case 3:
            return <span className="grayfont">查询失败</span>;
            break;
        }
      }
    }, {
      title: '操作',
      dataIndex: 'operation_type',
      key: 'operation_type',
      width: '20%',
      render: (text, record) => (
        <span>
          {
            record.status === 2 ?
              (
                text === 0 ?
                  <a onClick={() => { this.showModal('detail'); this.setState({ setId: record.id }); }}>查询详情</a>
                  :
                  <span>
                    <a style={{ marginRight: '20px' }} onClick={() => { this.showModal('base'); this.setState({ setId: record.id }); }}>查看基本信息</a>
                    <a onClick={() => { this.showModal('trade'); this.setState({ setId: record.id }); }}>查看交易信息</a>
                  </span>
              )
              : ''
          }
        </span>
      )
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
      <div className="content-c task-list">
        <Spin spinning={this.props.loading && this.props.loading.effects['taskList/queryList']}>
          <div className="setLine">
            <Button onClick={() => { this.showModal('add'); }}>创建协查</Button>
            <Button className="reload-icon" onClick={this.reload}>刷新</Button>
          </div>
          <Table columns={columns} dataSource={dataSource} pagination={pagination} bordered={true} />
        </Spin>
        {
          showModal &&
          <AddTask
            hideModal={this.hideModal}
            onOk={(values) => { this.addTask(values); }}
            loading={this.props.loading}
          />
        }
        {
          showDetailModal &&
          <LookTaskDetail
            hideModal={this.hideModal}
            setId={this.state.setId}
          />
        }
        {
          showBaseInfo &&
          <LookBaseInfo
            hideModal={this.hideModal}
            setId={this.state.setId}
          />
        }
        {
          showTradeInfo &&
          <LookTradeInfo
            hideModal={this.hideModal}
            setId={this.state.setId}
          />
        }
      </div>
    );
  }
}
export default TaskList;
