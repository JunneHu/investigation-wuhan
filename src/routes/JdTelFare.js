import { connect } from 'dva';
import JdTelFare from '../components/JdTelFare';


const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(JdTelFare);
