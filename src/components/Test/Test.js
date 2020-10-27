import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';

// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');



class Test extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>Test
        <DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
      </div>
    );
  }
}

export default Test;
