import React from 'react';
import { resolve } from '../utils/styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
// Container Elements
import simplexNoise from '../components/simplexNoise';
// Less for CSS Modules
import ExperimentBaseStyles from './ExperimentBase.less';

class PlasmaDisplay extends React.Component {
  static displayName = 'PlasmaDisplay';
  static propTypes = {
    /** CSS Modules Object **/
    classes: React.PropTypes.object,
    /** Modules Props **/
    navigationIsOpen: React.PropTypes.bool,
    transition: React.PropTypes.string,
    /** Redux Actions **/
    setSiteState: React.PropTypes.func
  };
  static defaultProps = {
    classes: ExperimentBaseStyles
  };
  constructor(props) {
    super(props);
    this.createCanvas = this.createCanvas.bind(this);
    this.shader = this.shader.bind(this);
    this.renderLoop = this.renderLoop.bind(this);
  }
  componentDidMount() {
    if (this.props.transition === 'out') {
      setTimeout(() => {
        this.props.setSiteState({
          transition: 'in'
        });
      }, 100);
    }
    this.width = 600;
    this.height = 400;
    this.time = 0;
    // Set Up canvas and surface object //
    this.perlinCanvas = this.createCanvas('perlin');
    this.surface = this.perlinCanvas.getContext('2d');
    this.surface.scale(1, 1);
    this.renderLoop();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.transition !== this.props.transition) {
      this.props.setSiteState({
        transition: this.props.transition === 'in' ? 'out' : 'in'
      });
    }
    if (nextProps.navigationIsOpen !== this.props.navigationIsOpen) {
      this.props.setSiteState({
        transition: this.props.transition === 'in' ? 'out' : 'in'
      });
    }
  }
  componentWillUnmount() {
    window.cancelAnimationFrame(this.renderLoop);
  }
  createCanvas(name) {
    const canvasElement = document.createElement('canvas');
    canvasElement.id = name;
    canvasElement.width = this.width;
    canvasElement.height = this.height;
    canvasElement.style.width = '100%';
    canvasElement.style.height = '100%';
    this.simplexInject.appendChild(canvasElement);
    return canvasElement;
  }
  /* eslint no-param-reassign: 0 */
  shader(x, y, w, h) {
    this.time += 0.003;
    x /= w;
    y /= h;
    const size = 3.5;
    const n = simplexNoise(size * x, size * y, this.time / 1000);
    const g = Math.round(Math.cos(n * 45) * 255);
    const b = g;
    const r = Math.round(Math.sin(n * 45) * 255);
    return {
      r, g, b, a: 255
    };
  }
  renderLoop() {
    const size = 5;
    const w = this.perlinCanvas.width / size;
    const h = this.perlinCanvas.height / size;

    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const pixel = this.shader(x, y, w, h);
        this.surface.fillStyle = `rgba(${pixel.r},${pixel.g},${pixel.b},${pixel.a})`;
        this.surface.fillRect(x * size, y * size, size, size);
      }
    }
    window.requestAnimationFrame(this.renderLoop);
  }
  render() {
    const { classes, transition } = this.props;
    return (
      <div className={classes.container} style={{ background: '#000' }} >
        <h2 {...resolve(this.props, 'title', transition)}>Simplex Noise</h2>
        <div
          {...resolve(this.props, 'experiment', transition)}
          ref={(c) => { this.simplexInject = c; }} />
      </div>
    );
  }
}
export default connect((state) => {
  return {
    navigationIsOpen: state.site.navigationIsOpen,
    transition: state.site.transition
  };
}, { setSiteState })(PlasmaDisplay);
