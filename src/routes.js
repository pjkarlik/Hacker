import React from 'react';
import App from './containers/App';
import { Route, IndexRoute } from 'react-router';
import Hacker from './containers/Hacker';

export function prefetchRoutes() {
  require.ensure([
    './containers/About',
    './containers/Experiments',
    './containers/Resources',
    './containers/Contact'], () => {});
}

export default (
  <Route path = "/" component = {App}>
    <IndexRoute component = {Hacker} />
    <Route path = "about" getComponent={(location, cb) =>
      require.ensure(['./containers/About'], (require) => {
        cb(null, require('./containers/About').default);
      })
    } />
    <Route path = "experiments" getComponent={(location, cb) =>
      require.ensure(['./containers/Experiments'], (require) => {
        cb(null, require('./containers/Experiments').default);
      })
    } />
    <Route path = "sesources" getComponent={(location, cb) =>
      require.ensure(['./containers/Resources'], (require) => {
        cb(null, require('./containers/Resources').default);
      })
    } />
    <Route path = "contact" getComponent={(location, cb) =>
      require.ensure(['./containers/Contact'], (require) => {
        cb(null, require('./containers/Contact').default);
      })
    } />
  </Route>
);
