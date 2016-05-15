import PlasmaStyles from './Plasma.less';
import getBrowserDimensions from '../utils/getBrowserDimensions.js';

// Shim layer with setTimeout fallback from Paul Irish
window.requestAnimFrame = (() => {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
  ((callback) => {
    window.setTimeout(callback, 6000 / 60);
  });
})();

export default class Plasma {
  constructor(element, square, grid, offsetRed, offsetBlue, offsetGreen, noise) {
    /** element to attach the plasma display to **/
    this.element = element;
    /** size of parent container applied to canvas **/
    this.square = square;
    /** value to offset red color by **/
    this.offsetRed = offsetRed;
    /** value to offset green color by **/
    this.offsetGreen = offsetGreen;
    /** value to offset blue color by **/
    this.offsetBlue = offsetBlue;
    /** sine wave divider number **/
    this.noise = noise || Math.round(Math.random() * 6) + 6;
    /** Amount of squares to across a row **/
    this.grid = grid;
    /** dynamically set items **/
    this.size = square / grid;
    this.time = Math.round(Math.random() * 3000) + 1;
    /** canvas items **/
    this.plasmaGrid = this.createCanvas('plasma', square, square);
    this.surface = this.plasmaGrid.getContext('2d');
    this.surface.scale(1, 1);
    this.browserSize = getBrowserDimensions(window, document);
    this.renderPlasma = this.renderPlasma.bind(this);
    this.renderPlasma();
  }
  // Create CanvasElement to inject into the page //
  createCanvas(name) {
    const divElement = document.createElement('div');
    divElement.className = PlasmaStyles.container;
    const canvasElement = document.createElement('canvas');
    canvasElement.id = name;
    canvasElement.style.width = '100%';
    canvasElement.style.height = '100%';
    // canvasElement.width = this.square;
    // canvasElement.height = this.square;
    canvasElement.className = PlasmaStyles.plasmaGrid;
    divElement.appendChild(canvasElement);
    this.element.appendChild(divElement);
    return canvasElement;
  }

  dist(a, b, c, d) {
    return Math.sqrt(((a - c) * (a - c) + (b - d) * (b - d)));
  }

  updateColor(offsetRed, offsetGreen, offsetBlue) {
    this.offsetRed = offsetRed;
    this.offsetGreen = offsetGreen;
    this.offsetBlue = offsetBlue;
  }

  renderPlasma() {
    let value;
    let convert;
    for (let x = 0; x < this.grid; x++) {
      for (let y = 0; y < this.grid; y++) {
        value = Math.sin(this.dist(x + this.time, y, 128.0, 128.0) / this.noise)
             + Math.sin(this.dist(x, y, 64.0, 64.0) / this.noise)
             + Math.sin(this.dist(x, y + this.time / 6, 192.0, 64) / (this.noise - 2))
             + Math.sin(this.dist(x, y, 192.0, 100.0) / (this.noise - 2));

        convert = ~~(2 + value) * 32; // ~~ aka math.floor
        this.surface.fillStyle =
          `rgb(${this.offsetRed > 0 ? this.offsetRed - convert : convert},` +
          `${this.offsetGreen > 0 ? this.offsetGreen - convert : convert},` +
          `${convert})`; // blue set for color effect - otherwise random never makes it that pretty
          // `${this.offsetBlue > 0 ? this.offsetBlue - convert : convert})`; this is what it should be...
        this.surface.fillRect(x * this.size, y * this.size, this.size, this.size);
      }
    }
    this.time += 1;
    window.requestAnimFrame(this.renderPlasma);
  }
}
