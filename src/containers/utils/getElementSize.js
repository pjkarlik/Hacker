/**
* Returns current width, height of an Element. (element)
*
* @param {DOMElement} element Element you are getting the size of
* @return {object} container Size of Element Width/Height
*/
export function getElementSize(element) {
  const container = [];
  container.width = Math.max(element.clientWidth, element.offsetWidth);
  container.height = Math.max(element.clientHeight, element.offsetHeight);
  return container;
}
