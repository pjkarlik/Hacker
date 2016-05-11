import React from 'react';
import { resolve } from '../utils/styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
// Container Elements
import Cube from './Cube';
import PlasmaHTML from '../components/PlasmaHTML';
// Less for CSS Modules
import ExperimentBaseStyles from './ExperimentBase.less';
import CubeStyles from '../components/PlasmaCube.less';

class PlasmaCube extends React.Component {
  static displayName = 'PlasmaCube';
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
    this.state = {
      offsetRed: 0,
      offsetGreen: 0,
      offsetBlue: 0
    };
    this.updateColor = this.updateColor.bind(this);
  }
  componentDidMount() {
    if (this.props.transition === 'out') {
      setTimeout(() => {
        this.props.setSiteState({
          transition: 'in'
        });
      }, 100);
    }
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
  updateColor() {
    this.setState({
      offsetRed: Math.round(Math.random() * 255) + 1,
      offsetGreen: Math.round(Math.random() * 255) + 1,
      offsetBlue: Math.round(Math.random() * 255) + 1
    });
  }
  render() {
    const { classes, transition } = this.props;
    const offsetColors = {
      offsetRed: this.state.offsetRed,
      offsetGreen: this.state.offsetGreen,
      offsetBlue: this.state.offsetBlue
    };
    const cube = (
      <Cube
        ref = "plasmaCube"
        initialX = {-42}
        initialY = {22}
        interactive
        classes = {CubeStyles}>
        <PlasmaHTML className = {CubeStyles.front} {...offsetColors}/>
        <PlasmaHTML className = {CubeStyles.back} {...offsetColors}/>
        <PlasmaHTML className = {CubeStyles.right} {...offsetColors}/>
        <PlasmaHTML className = {CubeStyles.left} {...offsetColors}/>
        <PlasmaHTML className = {CubeStyles.top} {...offsetColors}/>
        <PlasmaHTML className = {CubeStyles.bottom} {...offsetColors}/>
      </Cube>
    );
    return (
      <div className = {classes.container}>
        <div {...resolve(this.props, 'window', transition)}>
          <h2>Plasma Cube</h2>
          <p>
            This experiment creats a plasma effect using multipule sine wave functions. An array of DIV elements
            are dynamically created inside of the parent container and the background of each DIV in a set
            interval on render.
          </p>
          <p>
            The cube is a CSS3 transformation, and each side of the cube has a plasma component inside of it. Each
            side can be controlled in the amount of squares that make up the grid and a value for each color
            component.
          </p>
          <a href="#" className = {classes.link} onClick = {this.updateColor}>random color</a>
        </div>
        {cube}
      </div>
    );
  }
}
export default connect((state) => {
  return {
    navigationIsOpen: state.site.navigationIsOpen,
    transition: state.site.transition
  };
}, { setSiteState })(PlasmaCube);
