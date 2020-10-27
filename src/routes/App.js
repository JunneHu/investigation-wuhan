import { connect } from 'dva';
import App from '../components/App';


const mapStateToProps = ({ app: { userInfo, authCode }, loading }) => {
  return {
    userInfo,
    authCode,
    loading,
  };
}

export default connect(mapStateToProps)(App);
