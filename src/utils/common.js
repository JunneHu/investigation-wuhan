import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

function cutWord (len, text, record, index) {
  text = text || '';
  return <span title={text}>
      {text.length > len ? text.slice(0,len) + '...' : text}
    </span>
}

function convertEnum (enumObj, text, record, index) {
  text = text;
  if(enumObj && enumObj[text + '']) {
    text = enumObj[text + '']
  }
 
  return <span title={text}>
      {text}
  </span>
}
function getScrollHeight() {
  const h = document.body.clientHeight - 270;
  return h < 100 ? 100 : h;
}

function getScrollWidth(columns) {
  var wArr = columns.map(each => parseInt(each.width));
  var scrollWidth = 0;
  wArr.forEach(each => {
    scrollWidth += each || 150;
  })
  
  return scrollWidth;
}
function enumRenderWithSelect(enumObj) {
  var xopts = [];

  if(!enumObj) return;

  for(var key in enumObj) {
    xopts.push(
      <Option key={key} title={enumObj[key]} value={key}>{enumObj[key]}</Option>
    )
  }

  return xopts;
}

//select的数据源是一个字符串数据
function arrayRenderWithSelect(arr) {
  var xopts = [];

  if(!arr) return;

  return arr.map(each => {
    return <Option key={each} title={each} value={key}>{each}</Option>
  })
}

function cutWordByWidth(width, text, record, index) {
  width -= 17;
  width = width < 20 ? 20 : width;

  text = text || '';
  return <div className='ellipsis' title={text} style={{width}}>
    {text}
  </div>
}

function showScoll(dataSource){
  var antscrolls = document.getElementsByClassName('ant-table-scroll');
  if(antscrolls.length) {
    var p = antscrolls[0];
    if(dataSource.length) {
      p.firstChild.style.overflowX = 'auto';
    }
    else {
      p.firstChild.style.overflowX = 'hidden';
    }
  }
}

export {
  cutWord,
  convertEnum,
  enumRenderWithSelect,
  arrayRenderWithSelect,
  cutWordByWidth,
  getScrollWidth,
  getScrollHeight,
  showScoll,
}
