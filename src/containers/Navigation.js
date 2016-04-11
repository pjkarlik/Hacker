import React from 'react';
import { resolve } from './utils/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { setSiteState } from '../redux/modules/site';
/**
*/
class Navigation extends React.Component {
  static displayName = 'Navigation';
  static propTypes = {
    classes: React.PropTypes.object,
    /** Modules Props **/
    navigationIsOpen: React.PropTypes.bool,
    mouseActive: React.PropTypes.bool,
    transition: React.PropTypes.string,
    /** Redux Actions **/
    setSiteState: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      true: true
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    this.props.setSiteState({
      navigationIsOpen: !this.props.navigationIsOpen
    });
  }
  render() {
    const { navigationIsOpen, classes } = this.props;
    const navIcon = navigationIsOpen ? ' ' : '+';
    return (
      <div className = {classes.navigation}>
        <div className = {classes.trigger} onClick = {this.toggleMenu}
          dangerouslySetInnerHTML = {{ __html: navIcon }} />
        <ul {...resolve(this.props, 'menu', navigationIsOpen ? 'open' : '')}>
          <li className = {classes.list}>
            <Link to = "/" className = {classes.link}
              onlyActiveOnIndex={this.state.true}
              activeClassName = {classes.active}
              onClick = {this.toggleMenu}>home</Link></li>
          <li className = {classes.list}>
            <Link to = "/about" className = {classes.link}
              activeClassName = {classes.active}
              onClick = {this.toggleMenu}>about</Link></li>
          <li className = {classes.list}>
            <Link to = "/experiments" className = {classes.link}
              activeClassName = {classes.active}
              onClick = {this.toggleMenu}>experiments</Link></li>
          <li className = {classes.list}>
            <Link to = "/resources" className = {classes.link}
              activeClassName = {classes.active}
              onClick = {this.toggleMenu}>resource links</Link></li>
          <li className = {classes.list}>
            <Link to = "/contact" className = {classes.link}
              activeClassName = {classes.active}
              onClick = {this.toggleMenu}>contact</Link></li>
        </ul>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    navigationIsOpen: state.site.navigationIsOpen,
    transition: state.site.transition
  };
}, { setSiteState })(Navigation);
