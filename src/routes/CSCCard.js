import { connect } from 'dva';
import CscCard from '../components/CscCard';


const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(CscCard);
