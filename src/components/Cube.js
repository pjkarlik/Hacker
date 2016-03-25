import React from 'react';
import { resolve } from './utils/styles';
import getBrowserDimensions from './utils/getBrowserDimensions';

/**
*/
export default class Hacker extends React.Component {
  static displayName = 'Hacker';
  static propTypes = {
    rotation: React.PropTypes.array,
    alt: React.PropTypes.bool,
    classes: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      rotation: [0, 0],
      alt: this.props.alt
    };
    this.reactMouse = this.reactMouse.bind(this);
  }

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.alt !== this.props.alt) {
      this.setState({
        alt: !this.props.alt
      });
    }
  }
  reactMouse(e) {
    const rotation = [];
    const halfPoint = getBrowserDimensions(window, document);
    const mouseX = 90 - Math.floor((90 / (halfPoint.browserWidth / 2)) * e.clientX);
    const mouseY = 90 - Math.floor((90 / (halfPoint.browserHeight / 2)) * e.clientY);

    rotation.x = mouseX;
    rotation.y = mouseY;
    this.setState({
      rotation
    });
  }
  render() {
    const { rotation } = this.state;
    const styleObject = {
      transform: `rotateY(${rotation.x}deg) rotateX(${rotation.y}deg)`
    };
    return (
      <div {...resolve(this.props, 'container')}
        onMouseMove = {this.reactMouse}>
        <div {...resolve(this.props, 'cube')} style = {styleObject}>
          <div {...resolve(this.props, 'front', this.state.alt ? 'negaitve' : null)}>J</div>
          <div {...resolve(this.props, 'back', this.state.alt ? 'negaitve' : null)}>&nbsp;</div>
          <div {...resolve(this.props, 'right', this.state.alt ? 'negaitve' : null)}>K</div>
          <div {...resolve(this.props, 'left', this.state.alt ? 'negaitve' : null)}>P</div>
          <div {...resolve(this.props, 'top', this.state.alt ? 'negaitve' : null)}>&nbsp;</div>
          <div {...resolve(this.props, 'bottom', this.state.alt ? 'negaitve' : null)}>&nbsp;</div>
        </div>
      </div>
    );
  }
}
