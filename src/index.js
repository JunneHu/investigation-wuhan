import 'babel-polyfill';
import dva from 'dva';
import axios from 'axios';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import { message } from 'antd';
import './components/CommonCss/CommonCss.less';

import PublicLayout from './models/publicLayout';
import JdGame from './models/jdGame';
import JdTelFare from './models/jdTelFare';

import CscCard from './models/cscCard';
import CscUser from './models/cscUser';

import GameCompany from './models/gameCompany';
import GamePhoneCard from './models/gamePhoneCard';

import AppModel from './models/app';
import cscStatus from './models/cscStatus';
import taskList from './models/taskList';
// =======================
// 1. Initialize
// =======================
const app = dva({
  history: createHistory(),
  onError(e, dispatch) {
    message.error(e.message, 3);
  },
});

app.model(PublicLayout);
app.model(JdGame);
app.model(JdTelFare);
app.model(AppModel);

app.model(CscCard);
app.model(CscUser);
app.model(GameCompany);
app.model(GamePhoneCard);
app.model(cscStatus);
app.model(taskList);
// =======================
// 2. Plugins
// =======================
app.use( createLoading() );

// =======================
// 3. Model
// =======================
// Moved to router.js

// =======================
// 4. Router
// =======================
app.router( require('./Router') );

// =======================
// 5. Start
// =======================
app.start('#app');
