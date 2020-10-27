import React from 'react';
import PropTypes from 'prop-types';
import dva, { connect } from 'dva';
import { Modal, Table, Tooltip, Spin } from 'antd';

class LookTaskDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            total: 0,
            postData: props.setId ? {
                pagenum: 1,
                pagesize: 10,
                id: props.setId,
            } :
            {
                content: props.setLine.content,
                id: props.setLine.id,
                pagenum: 1,
                pagesize: 10,
            },
        }
    }
    componentWillMount() {
        this.init();
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { taskList } = nextProps;
        const { postData } = this.state;
        if (taskList.tradeInfoResult !== props.taskList.tradeInfoResult) {
            const { code, data, count, total } = taskList.tradeInfoResult;
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
    }
    init = () => {
        const { props: { dispatch }, state: { postData } } = this;
        dispatch({ type: 'taskList/tradeInfoList', payload: postData });
    }
    render() {
        const { dataSource, total, postData } = this.state;
        const columns = [{
            title: '编号',
            dataIndex: 'key',
            key: 'key',
            width: '8%',
        }, {
            title: '订单时间',
            dataIndex: 'ordertime',
            key: 'ordertime',
            width: '17%',
        }, {
            title: '交易账号',
            dataIndex: 'account',
            key: 'account',
            width: '15%',
        }, {
            title: '商品名称',
            dataIndex: 'goodsname',
            key: 'goodsname',
            width: '30%',
            render: (text) => (
                <div>
                    {
                    text && text.toString().length > 18 ?
                        <Tooltip placement="top" title={text}>
                            <span>
                                {text.toString().slice(0, 18) + '...'}
                            </span>
                        </Tooltip>
                        :
                        text
                    }
                </div>
            )
        }, {
            title: '购买数量',
            dataIndex: 'purchase_num',
            key: 'purchase_num',
            width: '10%',
        }, {
            title: '交易金额',
            dataIndex: 'amount_money',
            key: 'amount_money',
            width: '10%',
        }, {
            title: '订单状态',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (text) => {
                switch (text) {
                    case '可疑':
                        return <span className="orangefont">可疑</span>;
                        break;
                    case '处理中':
                        return <span className="bluefont">处理中</span>;
                        break;
                    case '未处理':
                        return <span className="grayfont">未处理</span>;
                        break;
                    case '成功':
                        return <span className="greenfont">成功</span>;
                        break;
                    case '失败':
                        return <span className="redfont">失败</span>;
                        break;
                }
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
            <Modal
                title='交易信息展示'
                width={1000}
                visible
                onCancel={this.props.hideModal}
                footer={null}
            >
                <div className="tradeInfo-bg">
                    <Spin spinning={this.props.loading && this.props.loading.effects['taskList/tradeInfoList']}>
                    <Table columns={columns} dataSource={dataSource} pagination={pagination} bordered={true} />
                    {
                        dataSource.length < 1 ?
                        <div className="data-nothing trade-nothing"><div className="bg" />福禄交易平台中没有该用户的交易信息</div>
                        : ''
                    }
                    </Spin>
                </div>
            </Modal>
        );
    }
}

export default LookTaskDetail
