import React from 'react';
import ReactDom from 'react-dom';
// Less for CSS Modules
import PlasmaStyles from './PlasmaCanvas.less';

export default class PlasmaCanvas extends React.Component {
  static displayName = 'PlasmaCanvas';
  static propTypes = {
    /** CSS Modules Object **/
    classes: React.PropTypes.object,
    className: React.PropTypes.string,
    square: React.PropTypes.number,
    grid: React.PropTypes.number,
    offsetRed: React.PropTypes.number,
    offsetBlue: React.PropTypes.number,
    offsetGreen: React.PropTypes.number
  };

  static defaultProps = {
    classes: PlasmaStyles,
    square: 400,
    grid: 64,
    offsetRed: 0,
    offsetBlue: 255,
    offsetGreen: 255
  };

  constructor(props) {
    super(props);
    this.renderPlasma = this.renderPlasma.bind(this);
    this.dist = this.dist.bind(this);
  }

  componentDidMount() {
    this.time = Math.round(Math.random() * 3000) + 1;
    this.size = this.props.square / this.props.grid;
    this.surface = ReactDom.findDOMNode(this.refs.canvas).getContext('2d');
    this.surface.scale(1, 1);
    this.renderPlasma();
    setTimeout(() => {
      this.timer = setInterval(() => {
        this.renderPlasma();
      }, 30);
    }, 1400);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  dist(a, b, c, d) {
    return Math.sqrt(((a - c) * (a - c) + (b - d) * (b - d)));
  }

  renderPlasma() {
    const { square, offsetRed, offsetBlue, offsetGreen } = this.props;
    let value;
    let convert;
    this.time += 1;
    for (let x = 0; x < square; x++) {
      for (let y = 0; y < square; y++) {
        value = Math.sin(this.dist(x + this.time, y, 128.0, 128.0) / 6.0)
             + Math.sin(this.dist(x, y, 64.0, 64.0) / 6.0)
             + Math.sin(this.dist(x, y + this.time / 6, 192.0, 64) / 5.0)
             + Math.sin(this.dist(x, y, 192.0, 100.0) / 5.0);

        convert = Math.floor(parseInt((4 + value), 10) * 32);
        this.surface.fillStyle =
          `rgb(${offsetRed > 0 ? offsetRed - convert : convert},` +
          `${offsetBlue > 0 ? offsetBlue - convert : convert},` +
          `${offsetGreen > 0 ? offsetGreen - convert : convert})`;
        this.surface.fillRect(x * this.size, y * this.size, this.size, this.size);
      }
    }
  }

  render() {
    const { classes, className, square } = this.props;
    return (
      <div className = {`${classes.container} ${className || null}`}>
        <canvas
          className = {classes.plasmaGrid}
          ref = "canvas"
          width = {square}
          height = {square}
        />
      </div>
    );
  }
}
