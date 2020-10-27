import { connect } from 'dva';
import LookTradeInfo from '../components/TaskList/LookTradeInfo';

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(LookTradeInfo);
