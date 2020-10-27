import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Col, Row, Button, Icon, DatePicker } from 'antd';
import Search from '../../configs/search';
import './less/searchForm.less';
import moment from 'moment'
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn');

// type 0 input 1 select 2 RangePicker
const startTime = moment().format('YYYY-MM-DD 00:00:00');
const endTime = moment().format('YYYY-MM-DD 23:59:59');
const FormItem = Form.Item;

class SearchForm extends React.PureComponent {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      getFieldsValue: PropTypes.func.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired,
    init: PropTypes.func,
    isShowMore: PropTypes.bool,
    showCount: PropTypes.number
  }

  static defaultProps = {
    init: () => { },
    isShowMore: false,
    showCount: 6
  }
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      startTime: startTime,
      endTime: endTime,
    };
  }

  componentDidMount() {
    this.props.init(this.props.form.getFieldsValue());
  }
  getSearchComponent = (item) => {
    if (item.type === 0) {
      return <Input />;
    } else if (item.type === 1) {
      if(item.changeType){
        return (<Select onChange={this.props.changeType}>
          {item.items && item.items.map((opt) =>
            (<Select.Option value={opt.value} key={opt.value}>{opt.name}</Select.Option>))}
        </Select>);
      } else {
        return (<Select>
          {item.items && item.items.map((opt) =>
            (<Select.Option value={opt.value} key={opt.value}>{opt.name}</Select.Option>))}
        </Select>);
      }
    }
  }
  getSearchArea = () => {
    const children = [];

    const { getFieldDecorator } = this.props.form;
    const { startTime, endTime } = this.state;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const formItemLayout2 = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    Search[this.props.name].forEach(item => {
      const Search = item.type === 2 ?
        <Col span={12} key={item.id}>
          <FormItem
            label={item.name}
            {...formItemLayout2}
          >
            <div style={{ float: 'left', width: '45%' }}>
              <FormItem>
                {getFieldDecorator('startTime', {
                  initialValue: ''
                })(

                  <DatePicker
                    format="YYYY-MM-DD"
                    style={{ width: '100%' }}
                  />
                  )}
              </FormItem>
            </div>
            <div style={{ float: 'left', width: '10%', textAlign: 'center' }}>
              -
            </div>
            <div style={{ float: 'left', width: '45%', }}>
              <FormItem>
                {getFieldDecorator('endTime', {
                  initialValue: ''
                })(
                  <DatePicker
                    format="YYYY-MM-DD"
                    style={{ width: '100%' }}
                  />
                  )}
              </FormItem>
            </div>
          </FormItem>
        </Col>
        :
        <Col span={6} key={item.id}>
          <FormItem
            {...formItemLayout}
            label={item.name}
          >
            {getFieldDecorator(item.id, {
              initialValue: item.defaultValue
            })(this.getSearchComponent(item))}
          </FormItem>
        </Col>
      children.push(Search);
    });
    return children;
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  search = () => {
    this.props.form.validateFields((err, values) => {
      values.startTime = values.startTime ? moment(values.startTime).format('YYYY-MM-DD') : '';
      values.endTime = values.endTime ? moment(values.endTime).format('YYYY-MM-DD') : '';
      this.props.search(err, values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
    this.setState({
    });
  }

  render() {
    const { isShowMore, showCount } = this.props;
    const children = this.getSearchArea();
    const expand = this.state.expand;
    const shownCount = isShowMore ? (expand ? children.length : showCount) : children.length; // eslint-disable-line no-nested-ternary, max-len
    return (
      <div className="searchForms">
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
          {
            children.length < 6 ?
              (
                children.length === 2 ?
                  <div>
                    <Row gutter={40}>
                      {children.slice(0, shownCount)}
                      <Col span={6} style={{ position:'relative', top: '4px' }}>
                        <Button type="primary" htmlType="submit" onClick={this.search}>搜索</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                      </Col>
                    </Row>
                  </div>
                  :
                  <div>
                    <Row gutter={40}>
                      {children.slice(0, shownCount)}
                      <Col span={6} style={{ float: 'right', textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" onClick={this.search}>搜索</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                      </Col>
                    </Row>
                  </div>
              )
              :
              <div>
                <Row gutter={40}>
                  {children.slice(0, shownCount)}
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit" onClick={this.search}>搜索</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
                    {isShowMore &&
                      <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                        {expand ? '收起' : ''}更多条件 <Icon type={expand ? 'up' : 'down'} />
                      </a>
                    }
                  </Col>
                </Row>
              </div>
          }
        </Form>
      </div>
    );
  }
}


export default Form.create({
  onFieldsChange(props, changedFields) {
    if (props.onChange) props.onChange(changedFields);
  }
})(SearchForm);
