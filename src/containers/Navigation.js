import React from 'react';
import { resolve } from '../utils/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { setSiteState } from '../redux/modules/site';
/**
*/
class Navigation extends React.Component {
  static displayName = 'Navigation';
  static propTypes={
    /** CSS Modules Object **/
    classes: React.PropTypes.object,
    /** Modules Props **/
    navigationIsOpen: React.PropTypes.bool,
    experimentsIsOpen: React.PropTypes.bool,
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
    this.toggleSubMenu = this.toggleSubMenu.bind(this);
  }
  toggleMenu() {
    this.props.setSiteState({
      navigationIsOpen: !this.props.navigationIsOpen,
      experimentsIsOpen: false
    });
  }
  toggleSubMenu() {
    this.props.setSiteState({
      experimentsIsOpen: !this.props.experimentsIsOpen
    });
  }
  render() {
    const { navigationIsOpen, experimentsIsOpen, classes } = this.props;
    const navIcon = navigationIsOpen ? '-' : '+';
    return (
      <div {...resolve(this.props, 'navigation', navigationIsOpen ? 'open' : '')}>
        <div
          className={classes.trigger} onClick={this.toggleMenu}
          dangerouslySetInnerHTML={{ __html: navIcon }} />
        <div className={classes.bar}>
          <ul {...resolve(this.props, 'menu', navigationIsOpen ? 'open' : '')}>
            <li className={classes.list}>
              <Link
                to="/" className={classes.link}
                onlyActiveOnIndex={this.state.true}
                activeClassName={classes.active}
                onClick={this.toggleMenu}>home</Link></li>
            <li className={classes.list}>
              <a
                href="#" className={classes.link}
                activeClassName={classes.active}
                onClick={this.toggleSubMenu}>experiments</a>
              <ul
                {...resolve(this.props, 'submenu', experimentsIsOpen ? 'open' : '')}
                onClick={this.toggleSubMenu}>
                <li className={classes.sublist}>
                  <Link
                    to="/animationcycle" className={classes.sublink}
                    onlyActiveOnIndex={this.state.true}
                    onClick={this.toggleMenu}
                    activeClassName={classes.active}>animation cycle</Link>
                </li>
                <li className={classes.sublist}>
                  <Link
                    to="/fieldeffect" className={classes.sublink}
                    onlyActiveOnIndex={this.state.true}
                    onClick={this.toggleMenu}
                    activeClassName={classes.active}>field effect</Link>
                </li>
                <li className={classes.sublist}>
                  <Link
                    to="/gravity" className={classes.sublink}
                    onlyActiveOnIndex={this.state.true}
                    onClick={this.toggleMenu}
                    activeClassName={classes.active}>gravity</Link>
                </li>
                <li className={classes.sublist}>
                  <Link
                    to="/plasmacube" className={classes.sublink}
                    onlyActiveOnIndex={this.state.true}
                    onClick={this.toggleMenu}
                    activeClassName={classes.active}>plasma cube</Link>
                </li>
                <li className={classes.sublist}>
                  <Link
                    to="/plasmadisplay" className={classes.sublink}
                    onlyActiveOnIndex={this.state.true}
                    onClick={this.toggleMenu}
                    activeClassName={classes.active}>plasma display</Link>
                </li>
                <li className={classes.sublist}>
                  <Link
                    to="/simplexnoise" className={classes.sublink}
                    onlyActiveOnIndex={this.state.true}
                    onClick={this.toggleMenu}
                    activeClassName={classes.active}>simplex noise</Link>
                </li>
                <li className={classes.sublist}>
                  <Link
                    to="/threedemo" className={classes.sublink}
                    onlyActiveOnIndex={this.state.true}
                    onClick={this.toggleMenu}
                    activeClassName={classes.active}>three.js demo</Link>
                </li>
              </ul>
            </li>
            <li className={classes.list}>
              <Link
                to="/about" className={classes.link}
                activeClassName={classes.active}
                onClick={this.toggleMenu}>about</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    navigationIsOpen: state.site.navigationIsOpen,
    experimentsIsOpen: state.site.experimentsIsOpen,
    transition: state.site.transition
  };
}, { setSiteState })(Navigation);
