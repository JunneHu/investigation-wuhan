import { connect } from 'dva';
import LookBaseInfo from '../components/TaskList/LookBaseInfo';


const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(LookBaseInfo);
