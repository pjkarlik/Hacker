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
    alt: React.PropTypes.bool,
    classes: React.PropTypes.object,
    direction: React.PropTypes.string,
    rotation: React.PropTypes.array,
    /** Modules Props **/
    cubeState: React.PropTypes.func,
    navigationIsOpen: React.PropTypes.bool,
    /** Redux Actions **/
    setCubeRotation: React.PropTypes.func
  };
  static defaultProps = {
    direction: null
  };
  constructor(props) {
    super(props);
    this.state = {
      rotation: {
        x: -42,
        y: 0
      },
      mouseActive: false,
      direction: this.props.direction,
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
  /* Component Life Cycle */
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
  /* Cube Rotation */
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
  generateMouseMove() {
    const browserSize = getBrowserDimensions(window, document);
    const genX = Math.floor((Math.random() * browserSize.browserWidth) + 1);
    const genY = Math.floor((Math.random() * browserSize.browserHeight) + 1);
    this.computeRotation(genX, genY);
  }
  /* Mouse and Touch Events */
  reactMouse(e) {
    clearInterval(this.interval);
    this.computeRotation(e.clientX, e.clientY);
    this.setState({
      mouseActive: true
    });
  }
  inactMouse() {
    this.waitFor();
    this.setState({
      mouseActive: false
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
  waitFor() {
    clearInterval(this.interval);
    const randomDelay = Math.floor((Math.random() * 8000) + 2000);
    this.interval = setInterval(this.generateMouseMove, randomDelay);
  }
  /* Render Cube */
  render() {
    const { rotation, mouseActive } = this.state;
    const { navigationIsOpen } = this.props;
    const styleObject = {
      transition: `${mouseActive ? '20' : '2000'}ms`,
      transform: `rotateY(${360 - rotation.x}deg) rotateX(${rotation.y}deg)`
    };

    return (
      <div {...resolve(this.props, 'container', navigationIsOpen ? 'up' : null)}
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

export default connect((state) => {
  return {
    navigationIsOpen: state.hacker.navigationIsOpen
  };
}, { setCubeRotation })(Cube);
