import React from 'react';
import { resolve } from '../utils/styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
// Container Elements
import ThreeBase from '../components/ThreeBase';
// Less for CSS Modules
import ExperimentBaseStyles from './ExperimentBase.less';

class ThreeDemo extends React.Component {
  static displayName = 'ThreeDemo';
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
    if (this.props.transition === 'out') {
      setTimeout(() => {
        this.props.setSiteState({
          transition: 'in'
        });
      }, 100);
    }
    this.threeJsObject = new ThreeBase(this.refs.inject);
    return (this.threeJsObject);
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
    this.threeJsObject.stopAnimation();
  }
  render() {
    const { classes, transition } = this.props;
    return (
      <div className={classes.container}>
        <h2 {...resolve(this.props, 'title', transition)}>Three.js Demo [in progress]</h2>
        <div {...resolve(this.props, 'experiment', transition)} ref="inject" />
      </div>
    );
  }
}
export default connect((state) => {
  return {
    navigationIsOpen: state.site.navigationIsOpen,
    transition: state.site.transition
  };
}, { setSiteState })(ThreeDemo);
