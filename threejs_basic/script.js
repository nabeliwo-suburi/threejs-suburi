window.addEventListener('DOMContentLoaded', function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  var fov = 80;
  var aspect = width / height;
  var near = 1;
  var far = 1000;

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 500;
  scene.add(camera);

  var directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.z = 3;
  scene.add(directionalLight);

  var geometry = new THREE.CubeGeometry(200, 200, 200);
  var material = new THREE.MeshLambertMaterial({ color: 0x660000 });
  var cubeMesh = new THREE.Mesh(geometry, material);
  scene.add(cubeMesh);

  function rendering() {
    cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(rendering);
  }
  rendering();
}, false);
