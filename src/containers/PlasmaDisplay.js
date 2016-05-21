import React from 'react';
import { resolve } from '../utils/styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
// Container Elements
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
    const redShift = Math.round(Math.random() * 255) + 1;
    const blueShift = Math.round(Math.random() * 255) + 1;
    const greenShift = Math.round(Math.random() * 255) + 1;
    const noise = Math.round(Math.random() * 7) + 6;
    this.plasmaObject = new Plasma(this.refs.plasmaInject, 400, 150, redShift, greenShift, blueShift, noise);

    if (this.props.transition === 'out') {
      setTimeout(() => {
        this.props.setSiteState({
          transition: 'in'
        });
      }, 100);
    }

    return this.plasmaObject;
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
    this.plasmaObject.stopAnimation();
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
      <div className = {classes.container} style = {{ background: '#000' }} >
          <h2 {...resolve(this.props, 'title', transition)}>Plasma Canvas</h2>
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
