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
  }

  render() {
    return (
      <div {...resolve(this.props, 'bodyContainer',
        this.state.alt ? 'negaitve' : null)}>

        <Cube classes = {CubeStyles}
          rotation = {this.state.rotation} />

      </div>
    );
  }
}
