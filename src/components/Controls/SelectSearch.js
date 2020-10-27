import React from 'react';
import PropTypes from 'prop-types';
import dva, { connect } from 'dva';
import { Select, Input, Button } from 'antd';
import ClearableInput from './ClearableInput';

class SelectSearch extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    defaultSelectValue: PropTypes.string,
    placeholder: PropTypes.string,
    selectOptions: PropTypes.array,
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
    inputStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    selectStyle: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    const { value, placeholder, inputStyle, buttonStyle, selectStyle, defaultSelectValue, selectValue, selectOptions, onSelectChange, onChange, onSearch} = this.props;
    return (
      <span>
      <Input.Group compact>
        {
          selectOptions && selectOptions.length &&
          <Select
            showSearch
            value={selectValue}
            onChange={onSelectChange}
            className='search-select'
            style={{ width: 100, marginRight:0, ...selectStyle }}
            placeholder="搜索条件">
              {
                selectOptions.map(each => (
                  <Option value={each.value} dataref={each}>{each.text}</Option>
                ))
              }
          </Select>
        }
        <ClearableInput className='search-input'
          value={value}
          onChange={onChange}
          placeholder={placeholder} 
          style={{ width: 200, ...inputStyle }} />
          <Button type="primary" className='search-button' onClick={onSearch}
            style={{ marginLeft:'8px', float:'right', ...buttonStyle }} >
            搜索
          </Button>
        </Input.Group>
      </span>
    );
  }
}

export default SelectSearch;
