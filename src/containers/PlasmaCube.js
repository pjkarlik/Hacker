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
  render() {
    const { classes, transition } = this.props;
    const cube = (
      <Cube
        initialX = {-42}
        initialY = {22}
        interactive = {false}
        classes = {CubeStyles}>
        <PlasmaHTML className = {CubeStyles.front} />
        <PlasmaHTML className = {CubeStyles.back} />
        <PlasmaHTML className = {CubeStyles.right} />
        <PlasmaHTML className = {CubeStyles.left} />
        <PlasmaHTML className = {CubeStyles.top} />
        <PlasmaHTML className = {CubeStyles.bottom} />
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
