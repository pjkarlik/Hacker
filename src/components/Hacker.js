import styles from './Hacker.less';
import React from 'react';

export default class Hacker extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={styles.bodyContainer}>
          <h1>The HACKER</h1>
        </div>
      </div>
    );
  }
}
