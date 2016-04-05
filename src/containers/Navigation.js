import React from 'react';
import { resolve } from './utils/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { setNavigationState } from '../redux/modules/hacker';
import { setCubeState } from '../redux/modules/cube';
/**
*/
class Navigation extends React.Component {
  static displayName = 'Navigation';
  static propTypes = {
    classes: React.PropTypes.object,
    /** Modules Props **/
    navigationIsOpen: React.PropTypes.bool,
    mouseActive: React.PropTypes.bool,
    /** Redux Actions **/
    setNavigationState: React.PropTypes.func,
    setCubeState: React.PropTypes.func
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
    this.props.setCubeState({
      direction: !this.props.navigationIsOpen ? 'up' : ''
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
          <li><Link to = "/" onClick = {this.toggleMenu}>home</Link></li>
          <li><Link to = "/about" onClick = {this.toggleMenu}>about</Link></li>
          <li><Link to = "/experiments" onClick = {this.toggleMenu}>experiments</Link></li>
          <li><Link to = "/resources" onClick = {this.toggleMenu}>resource links</Link></li>
          <li><Link to = "/contact" onClick = {this.toggleMenu}>contact</Link></li>
        </ul>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    navigationIsOpen: state.hacker.navigationIsOpen
  };
}, { setNavigationState, setCubeState })(Navigation);
