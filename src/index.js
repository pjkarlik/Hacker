require('console-polyfill');
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

/**
  Entry Point JavaScript
*/
if (typeof document !== 'undefined') {
  ReactDOM.render(<App />, document.getElementById('outlet')); //
}

const version = require('../package.json').version;
const description = require('../package.json').description;

const args = [
  '\n %c %c %c ' + description + ' %c ver ' + version + ' %c \n\n',
  'background: #000; padding:5px 0;',
  'background: #FFF; padding:5px 0; border-top: 1px solid #000; border-bottom: 1px solid #000;',
  'color: white; background: #000; padding:5px 0; border-top: 1px solid #000; border-bottom: 1px solid #000;',
  'color: black; background: #FFF; padding:5px 0; border-top: 1px solid #000; border-bottom: 1px solid #000;',
  'background: #000; padding:5px 0;'
];
try {
  window.console.log.apply(console, args);
} catch (e) {
  window.console.log('The Hacker ' + version);
}
