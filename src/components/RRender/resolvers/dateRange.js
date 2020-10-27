import React from 'react';
import {default as  BaseResolver} from './base';
import _ from 'lodash';
import DateRange from '../components/DateRange'


export default  class DateRangeResolver extends BaseResolver  {
  constructor(dataSource, template) {
    super(dataSource, template);
  }

  resolve = (each, _this) => {
    each.data = each.data || {};

    var xEle = React.createElement(DateRange);
    
    var xProps = {...each.data };
    each.events = each.events || {};

    for(var key in each.events) {
      var evtName = each.events[key];
      if(evtName && _this.props[evtName]) {
        xProps[key] = _this.props[evtName]
      }
    }

    xEle.props = {...xEle.props, ...xProps};

    return xEle;
  }
}
