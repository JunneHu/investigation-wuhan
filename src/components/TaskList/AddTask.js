import React from 'react';
import PropTypes from 'prop-types';
import dva, { connect } from 'dva';
import { Modal, Form, Input, Select, Button, message, Spin } from 'antd';
// import NumTextArea from '../InputCheck/NumTextArea';
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class AddTask extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			SearchType: [ {
				values: 1,
				name: '手机号',
			}, {
				values: 0,
				name: '身份证',
			}, {
				values: 2,
				name: '银行卡',
			}],
			addType: 1,
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (err) {
				return message.error('数据格式错误');
			}
			this.props.onOk && this.props.onOk(values);
		})
	}

	handleClose = () => {
		this.props.onClose();
		this.props.form.resetFields(); // 清空提交的表单 
	}
	changeType = (val) => {
		this.setState({
			addType: val,
		}, () => {
			this.props.form.setFieldsValue({ content: '' })
		});
	}
	checkIdcard = (rule, value, callback) => {
		if (value) {
			const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			const arr = value.split(',');
			arr.map((text) => {
				if (!reg.test(text)) {
					callback('请输入正确的身份证号');
				}
			})
		}
		callback();
	}
	checkPhone = (rule, value, callback) => {
		if (value) {
			const reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
			const arr = value.split(',');
			arr.map((text) => {
				if (!reg.test(text)) {
					callback('请输入正确的手机号');
				}
			})
		}
		callback();
	}
	checkBankCard = (rule, value, callback) => {
		if (value) {
			const reg = /^([1-9]{1})(\d{14,19})$/;
			const arr = value.split(',');
			arr.map((text) => {
				if (!reg.test(text)) {
					callback('请输入正确的银行卡号');
				}
			})
		}
		callback();
	}
	checkNum = (e) => {
		const { value } = e.target;
		const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
		if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
			this.props.checkNum(value);
		}
	}
	handleOnblur = (e, callback) => {
		if (callback) {
			callback(e.target.value.trim())
		}
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { SearchType, addType } = this.state;
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 18 },
		};
		return (
			<div>
				<Modal
					title='创建协查'
					width={700}
					visible
					onCancel={this.props.hideModal}
					footer={
						[
							<Button type="primary" onClick={this.handleSubmit} loading={this.props.loading.effects['taskList/add']}>确定</Button>,
							<Button style={{ marginLeft: 20 }} onClick={this.props.hideModal}>关闭</Button>
						]
					}>
					<Form>
						<FormItem
							label="查询类型"
							{...formItemLayout}>
							{getFieldDecorator('type', {
								rules: [{ required: true, message: '请选择查询类型' }],
								initialValue: 1,
							})(
								<Select onChange={this.changeType}>
									{
										SearchType.map((text) => {
											return <Option value={text.values}>{text.name}</Option>
										})
									}
								</Select>
							)}
						</FormItem>
						{
							!addType ?
								<FormItem
									hasFeedback
									label="查询内容"
									{...formItemLayout}>
									{getFieldDecorator('content', {
										rules: [
											{ required: true, message: '查询内容不能为空' },
											{ validator: this.checkIdcard },
										],
									})(<TextArea
										type="textara"
										rows={'8'}
										maxLength={'1899'}
									/>)}
									<p className="redfont">多个查询内容请以英文逗号分隔</p>
								</FormItem>
								:
								(
									addType === 1 ?
										<FormItem
											hasFeedback
											label="查询内容"
											{...formItemLayout}>
											{getFieldDecorator('content', {
												rules: [
													{ required: true, message: '查询内容不能为空' },
													{ validator: this.checkPhone },
												],
											})(<TextArea
												type="textara"
												rows={'8'}
												maxLength={'1199'}
											/>)}
											<p className="redfont">多个查询内容请以英文逗号分隔</p>
										</FormItem>
										:
										<FormItem
											hasFeedback
											label="查询内容"
											{...formItemLayout}>
											{getFieldDecorator('content', {
												rules: [
													{ required: true, message: '查询内容不能为空' },
													{ validator: this.checkBankCard },
												],
											})(<TextArea
												type="textara"
												rows={'8'}
												maxLength={'1999'}
											/>)}
											<p className="redfont">多个查询内容请以英文逗号分隔</p>
										</FormItem>
								)
						}
					</Form>
				</Modal>
			</div>
		);
	}
}

export default Form.create()(AddTask)
