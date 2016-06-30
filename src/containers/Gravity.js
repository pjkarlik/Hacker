import React from 'react';
import { resolve } from '../utils/styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
// Container Elements
import Gravity from '../components/Gravity';
// Less for CSS Modules
import ExperimentBaseStyles from './ExperimentBase.less';

class GravityDisplay extends React.Component {
  static displayName = 'GravityDisplay';
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
  componentDidMount() {
    this.gravityObject = new Gravity(this.refs.gravityInject);
    if (this.props.transition === 'out') {
      setTimeout(() => {
        this.props.setSiteState({
          transition: 'in'
        });
      }, 100);
    }

    return this.gravityObject;
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
    this.gravityObject.stopAnimation();
  }
  render() {
    const { classes, transition } = this.props;
    return (
      <div className={classes.container} style={{ background: '#000' }} >
        <h2 {...resolve(this.props, 'title', transition)}>Gravity</h2>
        <div {...resolve(this.props, 'experiment', transition)} ref="gravityInject" />
      </div>
    );
  }
}
export default connect((state) => {
  return {
    navigationIsOpen: state.site.navigationIsOpen,
    transition: state.site.transition
  };
}, { setSiteState })(GravityDisplay);
