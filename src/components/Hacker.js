import React from 'react';
import { resolve } from './utils/styles';
import { connect } from 'react-redux';
import { setNavigationState } from '../redux/modules/hacker';
import Cube from './Cube';
import Navigation from './Navigation';

// Less for CSS Modules
import HackerStyles from './Hacker.less';
import CubeStyles from './Cube.less';
import NavigationStyles from './Navigation.less';

/**
    ▄▄▄█████▓ ██░ ██ ▓█████     ██░ ██  ▄▄▄       ▄████▄   ██ ▄█▀▓█████ ▒██▀███
    ▓  ██▒ ▓▒▓██░ ██▒▓█   ▀    ▓██░ ██▒▒████▄    ▒██▀ ▀█   ██▄█▒ ▓█   ▀ ▒▓█ ▒ ██▒
    ▒ ▒▓█░ ▒░▒██▀▀██░▒███      ▒██▀▀██░▒██  ▀█▄  ▒▓█    ▄ ▓███▄░ ▒███    ▓█ ░▄█ ▒
    ░ ▓██▓ ░ ░▓█ ░██ ▒▓█  ▄    ░▓█ ░██ ░██▄▄▄▄██ ▒▓▓▄ ▄██▒▓██ █▄ ▒▓█  ▄ ▒███▀▀█▄
      ▒██▒ ░ ░▓█▒░██▓░▒████▒   ░▓█▒░██▓ ▓█   ▓██▒  ▒▓█▒▀ ░▒██▒ █▄░▒████▒░██▓ ▒██▒
      ▒ ░░    ▒ ░░▒░▒░░ ▒░ ░    ▒ ░░▒░▒ ▒▒   ▓▒█░░ ░▒ ▒  ░▒ ▒▒ ▓▒░░ ▒░ ░░ ▒▓ ░▒▓░
        ░     ▒ ░▒░ ░ ░ ░  ░    ▒ ░▒░ ░  ▒   ▒▒ ░  ░  ▒   ░ ░▒ ▒░ ░ ░  ░  ░▒ ░ ▒░
      ░       ░  ░░ ░   ░       ░  ░░ ░  ░   ▒   ░        ░ ░░ ░    ░     ░░   ░
              ░  ░  ░   ░  ░    ░  ░  ░      ░  ░░ ░      ░  ░      ░  ░   ░
                                                 ░

      the Hacker is an experimental website in design and user interaction.
*/
class Hacker extends React.Component {
  static displayName = 'Hacker';
  static propTypes = {
    classes: React.PropTypes.object,
    /** Modules Props **/
    navigationIsOpen: React.PropTypes.bool,
    mouseActive: React.PropTypes.bool,
    /** Redux Actions **/
    setNavigationState: React.PropTypes.func
  };
  static defaultProps = {
    classes: HackerStyles
  };
  constructor(props) {
    super(props);
    this.state = {
      alt: false
    };
    this.negativeState = this.negativeState.bind(this);
  }
  componentDidMount() {
    // this.interval = setInterval(this.negativeState, 120);
    setTimeout(() => {
      this.props.setNavigationState({
        navigationIsOpen: !this.props.navigationIsOpen
      });
    }, 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  negativeState() {
    this.setState({
      alt: !this.state.alt
    });
  }
  render() {
    const background = (
      <div {...resolve(this.props, 'circleEffect', this.state.alt ? 'negaitve' : null)} />
    );
    return (
      <div {...resolve(this.props, 'bodyContainer', this.state.alt ? 'negaitve' : null)}>
        <Navigation classes = {NavigationStyles} />
        {background}
        <Cube classes = {CubeStyles}
          alt = {this.state.alt} />
      </div>
    );
  }
}
export default connect((state) => {
  return {
    navigationIsOpen: state.hacker.navigationIsOpen,
    mouseActive: state.hacker.mouseActive
  };
}, { setNavigationState })(Hacker);
