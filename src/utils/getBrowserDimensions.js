/**
* Gets the current browser dimensions (width, height, scroll positions)
*
* @param {Window} window The browser window.
* @param {document} document The browser document.
* @return {Object} The dimensions of the browser.
*/
export default function getBrowserDimensions(window, document) {
  const browserMeasures = {
    browserWidth: 0,
    browserHeight: 0,
    amountScrolledX: 0,
    amountScrolledY: 0
  };

  if (typeof (window.innerWidth) === 'number') {
    browserMeasures.browserWidth = window.innerWidth;
    browserMeasures.browserHeight = window.innerHeight;
  } else if (document.documentElement && document.documentElement.hasOwnProperty('clientWidth')) {
    browserMeasures.browserWidth = document.documentElement.clientWidth;
    browserMeasures.browserHeight = document.documentElement.clientHeight;
  }

  if (typeof (window.pageYOffset) === 'number') {
    browserMeasures.amountScrolledY = window.pageYOffset;
    browserMeasures.amountScrolledX = window.pageXOffset;
  } else if (document.body && document.body.hasOwnProperty('scrollLeft')) {
    browserMeasures.amountScrolledY = document.body.scrollTop;
    browserMeasures.amountScrolledX = document.body.scrollLeft;
  } else if (document.documentElement && document.documentElement.hasOwnProperty('scrollLeft')) {
    browserMeasures.amountScrolledY = document.documentElement.scrollTop;
    browserMeasures.amountScrolledX = document.documentElement.scrollLeft;
  }

  return browserMeasures;
}
