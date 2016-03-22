import styles from './App.less';
import React from 'react';
import ReactDom from 'react-dom';

export default class App extends React.Component {
  // static displayName = 'App'; causing build problems??

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={styles.bodyContainer}>
          <h1>HACKER</h1>
        </div>
      </div>
    );
  }
};
