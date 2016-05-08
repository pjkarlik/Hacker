import React from 'react';
import { resolve } from '../utils/styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
// Container Elements
import Cube from './Cube';
import Plasma from '../components/Plasma';
// Less for CSS Modules
import PlasmaCubeStyles from './PlasmaCube.less';
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
    classes: PlasmaCubeStyles
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
      }, 500);
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
        <Plasma className = {CubeStyles.front}/>
        <Plasma className = {CubeStyles.back}/>
        <Plasma className = {CubeStyles.right}/>
        <Plasma className = {CubeStyles.left}/>
        <Plasma className = {CubeStyles.top}/>
        <Plasma className = {CubeStyles.bottom}/>
      </Cube>
    );
    return (
      <div className = {classes.container}>
        <div {...resolve(this.props, 'window', transition)}>
          <h2>PlasmaCube</h2>
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
