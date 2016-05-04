import React from 'react';
import App from './containers/App';
import { Route, IndexRoute } from 'react-router';
import Hacker from './containers/Hacker';

// Route Prefetching
export function prefetchRoutes() {
  require.ensure([
    './containers/About',
    './containers/Experiments',
    './containers/FieldEffect',
    './containers/DimensionTransform',
    './containers/BinaryGarden'
  ], () => {});
}
/**
  Routes for site - using Require.Ensures
**/
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
    <Route path = "fieldeffect" getComponent={(location, cb) =>
      require.ensure(['./containers/FieldEffect'], (require) => {
        cb(null, require('./containers/FieldEffect').default);
      })
    } />
    <Route path = "dimensiontransform" getComponent={(location, cb) =>
      require.ensure(['./containers/DimensionTransform'], (require) => {
        cb(null, require('./containers/DimensionTransform').default);
      })
    } />
    <Route path = "bindarygarden" getComponent={(location, cb) =>
      require.ensure(['./containers/BinaryGarden'], (require) => {
        cb(null, require('./containers/BinaryGarden').default);
      })
    } />
  </Route>
);
