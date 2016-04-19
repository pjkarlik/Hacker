require('console-polyfill');
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

const history = useRouterHistory(createHistory)({ basename: window.baseName || '/' });
/**
  Entry Point JavaScript
*/
require.ensure(['./routes'], (require) => {
  const routes = require('./routes').default;
  const prefetchRoutes = require('./routes').prefetchRoutes;
  render(
    <Router history={history} routes={routes} />,
    document.getElementById('react-mount'));
  prefetchRoutes();
});

/**
  Fancy Console Log experiment for 'the Hacker'
*/
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
// Check to see if browser can handle fancy console.log else just blurb text
try {
  window.console.log.apply(console, args);
} catch (e) {
  window.console.log('The Hacker ' + version);
}
