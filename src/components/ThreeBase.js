import THREE from 'three';

export default class ThreeBase {

  constructor(element) {
    this.element = element;
    this.initThree = this.initThree.bind(this);
    this.animateThree = this.animateThree.bind(this);

    this.initThree();
  }
  randomPosition() {
    return 500 - Math.floor(Math.random() * 1000);
  }
  randomHex() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  initThree() {
    this.amount = 36;
    this.sphereSize = 35;

    // Set up scene and cameras //
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    // Set up lights //
    this.ambientLight = new THREE.AmbientLight(0x999999, 0.25);
    this.scene.add(this.ambientLight);
    this.ambientLight.position.set(0, 0, -1200);

    this.lights = [];
    for (let i = 0; i < 4; i++) {
      const newHex = this.randomHex();
      const pointLight = new THREE.PointLight(newHex, 1, 1000);
      this.scene.add(pointLight);
      this.lights.push(pointLight);
      pointLight.position.set(
        this.randomPosition(),
        this.randomPosition(),
        this.randomPosition());
    }

    // Set up Geomerty //
    this.geometry = new THREE.SphereGeometry(this.sphereSize, 32, 32);

    this.material = new THREE.MeshPhongMaterial({ color: 0xAAAAAA, specular: 0x0099FF,
      shininess: 30, shading: THREE.FlatShading });

    this.cubes = [];
    for (let i = 0; i < this.amount; i++) {
      const mesh = new THREE.Mesh(this.geometry, this.material);

      this.scene.add(mesh);
      this.cubes.push(mesh);
    }

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.element.appendChild(this.renderer.domElement);

    this.animateThree();
  }

  animateThree() {
    const amp = 355;
    const timer = 0.0008 * Date.now();
    for (let i = 0; i < this.cubes.length; i++) {
      const cube = this.cubes[i];

      const formula = (2 * Math.PI) / this.amount;
      this.extraWave = amp * Math.cos((formula * i) - timer) * 0.01;
      this.cosWave = amp * Math.cos((formula * i) + timer - this.extraWave);
      this.sinWave = amp * Math.sin((formula * i) + timer);
      // this.deepWave = (amp * 4) * Math.cos((formula * i) + (timer * 3));

      cube.position.x = this.cosWave;
      cube.position.y = this.sinWave;
      // cube.position.z = this.deepWave;
    }
    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(this.animateThree);
  }

  stopAnimation() {
    window.cancelAnimationFrame(this.animateThree);
  }

}
