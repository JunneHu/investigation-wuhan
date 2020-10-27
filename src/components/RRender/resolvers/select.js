import React from 'react';
import {default as  BaseResolver} from './base';
import { 
  enumRenderWithSelect, 
  arrayRenderWithSelect 
} from '../../../utils/common';
import _ from 'lodash';

export default  class SelectResolver extends BaseResolver  {
  constructor(dataSource, template) {
    super(dataSource, template);
  }

  resolve = (each, _this) => {
    each.data = each.data || {};
    var ele = this.elementMap[each.type];

    if(!ele) {
      return null;
    }

    var xEle = React.createElement(ele);
    
    var xProps = {...each.data };
    if(_.keys(each.enumData).length) {
      xProps.children = enumRenderWithSelect(each.enumData);
    }

    each.events = each.events || {};

    for(var key in each.events) {
      var evtName = each.events[key];
      if(evtName && _this.props[evtName]) {
        if(key == 'onChange') {
          xProps[key] = _this.props[evtName].bind(null, each.enumData, each.searchField)
        } else {
          xProps[key] = _this.props[evtName]
        }
      }
    }

    xEle.props = {...xEle.props, ...xProps};

    return xEle;
  }
}
