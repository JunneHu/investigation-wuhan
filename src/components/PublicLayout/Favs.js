import dva, { connect } from 'dva';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  Link
} from 'react-router-dom'

import Icon from '../Icon';
import fav from './images/fav.svg';

class Favs extends React.Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  componentWillMount() {
    const { props: { dispatch } } = this;
    dispatch({ type: 'publicLayout/reqGetFavs' });
  }

  constructor(props) {
    super(props);
  }

  initFavs =() => {
    var favs = this.props.favs.filter(each => each.collectTitle);
    if(!favs.length) {
      return <li><span className='hint-dot'></span><a>没有记录</a></li>
    }

    var xFavs = favs.slice(0, 10);

    return xFavs.map((each, index) => {
      return (
        <li key={each.id}>
          {
            xFavs.length - 1 !== index &&
            <span className='hint-line'></span>
          }
          <span className='hint-dot'></span>
          <a title= {each.collectTitle} href={(each.host || location.origin) + each.collectSrc} >{each.collectTitle}</a>
        </li>
      )
    })
  }

  render() {
    return (
      <span className='topnav-hint'>
        <Icon glyph={fav} />
        <div className='hint-box'>
          <ul>
            {this.initFavs()}
          </ul>
          {
            this.props.favs.length ? <Link className='link-all' to='/fav'>查看全部</Link> : ''
          }
          
        </div>
      </span>
    );
  }
}

function mapStateToProps(state) {
  var layout = state.publicLayout || {};
  return { favs: layout.favs || []};
}

export default connect(mapStateToProps)(Favs);
