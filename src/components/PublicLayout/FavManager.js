import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Select, message, LocaleProvider } from 'antd';
import { Input, Button,Radio, Icon, Table,Modal } from 'antd';
import { cutWordByWidth, getScrollHeight, getScrollWidth  } from './utils';
import './less/favmanager.less';
import moment from 'moment';
import _ from 'lodash';
import { withRouter } from 'react-router';


const Search = Input.Search;
const Option = Select.Option;
const confirm = Modal.confirm;
const warning = Modal.warning;
import zhCN from 'antd/lib/locale-provider/zh_CN';

@withRouter
class FavManager extends React.Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  handleHeaderCell = (column) => {
    return {
      onClick: this.handleHeaderCellClick.bind(this, column),
    }
  }

  handleHeaderCellClick = (record) => {
    //如果当前列不能排序 则退出
    if(!record.sorter) return;

    var pageConditions = this.state.pageConditions;
    pageConditions.sidx = record.key;
    pageConditions.sord = pageConditions.sord == 'desc' ? 'asc' : 'desc';
    this.setState(pageConditions, () => {
     // this.handleSearch();
    })
  }

  initColumns = () => {
    var pageConditions = this.state.pageConditions;

    this.columns.map(each => {
      if(pageConditions.sidx == each.key && each.sorter) {
        each.sortOrder = pageConditions.sord == 'desc' ? 'descend' : 'ascend'
      } else {
        each.sortOrder = false;
      }

      if(each.sorter) {
        each.onHeaderCell = this.handleHeaderCell;
      }
      return each;
    })

    return this.columns;
  }

  confirmRemove = (record) => {
    var _this = this;
    confirm({
      title: '删除后不能恢复！是否确定删除?',
      content: '',
      onOk() {
        _this.handleDelete(record.id)
      },
      onCancel() {
      },
    });
  }


  componentWillMount() {
    this.handleSearch();
  }

  handleDelete =(id) => {
    if(!id) {
      return message.error('收藏id是空');
    }
    
    this.props.dispatch({type:'publicLayout/reqDelFav', payload:id});
  }

  handleSearch = () => {
    const { props: { dispatch } } = this;
    dispatch({ type: 'publicLayout/reqGetFavs' });
  }

  constructor(props) {
    super(props);
    this.state = {
      pageConditions:{
        keyword:'',
        rows:30,
      }
    }
    this.columns = [  
      { title: '序号', fixed:'left', dataIndex: ' ', key: ' ', width:'50px', render: (text, record, index) => index +1 }, 
      { title: '模块', sorter:true, dataIndex: 'collectTitle', width:250, key: 'collectTitle' , render: (text, record, index) => {
        return <div className='ellipsis' style={{width:233}} >
          <a href={(record.host ||  location.origin) + record.collectSrc}>
            {text}
          </a>
        </div>
      }},  
      { title: '链接', dataIndex: 'collectSrc', key: 'collectSrc', width:'300px', render:cutWordByWidth.bind(this, 300)}, 
      { title: '创建时间', sorter:true, dataIndex: 'collectTime', key: 'collectTime', render:(text) => moment(text).format('YYYY-MM-DD')}, 
      { title: '操作', fixed:'right', dataIndex: '', key: '', width:'100px', render: (text, record, index) => (  
        <span>
          <span onClick={this.confirmRemove.bind(this, record)} 
            style={{color: '#1e2a38', cursor: 'pointer' }}>删除</span>
        </span>  
      )} 
    ]; 
  }

  handleRefresh = () => {
    this.setState({
      pageConditions:{
        keyword:''
      }
    }, () => {
      this.handleSearch();
    })
  }

  filterSource = () => {
    const { pageConditions } = this.state;
    var dataSource = this.props.favs.filter(each => 
      each.collectTitle.indexOf(this.state.pageConditions.keyword) > -1);

    if(pageConditions.sidx && pageConditions.sord) {
      return _.orderBy(dataSource, [pageConditions.sidx], [pageConditions.sord])
    }

    return dataSource;
  }

  handlePageSizeChange = (page, size, x) => {
    var pageConditions = this.state.pageConditions;
    pageConditions.rows = size;
    this.setState({ pageConditions })
  }

  handleGoBack = () => {
    this.props.history.go(-1);
  }

  render() {
    return (
      <div className='workflow-container'>
        <div className='workflow-container-header'>
          <div className='workflow-container-search'>
            <Input.Search
              className='search-input'
              value= {this.state.pageConditions.keyword}
              style={{width:200}} 
              onChange= {(evt) => {
                var pageConditions = this.state.pageConditions;
                pageConditions.keyword = evt.target.value;
                this.setState({pageConditions});
              }}
              placeholder="搜索您要查询的关键字"/>
          </div>
          <div className='workflow-container-cmd'>
            <Button.Group>
              <Button className="border-left-radius" onClick={this.handleRefresh}>刷新</Button>
              <Button className="border-right-radius" onClick={this.handleGoBack}>返回</Button>
            </Button.Group>
          </div>
        </div>
        <LocaleProvider locale={zhCN}>
          <div className='workflow-container-content'>
              <Table columns={this.initColumns()} 
                rowKey = {(record) => record.id} 
                dataSource={this.filterSource()}  
                className="table"
                size='small' 
                scroll={{ x: getScrollWidth(this.columns), y:getScrollHeight() }}
                bordered
                pagination = {{
                  showQuickJumper:true,
                  showSizeChanger: true,
                  pageSizeOptions:['30', '50', '100'],
                  onShowSizeChange: this.handlePageSizeChange,
                  total: this.props.favs.length,
                  current: this.state.pageConditions.current,
                  pageSize: this.state.pageConditions.rows,
                  onChange: (current) => {
                    var pageConditions = this.state.pageConditions;
                    pageConditions.current = current;
                    this.setState({ pageConditions })
                  },
                }}
                />  
          </div>
        </LocaleProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  var layout = state.publicLayout || {};
  return { favs:layout.favs || [] };
}

export default connect(mapStateToProps)(FavManager);
