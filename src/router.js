import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, routerRedux} from 'dva/router';
import dynamic from 'dva/dynamic';

import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

const {ConnectedRouter} = routerRedux;
import {browserHistory} from 'react-router';
import RouteWithLayout from './components/PublicLayout/RouteWithLayout';

const RouterWrapper = ({history, app}) => {

  const Test = dynamic({
    app,
    component: () => import ('./components/Test')
  });

  const App = dynamic({
    app,
    component: () => import ('./routes/App')
  });

  const CustomSettings = dynamic({
    app,
    component: () => import ('./components/PublicLayout/CustomSettings')
  });
  const BasicInformation = dynamic({
    app,
    component: () => import ('./components/PublicLayout/BasicInformation')
  });

  const FavManager = dynamic({
    app,
    component: () => import ('./components/PublicLayout/FavManager')
  });

  const Async = dynamic({
    app,
    component: () => import ('./routes/Async')
  });

  const PageForbidden = dynamic({
    app,
    component: () => import ('./components/PageForbidden')
  });

  const PageServerError = dynamic({
    app,
    component: () => import ('./components/PageServerError')
  });

  const PageNetworkError = dynamic({
    app,
    component: () => import ('./components/PageNetworkError')
  });

  const PageNotFound = dynamic({
    app,
    component: () => import ('./components/PageNotFound')
  });

  const PublicLayout = dynamic({
    app,
    component: () => import ('./components/PublicLayout')
  });
  const ContentPage = dynamic({
    app,
    component: () => import ('./components/ContentPage')
  });
  const JDGame = dynamic({
    app,
    component: () => import ('./routes/JDGame')
  });
  const JDTelFare = dynamic({
    app,
    component: () => import ('./routes/JDTelFare')
  });
  const CSCCard = dynamic({
    app,
    component: () => import ('./routes/CSCCard')
  });
  const CSCUser = dynamic({
    app,
    component: () => import ('./routes/CSCUser')
  });
  const CSCStatus = dynamic({
    app,
    component: () => import ('./components/CSCStatus')
  });
  const GameCompany = dynamic({
    app,
    component: () => import ('./routes/GameCompany')
  });
  const GamePhoneCard = dynamic({
    app,
    component: () => import ('./routes/GamePhoneCard')
  });
  const TaskList = dynamic({
    app,
    component: () => import ('./routes/TaskList')
  });
  return (<LocaleProvider locale={zh_CN}>
    <ConnectedRouter history={history}>
      <Switch>
        <RouteWithLayout exact layout={PublicLayout} path="/fav" component={FavManager}/>
        <RouteWithLayout exact layout={PublicLayout} path="/info" component={BasicInformation}/>
        <RouteWithLayout exact layout={PublicLayout} path="/settings" component={CustomSettings}/>
        <RouteWithLayout exact path="/" layout={PublicLayout} component={ContentPage}/>
        <RouteWithLayout exact path="/task" layout={PublicLayout} component={TaskList}/>
        <RouteWithLayout exact path="/jdgame" layout={PublicLayout} component={JDGame}/>
        <RouteWithLayout exact path="/jdtel" layout={PublicLayout} component={JDTelFare}/>
        <RouteWithLayout exact path="/csccard" layout={PublicLayout} component={CSCCard}/>
        <RouteWithLayout exact path="/cscuser" layout={PublicLayout} component={CSCUser}/>
        <RouteWithLayout exact path="/csc/status" layout={PublicLayout} component={CSCStatus}/>
        <RouteWithLayout exact path="/gamecompany" layout={PublicLayout} component={GameCompany}/>
        <RouteWithLayout exact path="/gamecard" layout={PublicLayout} component={GamePhoneCard}/>
        <Route exact path="/async" component={Async}/>
        <Route exact path="/test" component={Test}/> 
        <Route exact path="/403" component={PageForbidden}/> {/* 403 */}
        <Route exact path="/500" component={PageServerError}/> {/* 500 */}
        <Route exact path="/error" component={PageNetworkError}/> {/* 网络错误 */}
        <Route component={PageNotFound}/>{/* 404 */}
      </Switch>
    </ConnectedRouter>
  </LocaleProvider>);
};

RouterWrapper.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object
};

RouterWrapper.defaultProps = {};

export default RouterWrapper;
