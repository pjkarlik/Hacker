import React from 'react';
import { resolve } from './utils/styles';
import { connect } from 'react-redux';
import { setNavigationState } from '../redux/modules/hacker';
import { setCubeRotation } from '../redux/modules/cube';
/**
*/
class Navigation extends React.Component {
  static displayName = 'Navigation';
  static propTypes = {
    navigationIsOpen: React.PropTypes.bool,
    setNavigationState: React.PropTypes.func,
    setCubeRotation: React.PropTypes.func,
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
    this.props.setNavigationState({
      navigationIsOpen: !this.props.navigationIsOpen
    });
    this.props.setCubeRotation({
      rotationActive: true
    });
  }
  render() {
    const { navigationIsOpen } = this.props;
    const navIcon = navigationIsOpen ? ' ' : '+';
    return (
      <div {...resolve(this.props, 'navigation')}>
        <div {...resolve(this.props, 'trigger')} onClick = {this.toggleMenu}
          dangerouslySetInnerHTML = {{ __html: navIcon }} />
        <ul {...resolve(this.props, 'menu', navigationIsOpen ? 'open' : '')}>
          <li><a href="#" onClick = {this.toggleMenu}>about</a></li>
          <li><a href="#" onClick = {this.toggleMenu}>experiments</a></li>
          <li><a href="#" onClick = {this.toggleMenu}>resource links</a></li>
          <li><a href="#" onClick = {this.toggleMenu}>contact</a></li>
        </ul>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    navigationIsOpen: state.hacker.navigationIsOpen
  };
}, { setNavigationState, setCubeRotation })(Navigation);
