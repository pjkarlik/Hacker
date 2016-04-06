import React from 'react';
import { resolve } from './utils/styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
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
    transition: React.PropTypes.string,
    /** Redux Actions **/
    setSiteState: React.PropTypes.func
  };
  static defaultProps = {
    classes: HackerStyles
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.transition === 'out') {
      setTimeout(() => {
        this.props.setSiteState({
          transition: 'in'
        });
      }, 500);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.transition !== this.props.transition) {
      this.props.setSiteState({
        transition: this.props.transition === 'in' ? 'out' : 'in'
      });
    }
    if (nextProps.navigationIsOpen !== this.props.navigationIsOpen) {
      this.props.setSiteState({
        transition: this.props.transition === 'in' ? 'out' : 'in'
      });
    }
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
    navigationIsOpen: state.site.navigationIsOpen,
    transition: state.site.transition
  };
}, { setSiteState })(Hacker);
