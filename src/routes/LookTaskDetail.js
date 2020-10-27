import { connect } from 'dva';
import LookTaskDetail from '../components/TaskList/LookTaskDetail';

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(LookTaskDetail);
