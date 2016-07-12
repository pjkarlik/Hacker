import React from 'react';
import App from './containers/App';
import { Route, IndexRoute } from 'react-router';
import Hacker from './containers/Hacker';

/**
  Route Prefetching
**/
export function prefetchRoutes() {
  require.ensure([
    './containers/About',
    './containers/AnimationCycle',
    './containers/FieldEffect',
    './containers/FlockDemo',
    './containers/Gravity',
    './containers/PlasmaCube',
    './containers/PlasmaDisplay',
    './containers/SimplexNoise',
    './containers/ThreeDemo'
  ], () => {});
}
/**
  Routes for site - using Require.Ensures
**/
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Hacker} />
    <Route
      path="about" getComponent={(location, cb) =>
      require.ensure(['./containers/About'], (require) => {
        cb(null, require('./containers/About').default);
      })
    } />
    <Route
      path="animationcycle" getComponent={(location, cb) =>
      require.ensure(['./containers/AnimationCycle'], (require) => {
        cb(null, require('./containers/AnimationCycle').default);
      })
    } />
    <Route
      path="fieldeffect" getComponent={(location, cb) =>
      require.ensure(['./containers/FieldEffect'], (require) => {
        cb(null, require('./containers/FieldEffect').default);
      })
    } />
    <Route
      path="flockdemo" getComponent={(location, cb) =>
      require.ensure(['./containers/FlockDemo'], (require) => {
        cb(null, require('./containers/FlockDemo').default);
      })
    } />
    <Route
      path="gravity" getComponent={(location, cb) =>
      require.ensure(['./containers/Gravity'], (require) => {
        cb(null, require('./containers/Gravity').default);
      })
    } />
    <Route
      path="plasmacube" getComponent={(location, cb) =>
      require.ensure(['./containers/PlasmaCube'], (require) => {
        cb(null, require('./containers/PlasmaCube').default);
      })
    } />
    <Route
      path="plasmadisplay" getComponent={(location, cb) =>
      require.ensure(['./containers/PlasmaDisplay'], (require) => {
        cb(null, require('./containers/PlasmaDisplay').default);
      })
    } />
    <Route
      path="simplexnoise" getComponent={(location, cb) =>
      require.ensure(['./containers/SimplexNoise'], (require) => {
        cb(null, require('./containers/SimplexNoise').default);
      })
    } />
    <Route
      path="threedemo" getComponent={(location, cb) =>
      require.ensure(['./containers/ThreeDemo'], (require) => {
        cb(null, require('./containers/ThreeDemo').default);
      })
    } />
  </Route>
);
