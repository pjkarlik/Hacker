import styles from './App.less';
import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class App extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {

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
