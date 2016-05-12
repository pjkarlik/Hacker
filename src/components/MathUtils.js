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
* @param {number} vector/position
* @param {number} size/displacment
* @return {object}
*/
export function modus(vector, size) {
  const mod = vector - (vector % size);
  return (mod < 0) ? 0 : mod;
}
