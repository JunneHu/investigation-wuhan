import { connect } from 'dva';
import GameCompany from '../components/GameCompany';


const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(GameCompany);
