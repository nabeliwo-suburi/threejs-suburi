import * as THREE from 'three';
import Stats from 'stats.js';

function init() {
  const stats = initStats();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;

  const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;
  scene.add(cube);

  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = 20;
  sphere.position.y = 0;
  sphere.position.z = 2;
  sphere.castShadow = true;
  scene.add(sphere);

  camera.position.x = -25;
  camera.position.y = 30;
  camera.position.z = 25;
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  const ambiColor = '#0c0c0c';
  const ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-20, 30, -5);
  spotLight.castShadow = true;
  scene.add(spotLight);

  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const controls = new function() {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
    this.ambientColor = ambiColor;
    this.disableSpotLight = false;
  };

  const gui = new dat.GUI();
  gui.addColor(controls, 'ambientColor').onChange((e) => {
    ambientLight.color = new THREE.Color(e);
  });
  gui.add(controls, 'disableSpotLight').onChange((e) => {
    spotLight.visible = !e;
  });

  render();

  let step = 0;

  function render() {
    stats.update();
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;
    step += controls.bouncingSpeed;
    sphere.position.x = 20 + ( 10 * (Math.cos(step)));
    sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  function initStats() {
    const stats = new Stats();
    stats.setMode = 0;
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById('Stats-output').appendChild(stats.domElement);
    return stats;
  }
}

onload = init();
