import React from 'react';
import { resolve } from '../utils/styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
// Less for CSS Modules
import ExperimentBaseStyles from './ExperimentBase.less';

class Experiment extends React.Component {
  static displayName = 'Experiment';
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
    return (
      <div className={classes.container} style={{ background: '#000' }} >
        <h2 {...resolve(this.props, 'title', transition)}>Plasma Canvas</h2>
        <div {...resolve(this.props, 'experiment', transition)} onClick={this.updateColor} ref="plasmaInject" />
      </div>
    );
  }
}
export default connect((state) => {
  return {
    navigationIsOpen: state.site.navigationIsOpen,
    transition: state.site.transition
  };
}, { setSiteState })(Experiment);
