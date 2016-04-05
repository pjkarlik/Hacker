import React from 'react';
import { resolve } from './utils/styles';
import getBrowserDimensions from './utils/getBrowserDimensions';
import HackerStyles from './Hacker.less';
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
    this.reactMouse = this.reactMouse.bind(this);
  }

  componentDidMount() {
    // this.interval = setInterval(this.negativeState, 100);
    // the hacker frequencey //
    this.interval = setInterval(this.typeState, 2600);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    // document.body.addEventListener('mouseover', () => {
    //   this.reactMouse();
    // });
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
  reactMouse(e) {
    const halfPoint = getBrowserDimensions(window, document);
    const mouseX = 90 - Math.floor((90 / (halfPoint.browserWidth / 2)) * e.clientX);
    const mouseY = 90 - Math.floor((90 / (halfPoint.browserHeight / 2)) * e.clientY);

    const styleObject = {
      transform: `rotateY(${mouseX}deg) rotateX(${mouseY}deg)`
    };
    this.setState({
      panelStyle: styleObject
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
        this.state.alt ? 'negaitve' : null)}
        onMouseMove = {this.reactMouse} >
          {background}
        <div {...resolve(this.props, 'panelContainer')}>
          <div {...resolve(this.props, 'panel',
            this.state.alt ? 'negaitve' : null)} ref="panel"
            style = {this.state.panelStyle} />
        </div>

      </div>
    );
  }
}
