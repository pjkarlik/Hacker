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
    /** CSS Modules Object **/
    classes: React.PropTypes.object,
    className: React.PropTypes.string,
    square: React.PropTypes.number,
    offsetRed: React.PropTypes.number,
    offsetBlue: React.PropTypes.number,
    offsetGreen: React.PropTypes.number
  };
  static defaultProps = {
    classes: PlasmaStyles,
    square: 22,
    offsetRed: 0,
    offsetBlue: 0,
    offsetGreen: 0
  };
  constructor(props) {
    super(props);
    this.time = Math.round(Math.random() * 3000) + 1;
    // this.state = {
    //   colorMap: this.renderPlasma()
    // };
    this.renderPlasma = this.renderPlasma.bind(this);
    this.dist = this.dist.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      window.requestAnimFrame(this.renderPlasma);
    }, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  dist(a, b, c, d) {
    return Math.sqrt(((a - c) * (a - c) + (b - d) * (b - d)));
  }

  renderPlasma() {
    const { square, offsetRed, offsetBlue, offsetGreen } = this.props;
    let colorMap;
    let value;
    let color;
    let convert;
    this.time += 1;
    for (let x = 0; x < square; x++) {
      for (let y = 0; y < square; y++) {
        value = Math.sin(this.dist(x + this.time, y, 128.0, 128.0) / 6.0)
             + Math.sin(this.dist(x, y, 64.0, 64.0) / 6.0)
             + Math.sin(this.dist(x, y + this.time / 6, 192.0, 64) / 5.0)
             + Math.sin(this.dist(x, y, 192.0, 100.0) / 5.0);

        color = parseInt((4 + value), 10) * 56;
        convert = Math.floor(color);
        // colorMap[x + (y * square)] =
        colorMap =
          `rgba(${offsetRed > 0 ? offsetRed - convert : convert},` +
          `${offsetBlue > 0 ? offsetBlue - convert : convert},` +
          `${offsetGreen > 0 ? offsetGreen - convert : convert},` +
          `${convert / 255})`;
        this.refs[`tile${x}_${y}`].style.background = colorMap;
          // `${offsetRed - convert}, ${offsetBlue - convert}, ${offsetGreen - convert}, ${convert / 255}`;
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
