import styles from './App.less';
import React from 'react';

export default class App extends React.Component {
  static displayName = 'App';

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
}
