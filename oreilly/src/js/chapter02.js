import * as THREE from 'three';
import Stats from 'stats.js';

function init() {
  const stats = initStats();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);

  // scene.fog = new THREE.FogExp2(0xffffff, 0.015);
  scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;

  const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-20, 30, -5);
  spotLight.castShadow = true;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  let step = 0;
  const controls = new function() {
    this.rotationSpeed = 0.02;
    this.numberOfObjects = scene.children.length;

    this.removeCube = () => {
      const allChildren = scene.children;
      const lastObject = allChildren[allChildren.length - 1];
      if (lastObject instanceof THREE.Mesh) {
        scene.remove(lastObject);
        this.numberOfObjects = scene.children.length;
      }
    };

    this.addCube = () => {
      const cubeSize = Math.ceil(Math.random() * 3);
      const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = `cube-${scene.children.length}`;
      cube.position.x = -30 + Math.round(Math.random() * planeGeometry.parameters.width);
      cube.position.y = Math.round(Math.random() * 5);
      cube.position.z = -20 + Math.round(Math.random() * planeGeometry.parameters.height);
      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    };

    this.outputObjects = () => {
      console.log(scene.children);
    }
  };

  const gui = new dat.GUI();
  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'addCube');
  gui.add(controls, 'removeCube');
  gui.add(controls, 'outputObjects');
  gui.add(controls, 'numberOfObjects').listen();

  render();

  function render() {
    stats.update();

    scene.traverse((obj) => {
      if(obj instanceof THREE.Mesh && obj !== plane) {
        obj.rotation.x += controls.rotationSpeed;
        obj.rotation.y += controls.rotationSpeed;
        obj.rotation.z += controls.rotationSpeed;
      }
    });

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  function initStats() {
    const stats = new Stats();

    stats.setMode(0); // 0: fps, 2: ms
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById('Stats-output').appendChild(stats.domElement);
    return stats;
  }
}

onload = init;
