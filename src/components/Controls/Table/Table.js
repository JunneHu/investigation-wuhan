import React from 'react';
import PropTypes from 'prop-types';
import dva, { connect } from 'dva';
import {  Input, Icon, Table } from 'antd';
import { cutWordByWidth, getScrollHeight, getScrollWidth } from '../../../utils/common';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';

import { Resizable } from 'react-resizable';
import BodyRow from './DragSortable';
import 'react-resizable/css/styles.css';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';

const ResizeableTitle = (props) => {
  const { onResize, onResizeStop, onResizeStart, width, height, resize, ...restProps } = props;
  if (!width || !resize) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={height} onResize={onResize} axis="x" onResizeStop={onResizeStop} onResizeStart={onResizeStart}>
      <th {...restProps} />
    </Resizable>
  );
};

class AnoleTable extends React.Component {
  static propTypes = {
    onRemove:PropTypes.func,
    onSelectChange:PropTypes.func,
    onShowDetail:PropTypes.func,
    onSort:PropTypes.func,
    onShowUpdate:PropTypes.func,
    dataSource: PropTypes.array,
    operateColumns: PropTypes.element,
    actions: PropTypes.object,
    pageConditions: PropTypes.object,
    scrollHeight: PropTypes.number,
    columns: PropTypes.object
  }

  static defaultProps = {
    actions: {},
    pageConditions: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      resize: {

      }
    }
  }

  handleResize = index => (e, { size }) => {
    var xWidth = size.width || 150;
    if(xWidth < 150) {
      xWidth = 150;
    }

    var resize = this.state.resize;
    resize[index+''] = xWidth; 

    this.setState({
      resize
    });
  }

  handleHeaderCell = (index, column) => {
    return {
      width: parseInt(column.width),
      resize: true,// !!column.width,
      onClick: this.handleHeaderCellClick.bind(this, column),
      onResize: this.handleResize(index),
      onResizeStop: () => { this.resize = Date.parse(new Date()); },
    }
  }

  handleHeaderCellClick = (record) => {
    // 动态设置列宽度的时候不触发排序
    if (this.resize && Date.parse(new Date()) - this.resize < 1000) return;

    //如果当前列不能排序 则退出
    if(!record.sorter) return;

    const { pageConditions } = this.props;
    pageConditions.sidx = record.key;
    pageConditions.sord = pageConditions.sord == 'desc' ? 'asc' : 'desc';
    this.setState(pageConditions, () => {
      // this.props.handleSearch() ;

      this.props.onSort && this.props.onSort(pageConditions);
    })
  }

  processColumns = () => {
    var pageConditions = this.props.pageConditions;

    let columns = [
      { title: '序号', fixed:'left', dataIndex: '', key: '' ,width:'50px', render: (text, record, index) => cutWordByWidth(50, index+1)}, 
    ]

    var tableColumns = this.props.columns;
    var keys = _.keys(tableColumns);

    keys.forEach((key, index) => {
      let val = tableColumns[key];
      let addon = {};
      if(_.isString(val)) {
        var valArr = val.split('|');
        addon = {
          value: valArr[0],
        }
        if(valArr[1] === 'sorter') {
          addon.sorter = true;
        }
      } else {
        addon = val;
      }

      let width = addon.width || 150;
      var resizeWidth = this.state.resize[index + ''];
      if(resizeWidth) {
        width = resizeWidth
      }

      let p = {
        title:addon.value, dataIndex: key, key
      };

      //最后一列 不定义宽度 实现自适应宽度
      if(index !== keys.length - 1) {
        p.width = width + 'px';
      }

      if(_.isFunction(addon.render)) {
        p.render = addon.render.bind(this);
      } else {
        if(index !== keys.length -1) {
          p.render = cutWordByWidth.bind(this, width);
        } else {
          p.render = cutWordByWidth.bind(this, 150);
        }
      }
      
      if(addon.fixed) {
        p.fixed = addon.fixed;
      }

      p.onHeaderCell = this.handleHeaderCell.bind(this, index);

      if(addon.sorter) {
        p.sorter = true;
      }

      if(pageConditions.sidx == key && p.sorter) {
        p.sortOrder = pageConditions.sord == 'desc' ? 'descend' : 'ascend'
      } else {
        p.sortOrder = false;
      }

      columns.push(p)
    })

    return columns;
  }


  getOperateColumn = () => {
    const { actions, onShowDetail, onShowUpdate, onRemove } = this.props;

    if(!actions.showDetail && !actions.remove && !actions.update) {
      return null;
    }

    return { 
      title: '操作', 
      dataIndex: 'opt', 
      fixed:'right',
      key: 'opt' ,
      width:'150px', 
      render:(text, record, index) => {
        return (
          <span>
            {
              actions.showDetail && <span 
                style={{  marginRight: '3px',color: '#1e2a38',cursor: 'pointer'}}
                onClick={onShowDetail.bind(this, record)}>
                查看
              </span>
            }
            {
              actions.update && <span 
                style={{  marginRight: '3px',color: '#1e2a38',cursor: 'pointer'}}
                onClick={onShowUpdate.bind(this, record)}>
                编辑
              </span>
            }
            
            {
              actions.remove && <span 
                style={{  marginRight: '3px',color: '#1e2a38',cursor: 'pointer'}}
                onClick={onRemove.bind(this, record)}>
                删除
              </span>
            }
            {
              this.props.getExtraOperateColumns(text, record, index)
            }
            
          </span>
        )
      }
    }
  }

  componentWillMount() {
  }

  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;

    this.setState({
      dragSort: {
        dragIndex,
        hoverIndex
      }
    })

  } 

  interChange(arr, i, j) {
    var p = arr[i];
    var x = arr[j];
  
    arr.splice(i, 1, x);
    arr.splice(j, 1, p);
  }

  rewriteComponents = () => {

    const { actions } = this.props;
    const components = {
    }

    if(actions.resize) {
      components.header = {
        cell: ResizeableTitle
      }
    }

    if(actions.dragSort) {
      components.body = {
        row: BodyRow
      }
    }

    return components;
  }

  render() {
    var { scroll, columns, actions, dataSource, rowSelection, ...restProps } = this.props;

    var rowSelect = null;

    if(actions.selectable) {
      rowSelect = {
        fixed: true,
        selectedRowKeys: this.state.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.setState({ selectedRowKeys });
          this.props.onSelectChange && this.props.onSelectChange(selectedRowKeys, selectedRows);
        },
        ...rowSelection
      };
    }

    const { dragSort } = this.state;
    var tableColumns = [];
    if(_.isArray(columns)) {
      tableColumns = columns;
    } else {
      tableColumns = this.processColumns();
      var optColumn = this.getOperateColumn();

      if(optColumn){
        tableColumns.push(optColumn)
      }
    }
    
    var tableScroll = {
      x: getScrollWidth(tableColumns), 
      y: this.props.scrollHeight || getScrollHeight() 
    }

    if(dragSort && dataSource && _.has(dragSort, 'dragIndex') && _.has(dragSort, 'hoverIndex')) {
      const { dragIndex, hoverIndex } = dragSort;

      if(dragIndex != hoverIndex) {
        var p = dataSource[hoverIndex];

        dataSource[hoverIndex] = dataSource[dragIndex];
        dataSource[dragIndex] = p;
      }
    }

    return (
      <Table
        columns={tableColumns}
        scroll={tableScroll}
        dataSource={dataSource || []}
        components={this.rewriteComponents()}
        rowSelection={rowSelect}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow,
        })}
        {...restProps}
      />
    );
  }
}

export default DragDropContext(HTML5Backend)(AnoleTable);
