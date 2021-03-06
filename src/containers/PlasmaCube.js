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
  static propTypes={
    /** CSS Modules Object **/
    classes: React.PropTypes.object,
    /** Modules Props **/
    navigationIsOpen: React.PropTypes.bool,
    transition: React.PropTypes.string,
    /** Redux Actions **/
    setSiteState: React.PropTypes.func
  };
  static defaultProps={
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
    this.randomNumber = this.randomNumber.bind(this);
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
  randomNumber(x) {
    return Math.round(Math.random() * x) + 1;
  }
  updateColor() {
    const offsetRed = this.randomNumber(255) > 100 ? this.randomNumber(255) : 0;
    const offsetGreen = this.randomNumber(255) > 200 ? this.randomNumber(255) : 0;
    const offsetBlue = this.randomNumber(255) > 200 ? this.randomNumber(255) : 0;
    this.setState({
      offsetRed,
      offsetGreen,
      offsetBlue
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
        ref="plasmaCube"
        initialX={-42}
        initialY={22}
        interactive
        classes={CubeStyles}>
        <PlasmaHTML className={CubeStyles.front} {...offsetColors} />
        <PlasmaHTML className={CubeStyles.back} {...offsetColors} />
        <PlasmaHTML className={CubeStyles.right} {...offsetColors} />
        <PlasmaHTML className={CubeStyles.left} {...offsetColors} />
        <PlasmaHTML className={CubeStyles.top} {...offsetColors} />
        <PlasmaHTML className={CubeStyles.bottom} {...offsetColors} />
      </Cube>
    );
    return (
      <div className={classes.container} style={{ background: '#222' }} onClick={this.updateColor}>
        <h2 {...resolve(this.props, 'title', transition)}>Plasma Cube</h2>
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
