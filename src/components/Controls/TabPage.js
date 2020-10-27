import dva, { connect } from 'dva';
import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;


import {
  Link
} from 'react-router-dom'

class TabPage extends React.Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  componentWillMount() {
  }

  constructor(props) {
    super(props);
  }

  renderChild = () => {
    var activeTabKey = this.props.activeTabKey || 0;

    if(!this.props.tabPages.length){
      return ''
    }

    return this.props.tabPages.map((each, i) => {
      return (
        <div className='tab-page-container' style={{display:activeTabKey === each.pathname ? 'block':'none' }}>
          {each.component}
        </div>
      )
    })
  }

  handleTabEdit = (activeKey) => {
    this.props.onEdit && this.props.onEdit(activeKey);
  }

  handleTabChange = (activeKey) => {
    this.props.onChange && this.props.onChange(activeKey);
  }

  render() {
    return (
      <div className='contentpage-container'>
        <Tabs 
          hideAdd 
          defaultActiveKey="0" 
          type="editable-card"
          activeKey={this.props.activeTabKey}
          onEdit = {this.handleTabEdit}
          onChange={this.handleTabChange}>
          {
            this.props.tabPages.map( (each, index) => {
              return <TabPane tab={each.currentMenu.fullName || '首页'} key={each.pathname}></TabPane>
            })
          }
        </Tabs>

        {this.renderChild()}
      </div>
    );
  }
}

export default TabPage;
