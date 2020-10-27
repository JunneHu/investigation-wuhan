import { connect } from 'dva';
import JdGame from '../components/JdGame';


const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(JdGame);
