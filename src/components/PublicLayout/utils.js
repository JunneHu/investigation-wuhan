import React from 'react';

function cutWordByWidth(width, text, record, index) {
  width -= 17;
  width = width < 20 ? 20 : width;

  text = text || '';
  return <div className='ellipsis' title={text} style={{width}}>
    {text}
  </div>
}

function getScrollHeight() {
  const h = document.body.clientHeight - 270;
  return h < 100 ? 100 : h;
}

function getScrollWidth(columns) {
  var wArr = columns.map(each => parseInt(each.width));
  var scrollWidth = 0;
  wArr.forEach(each => {
    scrollWidth += each || 120;
  })
  return scrollWidth;
}

export {
  cutWordByWidth,
  getScrollHeight,
  getScrollWidth,
}