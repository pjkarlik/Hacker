import PlasmaStyles from './Plasma.less';

// Shim layer with setTimeout fallback from Paul Irish
window.requestAnimFrame = (() => {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
  ((callback) => {
    window.setTimeout(callback, 6000 / 60);
  });
})();

export default class Plasma {
  constructor(element, square, grid, offsetRed, offsetBlue, offsetGreen) {
    this.element = element;
    this.square = square;
    this.offsetRed = offsetRed;
    this.offsetBlue = offsetBlue;
    this.offsetGreen = offsetGreen;
    this.grid = grid;
    this.size = square / grid;
    this.time = Math.round(Math.random() * 3000) + 1;
    this.plasmaGrid = this.createCanvas('plasma', square, square);
    this.surface = this.plasmaGrid.getContext('2d');
    this.surface.scale(1, 1);
    this.renderPlasma = this.renderPlasma.bind(this);
    this.renderPlasma();
  }
  // Create CanvasElement to inject into the page //
  createCanvas(name, width, height) {
    const divElement = document.createElement('div');
    divElement.className = PlasmaStyles.container;
    const canvasElement = document.createElement('canvas');
    canvasElement.id = name;
    canvasElement.width = width;
    canvasElement.height = height;
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
        value = Math.sin(this.dist(x + this.time, y, 128.0, 128.0) / 7.0)
             + Math.sin(this.dist(x, y, 64.0, 64.0) / 6.0)
             + Math.sin(this.dist(x, y + this.time / 6, 192.0, 64) / 5.0)
             + Math.sin(this.dist(x, y, 192.0, 100.0) / 5.0);

        convert = Math.floor(parseInt((4 + value), 10) * 32);
        this.surface.fillStyle =
          `rgb(${this.offsetRed > 0 ? this.offsetRed - convert : convert},` +
          `${this.offsetBlue > 0 ? this.offsetBlue - convert : convert},` +
          `${this.offsetGreen > 0 ? this.offsetGreen - convert : convert})`;
        this.surface.fillRect(x * this.size, y * this.size, this.size, this.size);
      }
    }
    this.time += 1;
    window.requestAnimFrame(this.renderPlasma);
  }
}
