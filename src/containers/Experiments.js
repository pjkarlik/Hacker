import React from 'react';
// import { resolve } from './utils/styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
import Panel from './Panel';

// Less for CSS Modules
import ExperimentsStyles from './Experiments.less';
import PanelStyles from './Panel.less';

class Experiments extends React.Component {
  static displayName = 'Experiments';
  static propTypes = {
    classes: React.PropTypes.object,
    /** Modules Props **/
    navigationIsOpen: React.PropTypes.bool,
    transition: React.PropTypes.string,
    /** Redux Actions **/
    setSiteState: React.PropTypes.func
  };
  static defaultProps = {
    classes: ExperimentsStyles
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
    const { classes } = this.props;
    return (
      <div className = {classes.container}>
        <Panel classes = {PanelStyles} />
      </div>
    );
  }
}
export default connect((state) => {
  return {
    navigationIsOpen: state.site.navigationIsOpen,
    transition: state.site.transition
  };
}, { setSiteState })(Experiments);
