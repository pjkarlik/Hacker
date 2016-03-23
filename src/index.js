import React from 'react';
import ReactDOM from 'react-dom';
import Hacker from './components/Hacker';
/**
  Entry Point JavaScript
*/
if (typeof document !== 'undefined') {
  ReactDOM.render(<Hacker />, document.getElementById('outlet')); //
}

export default Hacker;

const version = '1.0.2'; // require('../package.json').version;
const description = 'the hacker'; // require('../package.json').description;

const args = [
  '\n %c %c %c ' + description + ' %c ver ' + version + ' \n\n',
  'background: #000; padding:5px 0;',
  'background: #FF0000; padding:5px 0;',
  'color: white; background: #000; padding:5px 0;',
  'color: white; background: #FF0000; padding:5px 0;'
];
try {
  window.console.log.apply(console, args);
} catch (e) {
  window.console.log('The Hacker ' + version);
}
