/* global process.env */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/configureStore';
// Container Elements
import Navigation from './Navigation';
// Less for CSS Modules
import AppStyles from './App.less';
import NavigationStyles from './Navigation.less';
// Set up store and load data.
const store = configureStore();

// requestAnimationFrame polyfill
const vendors = ['ms', 'moz', 'webkit', 'o'];
const af = 'AnimationFrame';
let lastTime = 0;

if ('performance' in window === false) {
  window.performance = {};
}
if (!Date.now) {
  Date.now = () => new Date().getTime();
}
if ('now' in window.performance === false) {
  let nowOffset = new Date();

  if (performance.timing && performance.timing.navigationStart) {
    nowOffset = performance.timing.navigationStart;
  }
  window.performance.now = () => Date.now() - nowOffset;
}
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  const vendor = vendors[x];
  window.requestAnimationFrame = window[`${vendor}Request${af}`];
  window.cancelAnimationFrame = window[`${vendor}Cancel${af}`] || window[`${vendor}CancelRequest${af}`];
}
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = callback => {
    const currTime = Date.now;
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(() => callback(currTime + timeToCall), timeToCall);

    lastTime = currTime + timeToCall;
    return id;
  };
}
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = id => clearTimeout(id);
}
// requestAnimationFrame polyfill

export default class App extends React.Component {
  static displayName = 'App';
  static propTypes = {
    children: React.PropTypes.node
  };
  render() {
    if (!this.props.children) {
      return null;
    }
    return (
      <Provider store={store}>
        <div className={AppStyles.bodyContainer}>
          <Navigation classes={NavigationStyles} />
          {this.props.children}
        </div>
      </Provider>
    );
  }
}
