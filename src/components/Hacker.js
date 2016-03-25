import React from 'react';
import { resolve } from './utils/styles';
import Cube from './Cube';
import HackerStyles from './Hacker.less';
import CubeStyles from './Cube.less';
/**
    ▄▄▄█████▓ ██░ ██ ▓█████     ██░ ██  ▄▄▄       ▄████▄   ██ ▄█▀▓█████  ██▀███
    ▓  ██▒ ▓▒▓██░ ██▒▓█   ▀    ▓██░ ██▒▒████▄    ▒██▀ ▀█   ██▄█▒ ▓█   ▀ ▓██ ▒ ██▒
    ▒ ▓██░ ▒░▒██▀▀██░▒███      ▒██▀▀██░▒██  ▀█▄  ▒▓█    ▄ ▓███▄░ ▒███   ▓██ ░▄█ ▒
    ░ ▓██▓ ░ ░▓█ ░██ ▒▓█  ▄    ░▓█ ░██ ░██▄▄▄▄██ ▒▓▓▄ ▄██▒▓██ █▄ ▒▓█  ▄ ▒███▀▀█▄
      ▒██▒ ░ ░▓█▒░██▓░▒████▒   ░▓█▒░██▓ ▓█   ▓██▒▒ ▓███▀ ░▒██▒ █▄░▒████▒░██▓ ▒██▒
      ▒ ░░    ▒ ░░▒░▒░░ ▒░ ░    ▒ ░░▒░▒ ▒▒   ▓▒█░░ ░▒ ▒  ░▒ ▒▒ ▓▒░░ ▒░ ░░ ▒▓ ░▒▓░
        ░     ▒ ░▒░ ░ ░ ░  ░    ▒ ░▒░ ░  ▒   ▒▒ ░  ░  ▒   ░ ░▒ ▒░ ░ ░  ░  ░▒ ░ ▒░
      ░       ░  ░░ ░   ░       ░  ░░ ░  ░   ▒   ░        ░ ░░ ░    ░     ░░   ░
              ░  ░  ░   ░  ░    ░  ░  ░      ░  ░░ ░      ░  ░      ░  ░   ░
                                                 ░

      the Hacker is an experimental website in design and user interaction.
      intended for entertainment purposes only and not associated
      with any black-hat organization.
*/
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
    this.state = {
      alt: false,
      type: true,
      panelStyle: null
    };
    this.negativeState = this.negativeState.bind(this);
    this.typeState = this.typeState.bind(this);
  }
  componentDidMount() {
    this.interval = setInterval(this.negativeState, 100);
    // the hacker frequencey //
    this.interval = setInterval(this.typeState, 2600);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  negativeState() {
    this.setState({
      alt: !this.state.alt
    });
  }
  typeState() {
    this.setState({
      type: !this.state.type
    });
  }
  render() {
    const background = (
      <div {...resolve(this.props,
        this.state.type ? 'boxEffect' : 'circleEffect',
        this.state.alt ? 'negaitve' : null)} />
    );
    return (
      <div {...resolve(this.props, 'bodyContainer',
        this.state.alt ? 'negaitve' : null)}>
        {background}
        <Cube classes = {CubeStyles}
          alt = {this.state.alt}
          rotation = {this.state.rotation} />

      </div>
    );
  }
}
