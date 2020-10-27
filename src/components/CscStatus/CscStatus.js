import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Table, Button, Icon, Spin, message } from 'antd';
import './less/cscStatus.less';

class CscStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      postData: {
        page: 1,
        rows: 10
      }
    }
  }

  componentWillMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { cscStatus } = nextProps;
    if (cscStatus.queryResult !== props.cscStatus.queryResult) {
      const { code, data } = cscStatus.queryResult;
      if (code === '0') {
        const { list, total } = data;
        this.setState({
          dataSource: list,
          total,
        })
      } else {
        message.error(cscStatus.queryResult.message)
      }
    }
  }
  init = () => {
    const { postData } = this.state;
    this.props.dispatch({ type: 'cscStatus/queryList', payload: postData });
  }
  lookDetail = (record) => {
    this.props.history.push({ pathname: '/cscuser', state: record.origin });
  }
  render() {
    const { dataSource, total, postData } = this.state;
    const columns = [{
      title: '查询关键字',
      render: (text) => {
        if (text.origin) {
          const origin = text.origin;
          let str = '';
          if (origin.userAccount) {
            str += `用户帐号：${origin.userAccount}，`;
          }
          if (origin.userIDCard) {
            str += `身份证号：${origin.userIDCard}，`;
          }
          if (origin.userName) {
            str += `用户姓名：${origin.userName}，`;
          }
          if (origin.bankAccount) {
            str += `银行卡号：${origin.bankAccount}，`;
          }
          if (origin.startTime) {
            str += `时间范围：${origin.startTime}-${origin.endTime}`;
          }
          return str;
        }

      }
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      width: 120,
      render: (text) => {
        switch (text) {
          case 'Pending':
            return '待审核';
            break;
          case 'Approval':
            return '已审核';
            break;
          case 'Reject':
            return '已驳回';
            break;
        }
      }
    }, {
      title: '查询时间',
      dataIndex: 'createAt',
      key: 'createAt',
      width: 170,
    }, {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <span>
          {
            record.state === 'Approval' ? <a onClick={() => { this.lookDetail(record) }}>查看</a> : ''
          }
        </span>
      )
    }];
    const pagination = {
      total,
      showSizeChanger: true,
      pageSize: postData.rows,
      current: postData.page,
      pageSizeOptions: ['10', '30', '50'],
      onShowSizeChange: (current, pageSize) => {
        Object.assign(postData, { rows: pageSize, page: current })
        this.setState({ postData }, () => {
          this.init()
        })
      },
      onChange: (current) => {
        Object.assign(postData, { page: current })
        this.setState({ postData }, () => {
          this.init()
        })
      },
    };
    const isfetching = !!(this.props.loading && this.props.loading.effects['cscStatus/queryList']);

    return (
      <div className="content-c csc-card">
        <Spin spinning={isfetching}>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            bordered={true}
          />
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(CscStatus);
