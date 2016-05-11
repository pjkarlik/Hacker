import React from 'react';
import { resolve } from '../utils/styles';
import { connect } from 'react-redux';
import { setSiteState } from '../redux/modules/site';
// Container Elements
import Cube from './Cube';
// Less for CSS Modules
import AboutStyles from './About.less';
import CubeStyles from './Environment.less';

class About extends React.Component {
  static displayName = 'About';
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
    classes: AboutStyles
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
    const { transition, classes } = this.props;
    return (
      <div className = {classes.container}>
        <Cube
          initialX = {-42}
          initialY = {22}
          interactive = {false}
          classes = {CubeStyles}>
          <div className = {CubeStyles.front}/>
          <div className = {CubeStyles.back}/>
          <div className = {CubeStyles.right}/>
          <div className = {CubeStyles.left}/>
          <div className = {CubeStyles.top}/>
          <div className = {CubeStyles.bottom}/>
        </Cube>
        <div {...resolve(this.props, 'information', transition)}>
          <h3>About the Hacker</h3>
          <p>
            This site is my ongoing experiment and testing area for web and JavaScript development. My goal
            is to create a modular site in which to present my interactive experiments, and in doing so show
            my skills as well. This is a generative process, as I have started with no plan other than
            to learn React/Redux and Webpack better. Please feel free to click around and interact with
            everything here. More to come, this is still in a work in progress...
          </p>

          <h4>Technology used in this site.</h4>
          <p>
            <a href="https://facebook.github.io/react/">React</a>,&nbsp;
            <a href="http://redux.js.org/">React-Redux</a>,&nbsp;
            <a href="https://github.com/erikras/ducks-modular-redux">Ducks Modular Redux</a>,&nbsp;
            <a href="https://www.npmjs.com/package/react-router">React Router</a>,&nbsp;
            <a href="https://github.com/css-modules/css-modules">CSS Modules</a>,&nbsp;
            <a href="https://webpack.github.io/">Webpack</a>,&nbsp;
            <a href="https://babeljs.io/">Babel</a>,&nbsp;
            <a href="http://lesscss.org/">LESS</a>, and&nbsp;
            <a href="https://nodejs.org/">Node.js</a>
          </p>

          <h4>About Me | Paul J Karlik</h4>
          <p>
            I am a User Interface Architect and Front-End Developer with over 17 years experience working on
            large-scale dynamic web applications and web sites. I have a strong knowledge and understanding
            of JavaScript web application design, process and development. My experience is from large creative
            digital agencies, tech startups and SAS development. Current skills include HTML5 & CSS3, LESS,
            JavaScript, ES6, React, Redux, Webpack, CSS Modules and Node. I am also a pretty nerdy guy that aslo
            enjoys other languages such as Processing, Arduino and Raspberry Pi hardware platforms.
          </p>
        </div>
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
