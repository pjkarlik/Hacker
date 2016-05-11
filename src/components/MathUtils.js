/**
* Calculate distance based on element and mouse position
*
* @param {number} x/y of element 1 & 2
* @return {object}
*/
export function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x1 - y1), 2) + Math.pow((x2 - y2), 2));
}

/**
* Calculate Mod
*
* @param {number} x/y of element 1 & 2
* @return {object}
*/
export function modus(v, s) {
  const m = v - (v % s);
  return (m < 0) ? 0 : m;
}

/**
* Original left/top
*
* @param {element} x/y of element 1 & 2
* @return {object}
*/
export function originalPosition(element) {
  return {
    left: parseInt(element.getAttribute('data-left'), 10),
    top: parseInt(element.getAttribute('data-top'), 10)
  };
}
