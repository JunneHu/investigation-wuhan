import React from 'react';
import PropTypes from 'prop-types';
import './less/navTab.less';

class NavTab extends React.Component {

  static propTypes = {

  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      tabStatus:[],
    }
  }

  handleTabSelect = (status, item) => {
    if (status == 'all') {
      this.setState({
        tabStatus:[]
      })

      this.props.onSelect && this.props.onSelect([], item);
      return;
    }
    var tabStatus = this.state.tabStatus;
    if(tabStatus.indexOf(status) >= 0) {
      tabStatus = _.remove(tabStatus, status);
    } else {
      if(this.props.isMulti) {
        tabStatus.push(status);
      } else {
        tabStatus = [status];
      }
    }

    this.setState({
      tabStatus
    })
    
    this.props.onSelect && this.props.onSelect(tabStatus, item);
  }

  render() {
    var dataSource = this.props.dataSource || [];
    var { tabStatus } = this.state;
    return (
      <dl className='nav-tab'>
        <dt>{this.props.title}</dt>
        <dd
          onClick={this.handleTabSelect.bind(this, 'all')} 
          className={tabStatus.length == 0 || tabStatus.length == dataSource.length ? 'active' :''}>
          全部
        </dd>
        {
          dataSource.map(each => {
            return <dd  
              onClick={this.handleTabSelect.bind(this, each.key, each)} 
              className={tabStatus.indexOf(each.key) >= 0 ? 'active' :''}>
              {each.value}
            </dd>
          })
        }
      </dl>
    );
  }
}

export default NavTab;
