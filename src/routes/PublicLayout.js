import { connect } from 'dva';
import PublicLayout from '../components/PublicLayout';


const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(PublicLayout);
