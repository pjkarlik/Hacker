import React from 'react';
import { resolve } from '../utils/styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
// Container Elements
// import PlasmaCanvas from '../components/PlasmaCanvas';
import Plasma from '../components/Plasma';
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
    setTimeout(() => {
      const redShift = Math.round(Math.random() * 255) + 1;
      const blueShift = Math.round(Math.random() * 255) + 1;
      const greenShift = Math.round(Math.random() * 255) + 1;
      this.plasmaObject = new Plasma(this.refs.plasmaInject, 400, 75, redShift, greenShift, blueShift, 7);
      return this.plasmaObject;
    }, 200);
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
  updateColor(e) {
    e.preventDefault();
    const redShift = Math.round(Math.random() * 255) + 1;
    const blueShift = Math.round(Math.random() * 255) + 1;
    const greenShift = Math.round(Math.random() * 255) + 1;
    this.plasmaObject.updateColor(redShift, greenShift, blueShift);
  }
  render() {
    const { classes, transition } = this.props;
    return (
      <div className = {classes.container}>
        <div {...resolve(this.props, 'window', transition)}>
          <h2>Plasma Canvas</h2>
          <p>
            This experiment is a pure ES6 class that creates a plasma effect using multipule sine wave functions and an
            HTML5 Canvas element. As time increases a value is fed into the function which cycles though each position
            on the Canvas surface.
          </p>
        </div>
        <div {...resolve(this.props, 'experiment', transition)} onClick = {this.updateColor} ref="plasmaInject" />
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
