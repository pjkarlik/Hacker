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
    this.state = {
      menu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    this.setState({
      menu: !this.state.menu
    });
  }
  render() {
    const navIcon = this.state.menu ? ' ' : '+';
    return (
      <div {...resolve(this.props, 'navigation')}>
        <div {...resolve(this.props, 'trigger')} onClick = {this.toggleMenu}
          dangerouslySetInnerHTML = {{ __html: navIcon }} />
        <ul {...resolve(this.props, 'menu', this.state.menu ? 'open' : '')}>
          <li><a href="#" onClick = {this.toggleMenu}>about</a></li>
          <li><a href="#" onClick = {this.toggleMenu}>experiments</a></li>
          <li><a href="#" onClick = {this.toggleMenu}>resource links</a></li>
          <li><a href="#" onClick = {this.toggleMenu}>contact</a></li>
        </ul>
      </div>
    );
  }
}
