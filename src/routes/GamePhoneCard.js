import { connect } from 'dva';
import GamePhoneCard from '../components/GamePhoneCard';


const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(GamePhoneCard);
