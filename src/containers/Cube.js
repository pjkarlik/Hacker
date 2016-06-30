import React from 'react';
import { resolve } from '../utils/styles';
import { connect } from 'react-redux';
import getBrowserDimensions from '../utils/getBrowserDimensions';

/**
*/
class Cube extends React.Component {
  static displayName = 'Cube';
  static propTypes = {
    /** Object to render inside Cube **/
    children: React.PropTypes.node,
    /** CSS Modules Object **/
    classes: React.PropTypes.object,
    /** Initial X Rotation of Cube **/
    rotation: React.PropTypes.array,
    /** Initial X Rotation of Cube **/
    initialX: React.PropTypes.number,
    /** Initial Y Rotation of Cube **/
    initialY: React.PropTypes.number,
    /** Initial Z Rotation of Cube **/
    initialZ: React.PropTypes.number,
    /** Does this respond to mouse of touch **/
    interactive: React.PropTypes.bool,
    /** Modules Props **/
    transition: React.PropTypes.string
  };
  static defaultProps = {
    direction: null
  };
  constructor(props) {
    super(props);
    this.state = {
      rotation: {
        x: this.props.initialX || 0,
        y: this.props.initialY || 0,
        z: this.props.initialZ || 0
      },
      mouse: {
        x: 0,
        y: 0,
        z: 0
      },
      mouseActive: false,
      transition: this.props.transition
    };
    // See which axis is moved on start //
    this.rotationZ = 0;
    // Function Bindings //
    // Drag - Mouse //
    this.dragFunction = this.dragFunction.bind(this);
    this.endDragFunction = this.endDragFunction.bind(this);
    this.dragStart = this.dragStart.bind(this);
    // Drag - Touch //
    this.touchStart = this.touchStart.bind(this);
    this.touchDrag = this.touchDrag.bind(this);
    // Utils //
    this.checkRotation = this.checkRotation.bind(this);
    this.checkAxis = this.checkAxis.bind(this);
    // Automated Motion //
    this.inactMouse = this.inactMouse.bind(this);
    this.waitFor = this.waitFor.bind(this);
    this.generateMouseMove = this.generateMouseMove.bind(this);
    // Main Render Loop //
    this.animateRotation = this.animateRotation.bind(this);
  }
  /* Component Life Cycle */
  componentDidMount() {
    if (this.props.interactive) {
      window.addEventListener('touchmove', this.touchDrag);
      window.addEventListener('touchend', this.dragStop);
    }
    this.waitFor();
    this.timer = setInterval(() => {
      window.requestAnimationFrame(this.animateRotation);
    }, 30);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.transition !== this.props.transition) {
      this.setState({
        transition: nextProps.transition
      });
    }
  }
  componentWillUnmount() {
    window.cancelAnimationFrame(this.animateRotation);
    clearInterval(this.timer);
    clearInterval(this.interval);
  }
  // Drag Functions //
  dragFunction(e) {
    let mouseZ;
    let mouseY;
    const browserSize = getBrowserDimensions(window, document);
    const mouseX = ((browserSize.browserWidth / 2) - e.clientX) * 0.01;
    const mouseYZ = ((browserSize.browserHeight / 2) - e.clientY) * 0.01;
    if (this.rotationZ !== 0) {
      mouseZ = this.rotationZ === 1 ? mouseYZ : -mouseYZ;
      mouseY = 0;
    } else {
      mouseZ = 0;
      mouseY = -mouseYZ;
    }
    this.setState({
      mouse: {
        x: mouseX,
        y: mouseY,
        z: mouseZ
      }
    });
  }
  endDragFunction() {
    // Remove the drag functions.
    if (document && document.removeEventListener) {
      document.removeEventListener('mousemove', this.dragFunction, false);
      document.removeEventListener('mouseup', this.endDragFunction, false);
    }
    this.inactMouse();
  }
  dragStart(e) {
    this.checkAxis();
    if (!this.props.interactive) {
      return;
    }
    clearInterval(this.interval);
    // Attach the drag and end drag events.
    if (document && document.addEventListener) {
      document.addEventListener('mousemove', this.dragFunction, false);
      document.addEventListener('mouseup', this.endDragFunction, false);
    }
    e.preventDefault();
    this.setState({
      mouseActive: true
    });
  }
  // Touch Functions //
  touchStart(e) {
    e.preventDefault();
    this.checkAxis();
    clearInterval(this.interval);
    this.touchDrag(e.touches[0]);
    this.setState({
      mouseActive: true
    });
  }
  touchDrag(e) {
    let mouseZ;
    let mouseY;
    const browserSize = getBrowserDimensions(window, document);
    const mouseX = ((browserSize.browserWidth / 2) - e.changedTouches[0].clientX) * 0.03;
    const mouseYZ = ((browserSize.browserHeight / 2) - e.changedTouches[0].clientY) * 0.03;
    if (this.rotationZ !== 0) {
      mouseZ = this.rotationZ === 1 ? mouseYZ : -mouseYZ;
      mouseY = 0;
    } else {
      mouseZ = 0;
      mouseY = -mouseYZ;
    }
    this.setState({
      mouse: {
        x: mouseX,
        y: mouseY,
        z: mouseZ
      }
    });
  }
  checkAxis() {
    const { rotation } = this.state;
    if (this.checkRotation(rotation.x) > 70 && this.checkRotation(rotation.x) < 110) {
      this.rotationZ = 1;
    } else if (this.checkRotation(rotation.x) > 250 && this.checkRotation(rotation.x) < 300) {
      this.rotationZ = -1;
    } else {
      this.rotationZ = 0;
    }
  }
  checkRotation(value) {
    let orientation = value % 360;

    if (orientation < 0) {
      orientation += 360;
    }
    return orientation;
  }
  /* Cube Rotation */
  animateRotation() {
    const { rotation, mouse } = this.state;

    if (!this.state.mouseActive) {
      mouse.x = mouse.x - (mouse.x - 0) * 0.03;
      mouse.y = mouse.y - (mouse.y - 0) * 0.03;
      mouse.z = mouse.z - (mouse.z - 0) * 0.03;
    }

    rotation.x += mouse.x;
    rotation.z -= mouse.z;
    rotation.y -= mouse.y;

    this.setState({
      rotation: {
        x: this.checkRotation(rotation.x),
        y: this.checkRotation(rotation.y),
        z: this.checkRotation(rotation.z)
      }
    });
  }
  generateMouseMove() {
    const genX = 4 - Math.floor((Math.random() * 8) + 1);
    const genY = 4 - Math.floor((Math.random() * 8) + 1);
    const genZ = 4 - Math.floor((Math.random() * 8) + 1);
    this.setState({
      mouse: {
        x: genX,
        y: genY,
        z: genZ
      }
    });
  }

  inactMouse() {
    this.waitFor();
    this.setState({
      mouseActive: false
    });
  }
  waitFor() {
    clearInterval(this.interval);
    const randomDelay = Math.floor((Math.random() * 8000) + 2000);
    this.interval = setInterval(this.generateMouseMove, randomDelay);
  }
  /* Render Cube */
  render() {
    const { classes, children } = this.props;
    const { rotation, transition } = this.state;
    const styleObject = {
      transform: `rotateY(${360 - rotation.x}deg) rotateX(${rotation.y}deg) rotateZ(${rotation.z}deg)`
    };

    return (
      <div
        {...resolve(this.props, 'container', transition)}
        onTouchStart={this.touchStart}
        onMouseDown={this.dragStart}
        onMouseUp={this.dragStop}>
        <div className={classes.cube} style={styleObject} ref="cube">
          {children}
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    transition: state.site.transition
  };
}, {})(Cube);
