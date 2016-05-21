import UfoStyles from './UfoObject.less';

export class UfoShip {
  constructor(element, id, size, frames) {
    /** element to attach the plasma display to **/
    this.element = element;
    /** ID for the Animated Object **/
    this.id = id;
    /** Size of 1 frame {width} **/
    this.size = size;
    /** Current Frame **/
    this.frame = 0;
    /** Total frame size for looping (frame - 1) to account for 0 index **/
    this.frames = size * (frames - 1);
    /** Is this animating **/
    this.animated = true;
    /** Current Position of the object **/
    this.currentPosition = {
      _x: window.innerWidth / 2,
      _y: -100
    };
    /** New Position of the object **/
    this.newPosition = {
      _x: Math.round(Math.random() * 800) + 1,
      _y: Math.round(Math.random() * 800) + 1
    };
    /** Create the object **/
    this.ufo = document.createElement('div');
    this.ufo.id = this.id;
    this.ufo.className = UfoStyles.ufo;
    this.element.appendChild(this.ufo);
    this.animateShip = this.animateShip.bind(this);
    this.animateShip();
  }
  randomValue(value) {
    return Math.round(Math.random() * value) + 1;
  }
  animateShip() {
    this.ufo.style.backgroundPosition = `${this.frame}px 0px`;
    this.frame -= this.size;
    if (this.frame < -this.frames) {
      this.frame = 0;
    }

    if (this.randomValue(250) > 249) {
      this.newPosition._x = this.randomValue(window.innerWidth);
    }
    if (this.randomValue(250) > 249) {
      this.newPosition._y = this.randomValue(window.innerHeight);
    }
    this.currentPosition._x = this.currentPosition._x - (this.currentPosition._x - this.newPosition._x) * 0.006;
    this.ufo.style.left = `${Math.round(this.currentPosition._x)}px`;

    this.currentPosition._y = this.currentPosition._y - (this.currentPosition._y - this.newPosition._y) * 0.006;
    this.ufo.style.top = `${Math.round(this.currentPosition._y)}px`;

    if (this.animated) {
      window.requestAnimationFrame(this.animateShip);
    }
  }
}

export default class UfoObjects {
    constructor(element, config) {
      /** element to attach the plasma display to **/
      this.element = element;
      /** ufo config ojbect **/
      this.config = config;
      /** ufo cache **/
      this.cache = [];
      this.createShips = this.createShips.bind(this);
      this.createShips();
    }

    createShips() {
      for (let x = 0; x < this.config.amount; x++) {
        this.cache[x] = new UfoShip(this.element, `ufo${x}`, this.config.size, this.config.frames);
      }
    }
    stopAnimation() {
      window.cancelAnimationFrame(this.animateShip);
    }
}
