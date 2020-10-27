import React from 'react';
import {
  Route,
} from 'dva/router';

export default function RouteWithLayout({ layout, component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        React.createElement(layout, { ...props, xc: component })
    } />
  );
}
