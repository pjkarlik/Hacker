import React from 'react';
import { resolve } from './utils/styles';

/**
*/
export default class Navigation extends React.Component {
  static displayName = 'Navigation';
  static propTypes = {
    classes: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div {...resolve(this.props, 'navigation')}>
      </div>
    );
  }
}
