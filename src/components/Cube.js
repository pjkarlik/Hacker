import React from 'react';
import { resolve } from './utils/styles';
import { connect } from 'react-redux';
import { setCubeRotation } from '../redux/modules/cube';
import getBrowserDimensions from './utils/getBrowserDimensions';

/**
*/
export default class Cube extends React.Component {
  static displayName = 'Cube';
  static propTypes = {
    rotation: React.PropTypes.array,
    alt: React.PropTypes.bool,
    cubeState: React.PropTypes.func,
    direction: React.PropTypes.string,
    navigationIsOpen: React.PropTypes.bool,
    rotationActive: React.PropTypes.bool,
    setCubeRotation: React.PropTypes.func,
    classes: React.PropTypes.object
  };
  static defaultProps = {
    direction: null
  };
  constructor(props) {
    super(props);
    this.state = {
      rotation: [0, 0],
      mouseActive: false,
      direction: this.props.direction,
      alt: this.props.alt
    };
    this.reactMouse = this.reactMouse.bind(this);
    this.inactMouse = this.inactMouse.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.waitFor = this.waitFor.bind(this);
    this.focusCube = this.focusCube.bind(this);
    this.computeRotation = this.computeRotation.bind(this);
    this.generateMouseMove = this.generateMouseMove.bind(this);
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.touchMove);
    window.addEventListener('touchend', this.inactMouse);
    this.waitFor();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.alt !== this.props.alt) {
      this.setState({
        alt: !this.props.alt
      });
    }
    if (nextProps.direction !== this.props.direction) {
      this.setState({
        direction: nextProps.direction
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  computeRotation(x, y) {
    if (!this.props.rotationActive) {
      return;
    }
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
  focusCube() {
    clearInterval(this.interval);
    this.props.setCubeRotation({
      rotationActive: !this.props.rotationActive
    });
    this.setState({
      mouseActive: false
    });
  }
  waitFor() {
    clearInterval(this.interval);
    const randomDelay = Math.floor((Math.random() * 8000) + 2000);
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
    const { navigationIsOpen, rotationActive } = this.props;
    let styleObject;
    if (rotationActive) {
      styleObject = {
        transition: `${mouseActive ? '0' : '2000'}ms`,
        transform: `rotateY(${360 - rotation.x}deg) rotateX(${rotation.y}deg)`
      };
    } else {
      styleObject = {
        transition: `${'2000'}ms`,
        transform: `rotateY(${360 - 0}deg) rotateX(${0}deg) translateZ(150px)`
      };
    }
    const frontContent = (
      <span>J</span>
    );
    return (
      <div {...resolve(this.props, 'container', navigationIsOpen ? 'up' : null)}
        onTouchStart = {this.touchStart}
        onMouseMove = {this.reactMouse}
        onMouseLeave = {this.inactMouse}>
        <div {...resolve(this.props, 'cube')} style = {styleObject}>
          <div {...resolve(this.props, 'front', this.state.alt ? 'negaitve' : null)}
            onClick = {this.focusCube}>
              {frontContent}
            </div>
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

export default connect((state) => {
  return {
    navigationIsOpen: state.hacker.navigationIsOpen,
    rotationActive: state.cube.rotationActive
  };
}, { setCubeRotation })(Cube);
