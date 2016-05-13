import React from 'react';
import { resolve } from '../utils/styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
// Container Elements
import UfoObjects from '../components/UfoObjects.js';
// Less for CSS Modules
import ExperimentBaseStyles from './ExperimentBase.less';

class AnimationCycle extends React.Component {
  static displayName = 'AnimationCycle';
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
    setTimeout(() => {
      const config = {
        amount: 75,
        size: 25,
        frames: 4
      };
      this.animationObject = new UfoObjects(this.refs.inject, config);
      return this.animationObject;
    }, 900);
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
      <div className = {classes.container}>
        <div {...resolve(this.props, 'window', transition)}>
          <h2>Animation Cycle</h2>
          <p>
            This was an older project, back when doing animated items on screen was a new thing. It uses what is called
            a sprite sheet to produce the animated image. Each frame the position on the background image is shifted
            by the width in a POV (persistance of vision) effect. The result is an animating ship that can be controlled
            programatically.
          </p>
        </div>
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
}, { setSiteState })(AnimationCycle);
