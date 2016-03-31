import classNames from 'classnames';

/**
  ## Description
  github.com/bitfrost
  Build a className string and an inline style object to pass to a react component using the provided keys and props.
**/
export function resolve(props, ...keys) {
  const { classes = {}, style = {} } = props;

  const classList = keys.map((k) => {
    if (classes.hasOwnProperty(k)) { return classes[k]; }
  });

  const styleList = keys.map((k) => {
    if (style.hasOwnProperty(k)) { return style[k]; }
  });
  return {
    className: classNames(classList),
    style: Object.assign({}, ...styleList)
  };
}

/**
  ## Description
  github.com/bitfrost
  Select a subset of values from classes and style in the passed in props object. Useful for styling children objects.
**/
export function select(props, ...keys) {
  const { classes = {}, style = {} } = props;
  const newStyles = keys.map((k) => {
    if (style.hasOwnProperty(k)) {
      return style[k];
    }
  });
  const newClasses = keys.map((k) => {
    if (classes.hasOwnProperty(k)) {
      return classes[k];
    }
  });
  return {
    classes: Object.assign({}, ...newClasses),
    style: Object.assign({}, ...newStyles)
  };
}
