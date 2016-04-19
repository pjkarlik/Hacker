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
export default class App extends React.Component {
  static displayName = 'App';
  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    return (
        <Provider store={store}>
          <div className = {AppStyles.bodyContainer}>
            <Navigation classes = {NavigationStyles} />
            {this.props.children}
          </div>
        </Provider>
    );
  }
}
