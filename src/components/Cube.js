import React from 'react';
import { resolve } from './utils/styles';
import getBrowserDimensions from './utils/getBrowserDimensions';

/**
*/
export default class Cube extends React.Component {
  static displayName = 'Cube';
  static propTypes = {
    rotation: React.PropTypes.array,
    alt: React.PropTypes.bool,
    cubeState: React.PropTypes.func,
    classes: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      rotation: [0, 0],
      mouseActive: false,
      alt: this.props.alt
    };
    this.reactMouse = this.reactMouse.bind(this);
    this.inactMouse = this.inactMouse.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.waitFor = this.waitFor.bind(this);
    this.computeRotation = this.computeRotation.bind(this);
    this.generateMouseMove = this.generateMouseMove.bind(this);
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.touchMove);
    window.addEventListener('touchend', this.inactMouse);
    this.generateMouseMove();
    this.waitFor();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.alt !== this.props.alt) {
      this.setState({
        alt: !this.props.alt
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  computeRotation(x, y) {
    const rotation = [];
    const browserSize = getBrowserDimensions(window, document);
    const mouseX = 90 - Math.floor((90 / (browserSize.browserWidth / 2)) * x);
    const mouseY = 90 - Math.floor((90 / (browserSize.browserHeight / 2)) * y);

    rotation.x = mouseX;
    rotation.y = mouseY;
    this.setState({
      rotation
    });
  }
  reactMouse(e) {
    clearInterval(this.interval);
    this.computeRotation(e.clientX, e.clientY);
    this.setState({
      mouseActive: true
    });
  }
  touchStart(e) {
    e.preventDefault();
    clearInterval(this.interval);
    this.reactMouse(e.touches[0]);
  }
  touchMove(e) {
    e.preventDefault();
    const touchX = Math.floor(e.changedTouches[0].clientX);
    const touchY = Math.floor(e.changedTouches[0].clientY);
    this.computeRotation(touchX, touchY);
  }
  inactMouse() {
    this.waitFor();
    this.setState({
      mouseActive: false
    });
  }
  waitFor() {
    const randomDelay = Math.floor((Math.random() * 6000) + 1000);
    this.interval = setInterval(this.generateMouseMove, randomDelay);
  }
  generateMouseMove() {
    const browserSize = getBrowserDimensions(window, document);
    const genX = Math.floor((Math.random() * browserSize.browserWidth) + 1);
    const genY = Math.floor((Math.random() * browserSize.browserHeight) + 1);
    this.computeRotation(genX, genY);
  }
  render() {
    const { rotation, mouseActive } = this.state;
    const styleObject = {
      transition: `${mouseActive ? '0' : '2000'}ms`,
      transform: `rotateY(${360 - rotation.x}deg) rotateX(${rotation.y}deg)`
    };
    return (
      <div {...resolve(this.props, 'container')}
        onTouchStart = {this.touchStart}
        onMouseMove = {this.reactMouse}
        onMouseLeave = {this.inactMouse}>
        <div {...resolve(this.props, 'cube')} style = {styleObject}>
          <div {...resolve(this.props, 'front', this.state.alt ? 'negaitve' : null)}>J</div>
          <div {...resolve(this.props, 'back', this.state.alt ? 'negaitve' : null)}>pjkarlik@gmail.com</div>
          <div {...resolve(this.props, 'right', this.state.alt ? 'negaitve' : null)}>K</div>
          <div {...resolve(this.props, 'left', this.state.alt ? 'negaitve' : null)}>P</div>
          <div {...resolve(this.props, 'top', this.state.alt ? 'negaitve' : null)}>
            user interface architect
          </div>
          <div {...resolve(this.props, 'bottom', this.state.alt ? 'negaitve' : null)}>
            front-end developer
          </div>
        </div>
      </div>
    );
  }
}
