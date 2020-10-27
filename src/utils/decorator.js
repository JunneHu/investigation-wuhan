import $ from 'jquery';
import ReactDOM from 'react-dom';

//组件在componentWillReceiveProps中监听了store变化 并且在多个tab页面中使用过
//需要判断该组件的实例所在的tab页是否激活 如果未激活则禁用componentWillReceiveProps
function componentInTabPageDecorator(target, name, descriptor) {
  var temp = descriptor.value;
  descriptor.value = function(nextProps) {
    var dom= ReactDOM.findDOMNode(this);
    var tabContainer = $(dom).parents('.tab-page-container');

    //当页面跳转到404、500等页面后 然后点击浏览器返回按钮 此时页面所有页面都被隐藏 公共组件需要重新render
    var visibleTab = $('.tab-page-container:visible').length; 

    // 如果当前组件包含在tab-page-container 内部 则需要判断是否为激活状态 否则不判断(为了兼容 模态框，模态框是在挂载再body上的)
    if(tabContainer && tabContainer.length && visibleTab) {
      if(tabContainer.css('display') !== 'none') {
        temp.bind(this)(nextProps);
      }
    } else {
      temp.bind(this)(nextProps);
    }
  }
}

function getUuid(target, name, descriptor) {
  console.log(target, name, descriptor)
}

export default  {
  componentInTabPageDecorator,
  getUuid
}
