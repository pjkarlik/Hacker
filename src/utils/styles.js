import classNames from 'classnames';

/**
  ## Description
  github.com/bitfrost
  Build a className string and an inline style object to pass to a react component using the provided keys and props.
**/
export function resolve(props, ...keys) {
  const { classes = {}, style = {} } = props;

  const classList = keys.map((k) => {
    let itemClass;
    if (classes.hasOwnProperty(k)) {
      itemClass = classes[k];
    }
    return itemClass;
  });

  const styleList = keys.map((k) => {
    let itemStyle;
    if (style.hasOwnProperty(k)) {
      itemStyle = classes[k];
    }
    return itemStyle;
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
    let itemStyle;
    if (style.hasOwnProperty(k)) {
      itemStyle = classes[k];
    }
    return itemStyle;
  });
  const newClasses = keys.map((k) => {
    let itemClass;
    if (classes.hasOwnProperty(k)) {
      itemClass = classes[k];
    }
    return itemClass;
  });
  return {
    classes: Object.assign({}, ...newClasses),
    style: Object.assign({}, ...newStyles)
  };
}
