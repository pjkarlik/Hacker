import React from 'react';
import { resolve } from './utils/styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
import Environment from './Environment';
// Less for CSS Modules
import HackerStyles from './Hacker.less';
import EnvironmentStyles from './Environment.less';

class About extends React.Component {
  static displayName = 'About';
  static propTypes = {
    classes: React.PropTypes.object,
    /** Modules Props **/
    navigationIsOpen: React.PropTypes.bool,
    transition: React.PropTypes.string,
    /** Redux Actions **/
    setSiteState: React.PropTypes.func
  };
  static defaultProps = {
    classes: HackerStyles
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
    return (
      <div {...resolve(this.props, 'container')}>
        <Environment classes = {EnvironmentStyles} />
      </div>
    );
  }
}
export default connect((state) => {
  return {
    navigationIsOpen: state.site.navigationIsOpen,
    transition: state.site.transition
  };
}, { setSiteState })(About);
