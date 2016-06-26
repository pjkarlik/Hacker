import Star from '../../resources/images/star.png';
import getBrowserDimensions from '../utils/getBrowserDimensions.js';

export class Particle {
  constructor(settings) {
    this.x = settings.startingX;
    this.y = settings.startingY;

    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;

    this.life = settings.life;
    this.maxLife = settings.maxLife;
    this.particleSize = settings.particleSize;
    this.gravity = settings.gravity;
    this.bounce = settings.bounce;
    this.floor = settings.floor;
    this.width = settings.width;
    this.update = this.update.bind(this);
    this.update();
  }
    // Create CanvasElement to inject into the page //
  update() {
    if ((this.y + this.particleSize) > this.floor) {
      this.vy *= -this.bounce;
      this.vx *= this.bounce;
      this.y = this.floor - this.particleSize;
    }
    if ((this.x + this.particleSize) > this.width) {
      this.vy *= this.bounce;
      this.vx *= -this.bounce;
      this.x = this.width - this.particleSize;
    }
    if ((this.x) < 0) {
      this.vy *= this.bounce;
      this.vx *= -this.bounce;
      this.x = this.particleSize;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.particleSize -= (this.life * 0.002);
    this.life++;

    return {
      x: Math.round(this.x),
      y: Math.round(this.y),
      size: Math.round(this.particleSize),
      life: this.life,
      maxLife: this.maxLife
    };
  }
}

export default class Gravity {
  constructor(element) {
    // Screen Set Up //
    this.element = element;
    this.browserSize = getBrowserDimensions(window, document);
    this.width = this.browserSize.browserWidth;
    this.height = this.browserSize.browserHeight;
    this.star = new Image();
    this.star.src = Star;
    // Glitter Particle Stuff //
    this.particles = [];
    this.settings = {
      density: 45,
      particleSize: 25,
      startingX: this.width / 2,
      startingY: 30,
      life: 0,
      maxLife: 250,
      bounce: 0.65,
      gravity: 0.5,
      floor: this.height - 20,
      width: this.width
    };
    // Bind Stuff //
    this.renderLoop = this.renderLoop.bind(this);
    // Set Up canvas and surface object //
    this.giltterCanvas = this.createCanvas('glitter');
    this.surface = this.giltterCanvas.getContext('2d');
    this.surface.scale(1, 1);
    // run function //
    this.renderLoop();
    this.giltterCanvas.addEventListener('mousemove', (e) => { this.createParticle(e); });
    // const gravity = document.getElementById('vmax');
    // const bounce = document.getElementById('hmax');
    // gravity.addEventListener('change', () => {
    //   this.settings.gravity = gravity.value / 100;
    // });
    // bounce.addEventListener('change', () => {
    //   this.settings.bounce = bounce.value / 100;
    // });
  }

  createCanvas(name) {
    const canvasElement = document.createElement('canvas');
    canvasElement.id = name;
    canvasElement.width = this.width;
    canvasElement.height = this.height;
    this.element.appendChild(canvasElement);
    return canvasElement;
  }

  createParticle(e) {
    const rect = this.giltterCanvas.getBoundingClientRect();
    const startingX = e.clientX - rect.left;
    const startingY = e.clientY - rect.top;
    this.settings.startingX = startingX;
    this.settings.startingY = startingY;
    for (let i = 0; i < this.settings.density; i++) {
      if (Math.random() > 0.97) {
        const particle = new Particle(this.settings);
        this.particles.push(particle);
      }
    }
  }

  renderLoop() {
    this.surface.clearRect(0, 0, this.width, this.height);
    // this.createParticle();
    // Draw the particles
    for (let i = 0; i < this.particles.length; i++) {
      const ptz = this.particles[i];
      const cpt = ptz.update();
      if (cpt.life >= cpt.maxLife || cpt.size < 0) {
        this.particles.splice(i, 1);
      } else {
        this.surface.drawImage(this.star, cpt.x, cpt.y, cpt.size, cpt.size);
      }
    }
    window.requestAnimationFrame(this.renderLoop);
  }

  stopAnimation() {
    window.cancelAnimationFrame(this.renderLoop);
  }
}
