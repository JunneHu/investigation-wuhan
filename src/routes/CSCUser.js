import { connect } from 'dva';
import CscUser from '../components/CscUser';


const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(CscUser);
