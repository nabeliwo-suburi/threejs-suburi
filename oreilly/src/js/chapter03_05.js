import * as THREE from 'three';
import Stats from 'stats.js';

function init() {
  const stats = initStats();
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xaaaaaa, 0.010, 200);

  const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(new THREE.Color(0xaaaaff));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;

  const textureLoader = new THREE.TextureLoader();
  const textureGrass = textureLoader.load('../textures/ground/grasslight-big.jpg');
  textureGrass.wrapS = THREE.RepeatWrapping;
  textureGrass.wrapT = THREE.RepeatWrapping;
  textureGrass.repeat.set(4, 4);

  const planeGeometry = new THREE.PlaneGeometry(1000, 200, 20, 20);
  const planeMaterial = new THREE.MeshLambertMaterial({ map: textureGrass });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff3333 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;
  scene.add(cube);

  const sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
  const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = 10;
  sphere.position.y = 5;
  sphere.position.z = 10;
  sphere.castShadow = true;
  scene.add(sphere);

  camera.position.x = -20;
  camera.position.y = 15;
  camera.position.z = 45;
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  const ambiColor = "#1c1c1c";
  const ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);

  const spotLight0 = new THREE.SpotLight(0xcccccc);
  spotLight0.position.set(-40, 60, -10);
  spotLight0.lookAt(plane);
  scene.add(spotLight0);

  const hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
  hemiLight.position.set(0, 500, 0);
  scene.add(hemiLight);

  const pointColor = "#ffffff";
  const spotLight = new THREE.DirectionalLight(pointColor);
  spotLight.position.set(30, 10, -50);
  spotLight.castShadow = true;
  spotLight.shadow.camera.near = 0.1;
  spotLight.shadow.camera.far = 100;
  spotLight.shadow.camera.fov = 50;
  spotLight.target = plane;
  spotLight.distance = 0;
  spotLight.shadow.camera.near = 2;
  spotLight.shadow.camera.far = 200;
  spotLight.shadow.camera.left = -100;
  spotLight.shadow.camera.right = 100;
  spotLight.shadow.camera.top = 100;
  spotLight.shadow.camera.bottom = -100;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  scene.add(spotLight);

  document.getElementById("WebGL-output").appendChild(renderer.domElement);

  let step = 0;
  const invert = 1;
  const phase = 0;
  const controls = new function () {
    this.rotationSpeed = 0.03;
    this.bouncingSpeed = 0.03;
    this.ambientColor = ambiColor;
    this.pointColor = pointColor;
    this.intensity = 0.1;
    this.distance = 0;
    this.exponent = 30;
    this.angle = 0.1;
    this.debug = false;
    this.castShadow = true;
    this.onlyShadow = false;
    this.target = "Plane";
  };
  const gui = new dat.GUI();
  gui.addColor(controls, 'ambientColor').onChange((e) => {
    ambientLight.color = new THREE.Color(e);
  });
  gui.addColor(controls, 'pointColor').onChange((e) => {
    spotLight.color = new THREE.Color(e);
  });
  gui.add(controls, 'intensity', 0, 5).onChange((e) => {
    spotLight.intensity = e;
  });

  const textureFlare0 = textureLoader.load('../textures/lensflare/lensflare0.png');
  const textureFlare3 = textureLoader.load('../textures/lensflare/lensflare3.png');
  const flareColor = new THREE.Color(0xffaacc);
  const lensFlare = new THREE.LensFlare(textureFlare0, 350, 0.0, THREE.AdditiveBlending, flareColor);
  lensFlare.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
  lensFlare.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
  lensFlare.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
  lensFlare.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);
  lensFlare.position.copy(spotLight.position);
  scene.add(lensFlare);

  render();
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
    stats.setMode(0); // 0: fps, 1: ms
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById('Stats-output').appendChild(stats.domElement);
    return stats;
  }
}

onload = init;
