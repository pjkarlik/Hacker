/* global process.env */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/configureStore';
import Hacker from './Hacker';
// Set up store and load data.
const store = configureStore();

const App = (props) => {
  return (
      <Provider store={store}>
        <Hacker {...props} />
      </Provider>
  );
};
App.displayName = 'App';

export default App;
