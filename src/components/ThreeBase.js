import THREE from 'three';

export default class ThreeBase {

  constructor(element) {
    this.element = element;
    this.initThree = this.initThree.bind(this);
    this.animateThree = this.animateThree.bind(this);

    this.initThree();
  }

  initThree() {
    this.amount = 16;
    this.sphereSize = 45;

    // Set up scene and cameras //
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    // Set up lights //
    this.particleLight = new THREE.Mesh(new THREE.SphereGeometry(8, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x333333 }));
    this.scene.add(this.particleLight);
    this.scene.add(new THREE.AmbientLight(0x999999));
    this.pointLight = new THREE.PointLight(0x00ff00, 1);
    this.pointLight.position.set(0, 0, 500);
    this.particleLight.add(this.pointLight);

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

      const formula = (2 * Math.PI) / this.amount;
      this.extraWave = amp * Math.cos((formula * i) - timer) * 0.01;
      cube.position.x = amp * Math.cos((formula * i) + timer - this.extraWave);
      cube.position.y = amp * Math.sin((formula * i) + timer);
      // cube.position.z = (amp * 4) * Math.cos((formula * i) + (timer * 3));
    }
    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(this.animateThree);
  }

  stopAnimation() {
    window.cancelAnimationFrame(this.animateThree);
  }

}
