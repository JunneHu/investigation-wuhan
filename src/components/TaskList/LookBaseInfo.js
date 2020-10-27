import React from 'react';
import PropTypes from 'prop-types';
import dva, { connect } from 'dva';
import { Modal, Table, Col, Row, Spin } from 'antd';
import './less/taskList.less'
import { debug } from 'util';

class LookBaseInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            baseInfoDetail: [],
            postData: props.setId ?
                {
                    id: props.setId,
                }
                :
                {
                    content: props.setLine.content,
                    id: props.setLine.id,
                }
        }
    }
    componentWillMount() {
        this.init();
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { taskList } = nextProps;
        if (taskList.baseInfoResult !== props.taskList.baseInfoResult) {
            const { code, data } = taskList.baseInfoResult;
            if (code === 1) {
                this.setState({
                    baseInfoDetail: data,
                });
            }
        }
    }
    init = () => {
        const { props: { dispatch }, state: { postData } } = this;
        dispatch({ type: 'taskList/baseInfoList', payload: postData });
    }
    render() {
        const { baseInfoDetail } = this.state;
        return (
            <Modal
                title='基本信息展示'
                width={900}
                visible
                onCancel={this.props.hideModal}
                footer={null}
            >
                <Spin spinning={this.props.loading && this.props.loading.effects['taskList/baseInfoList']}>
                <div className="lookBaseInfo">
                    {
                        baseInfoDetail.length < 1 ?
                            <div className="data-nothing"><div className="bg" />福禄自有平台中没有该用户的基本信息</div>
                            :
                            <div>
                                {
                                    baseInfoDetail.map((text) => {
                                        return (
                                            <div className="info-list">
                                                <h4>{text.source_name}</h4>
                                                <Row>
                                                    {
                                                        text.username && <Col span={8}>用户姓名：{text.username}</Col>
                                                    }
                                                    {
                                                        (text.sex !== '' && text.sex !== null) && <Col span={8}>性别：{text.sex === 0 ? '男' : (text.sex === 1 ? '女' : '未知')}</Col>
                                                    }
                                                    {
                                                        text.phone && <Col span={8}>手机号码：{text.phone}</Col>
                                                    }
                                                    {
                                                        text.card_no && <Col span={8}>身份证号码：{text.card_no}</Col>
                                                    }
                                                    {
                                                        text.bank_no && <Col span={8}>银行卡卡号：{text.bank_no}</Col>
                                                    }
                                                    {
                                                        text.organizename && <Col span={8}>公司名称：{text.organizename}</Col>
                                                    }
                                                    {
                                                        text.siteid && <Col span={8}>站点编号：{text.siteid}</Col>
                                                    }
                                                    {
                                                        text.sitename && <Col span={8}>站点名称：{text.sitename}</Col>
                                                    }
                                                    {
                                                        text.cloud_api_code && <Col span={8}>云接口编号：{text.cloud_api_code}</Col>
                                                    }
                                                    {
                                                        text.cloud_api_name && <Col span={8}>云接口名称：{text.cloud_api_name}</Col>
                                                    }
                                                    {
                                                        text.register_time && <Col span={8}>注册时间：{text.register_time}</Col>
                                                    }
                                                </Row>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
                </Spin>
            </Modal>
        );
    }
}

export default LookBaseInfo
