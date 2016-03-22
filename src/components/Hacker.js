import React from 'react';
import { resolve } from './utils/styles';
import HackerStyles from './Hacker.less';

export default class Hacker extends React.Component {
  static displayName = 'Hacker';
  static propTypes = {
    classes: React.PropTypes.object
  };
  static defaultProps = {
    classes: HackerStyles
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div {...resolve(this.props, 'bodyContainer')}>
          <h1>The HACKER</h1>
        </div>
      </div>
    );
  }
}
