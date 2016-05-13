import React from 'react';
import App from './containers/App';
import { Route, IndexRoute } from 'react-router';
import Hacker from './containers/Hacker';

// Route Prefetching
export function prefetchRoutes() {
  require.ensure([
    './containers/About',
    './containers/Experiments',
    './containers/AnimationCycle',
    './containers/FieldEffect',
    './containers/PlasmaCube',
    './containers/PlasmaDisplay'
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
    <Route path = "animationcycle" getComponent={(location, cb) =>
      require.ensure(['./containers/AnimationCycle'], (require) => {
        cb(null, require('./containers/AnimationCycle').default);
      })
    } />
    <Route path = "fieldeffect" getComponent={(location, cb) =>
      require.ensure(['./containers/FieldEffect'], (require) => {
        cb(null, require('./containers/FieldEffect').default);
      })
    } />
    <Route path = "plasmacube" getComponent={(location, cb) =>
      require.ensure(['./containers/PlasmaCube'], (require) => {
        cb(null, require('./containers/PlasmaCube').default);
      })
    } />
    <Route path = "plasmadisplay" getComponent={(location, cb) =>
      require.ensure(['./containers/PlasmaDisplay'], (require) => {
        cb(null, require('./containers/PlasmaDisplay').default);
      })
    } />
  </Route>
);
