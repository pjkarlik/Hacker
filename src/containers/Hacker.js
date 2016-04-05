import React from 'react';
import { resolve } from './utils/styles';
import { connect } from 'react-redux';
import { setCubeState } from '../redux/modules/cube';
import Cube from './Cube';

// Less for CSS Modules
import HackerStyles from './Hacker.less';
import CubeStyles from './Cube.less';

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
    setCubeState: React.PropTypes.func
  };
  static defaultProps = {
    classes: HackerStyles
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.setCubeState({
        direction: ''
      });
    }, 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { navigationIsOpen } = this.props;
    const background = (
      <div {...resolve(this.props, navigationIsOpen ? null : 'circleEffect')} />
    );
    return (
      <div {...resolve(this.props, 'container')}>
        {background}
        <Cube classes = {CubeStyles} />
      </div>
    );
  }
}
export default connect((state) => {
  return {
    navigationIsOpen: state.hacker.navigationIsOpen,
    mouseActive: state.hacker.mouseActive,
    direction: state.cube.direction
  };
}, { setCubeState })(Hacker);
