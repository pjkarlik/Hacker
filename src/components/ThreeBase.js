import THREE from 'three';

// Shim layer with setTimeout fallback from Paul Irish
window.requestAnimFrame = (() => {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
  ((callback) => {
    window.setTimeout(callback, 6000 / 60);
  });
})();

export default class ThreeBase {

  constructor(element) {
    this.element = element;
    this.initThree = this.initThree.bind(this);
    this.animateThree = this.animateThree.bind(this);

    this.initThree();
  }

  initThree() {
    this.amount = 16;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    this.geometry = new THREE.BoxGeometry(80, 80, 80);
    // this.geometry = new THREE.SphereGeometry(35, 12, 12);
    this.material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
    // this.material = new THREE.MeshBasicMaterial({
    //   map: THREE.ImageUtils.loadTexture('../../resources/images/pjkprofile.png',
    //   THREE.SphericalRefractionMapping)
    // });

    this.cubes = [];
    for (let i = 0; i < this.amount; i++) {
      const mesh = new THREE.Mesh(this.geometry, this.material);

      this.scene.add(mesh);
      this.cubes.push(mesh);
    }

    // this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.element.appendChild(this.renderer.domElement);

    this.animateThree();
  }

  animateThree() {
    const amp = 225;
    const timer = 0.0008 * Date.now();
    for (let i = 0; i < this.cubes.length; i++) {
      const cube = this.cubes[i];

      const formula = (Math.PI * i * 90) / this.amount;

      cube.position.x = amp * Math.cos(formula + timer);
      cube.position.y = amp * Math.sin(formula - timer);
      cube.position.z = (amp * 4) * Math.cos(formula + (timer * 3));
    }
    this.renderer.render(this.scene, this.camera);

    window.requestAnimFrame(this.animateThree);
  }

}
