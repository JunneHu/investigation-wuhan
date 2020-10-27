import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './less/searchInput.less';
import { Select, Button, Spin, Icon } from 'antd';
import _ from 'lodash';
const Option = Select.Option;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const searchMode = {
  LOCAL:'local',
  SERVER:'server'
}

class SearchInput extends React.Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchMode: searchMode.LOCAL,
    }
    this.timeout = null;
  }

  componentWillReceiveProps(nextProps, oldProps) {
  }

  componentDidUpdate() {
  }

  handleChange = (value) => {
    value = value.trim();

    this.setState({
      value:value,
    }, () => {
      if(value.match(/\w+/) || value == '') {
        this.props.dispatch({
          type: 'publicLayout/searchMenus',
          payload: {
            searchMenus: [],
            isSearching: false,
          }
        });

        return ;
      }

      var p = _.chain(this.props.dataSource)
        .filter(each => each.fullName.indexOf(value) > -1)
        .uniqBy('fullName')
        .value();

      if(p.length) {
        this.props.dispatch({
          type: 'publicLayout/searchMenus',
          payload: {searchMenus:p.splice(0, 10)}
        });
      }
    });

  }

  handleSelect = (value, opt) => {
    // console.log(opt.props, opt.props.AppId);
  }

  handleKeyPress =(evt) => {
  }

  handleFocus =() => {
    this.setState({
      value:''
    });
  }

  render() {
    const options = this.props.searchMenus.map(d =>
      <Option key={d.fullName} menu={d} title={d.fullName} moduleId={d.moduleId}>
        {d.fullName}
      </Option>
    );

    return (
      <div className="search" ref="sle">
        <Select
          mode="combobox"
          optionLabelProp='children'
          value={this.state.value}
          placeholder={this.props.placeholder}
          notFoundContent=""
          // style={this.props.style}
          defaultActiveFirstOption={false}
          showSearch={true}
          showArrow={true}
          onFocus={this.handleFocus }
          filterOption={false}
          onSelect ={this.props.onSelect}
          onChange={this.handleChange}
          getPopupContainer={() => document.body }
        >
          {options}
        </Select>
        {this.props.isSearching &&
          <div style={{background:'#1e2a38', width:180, marginTop:-8}}>
            <Spin style={{padding:5}}  indicator={antIcon}/>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  var layout = state.publicLayout || {};
  return {
    searchMenus: layout.searchMenus || [],
    isSearching: layout.isSearching || false
  }
}

export default connect(mapStateToProps)(SearchInput);
