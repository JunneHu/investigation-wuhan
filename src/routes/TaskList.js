import { connect } from 'dva';
import TaskList from '../components/TaskList';


const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(TaskList);
