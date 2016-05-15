import React from 'react';
// Less for CSS Modules
import PlasmaStyles from './PlasmaHTML.less';

// Shim layer with setTimeout fallback from Paul Irish
window.requestAnimFrame = (() => {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
  ((callback) => {
    window.setTimeout(callback, 6000 / 60);
  });
})();

export default class PlasmaHTML extends React.Component {
  static displayName = 'PlasmaHTML';
  static propTypes = {
    /** css modules style object **/
    classes: React.PropTypes.object,
    /** css classname applied to container **/
    className: React.PropTypes.string,
    /** Amount of squares to across a row **/
    square: React.PropTypes.number,
    /** sine wave divider number **/
    noise: React.PropTypes.number,
    /** value to offset red color by **/
    offsetRed: React.PropTypes.number,
    /** value to offset green color by **/
    offsetGreen: React.PropTypes.number,
    /** value to offset blue color by **/
    offsetBlue: React.PropTypes.number
  };
  static defaultProps = {
    classes: PlasmaStyles,
    square: 20,
    noise: 6,
    offsetRed: 0,
    offsetBlue: 0,
    offsetGreen: 0
  };
  constructor(props) {
    super(props);
    this.time = Math.round(Math.random() * 3000) + 1;
    this.renderPlasma = this.renderPlasma.bind(this);
    this.dist = this.dist.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      window.requestAnimFrame(this.renderPlasma);
    }, 30);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  dist(a, b, c, d) {
    return Math.sqrt(((a - c) * (a - c) + (b - d) * (b - d)));
  }

  renderPlasma() {
    const { square, noise, offsetRed, offsetGreen } = this.props; // offsetBlue, removed for effect.
    // const half = square / 2;
    let colorMap;
    let value;
    let convert;
    this.time += 1;
    for (let x = 0; x < square; x++) {
      for (let y = 0; y < square; y++) {
        // value = Math.sin((this.dist(x, y, half, half) / 2) - this.time) * 5;
        value = Math.sin(this.dist(x + this.time, y, 128.0, 128.0) / noise)
             + Math.sin(this.dist(x, y, 64.0, 64.0) / noise)
             + Math.sin(this.dist(x, y + this.time / 6, 192.0, 64) / 7.0)
             + Math.sin(this.dist(x, y, 192.0, 100.0) / noise);

        convert = ~~(2 + value) * 52; // ~~ aka math.floor

        colorMap =
          `rgba(${offsetRed > 0 ? offsetRed - convert : convert},` +
          `${offsetGreen > 0 ? offsetGreen - convert : convert},` +
          `${convert},` + // blue set for color effect - otherwise random never makes it that pretty
          // `${offsetBlue > 0 ? offsetBlue - convert : convert},` + this is what it should be...
          `${convert / 255})`;
          // Check for small case that component unmounted before function stopped.
        const objectCheck = this.refs[`tile${x}_${y}`];
        if (objectCheck) {
          objectCheck.style.background = colorMap;
        }
      }
    }
  }

  render() {
    const { classes, className, square } = this.props;
    const size = 100 / square;
    const tiles = [];
    for (let x = 0; x < square; x++) {
      for (let y = 0; y < square; y++) {
        const styleObject = {
          top: `${x * size}%`,
          left: `${y * size}%`,
          width: `${size}%`,
          height: `${size}%`
        };
        tiles.push(
          <div key = {`tile${x}_${y}`}
            ref = {`tile${x}_${y}`}
            className = {classes.tile}
            style = {styleObject} />
        );
      }
    }
    return (
      <div className = {`${classes.container} ${className || null}`}>
        {tiles}
      </div>
    );
  }
}
