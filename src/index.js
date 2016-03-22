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
