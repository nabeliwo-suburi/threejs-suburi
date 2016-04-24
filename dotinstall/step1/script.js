(function() {
  var width = 500;
  var height = 300;

  // scene
  var scene = new THREE.Scene();

  // mesh
  var geometry = new THREE.CubeGeometry(50, 50, 50); // 立方体
  // var material = new THREE.MeshBasicMaterial({ color: 'red' }); // 光を反射しない素材
  var material = new THREE.MeshLambertMaterial({ color: 0xff0000 }); // 光を反射する素材
  var cube = new THREE.Mesh(geometry, material);

  cube.position.set(0, 0, 0); // rotate, scale
  scene.add(cube);

  var sGeometry = new THREE.SphereGeometry(30); // 球体
  var sMaterial = new THREE.MeshLambertMaterial({ color: 0x121212 });
  var sphere = new THREE.Mesh(sGeometry, sMaterial);

  sphere.position.set(100, 100, 100);
  scene.add(sphere);

  // light
  var light = new THREE.DirectionalLight(0xffffff, 1);

  light.position.set(0, 100, 30);
  scene.add(light);

  var ambient = new THREE.AmbientLight(0x550000); // 環境光

  scene.add(ambient);

  // camera
  var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);

  camera.position.set(200, 100, 500);
  // このpositionのセットのやり方は以下のようにもできる。
  // camera.position.x = 0;
  // camera.position = new THREE.Vector3(0, 0, 0);
  camera.lookAt(cube.position);

  // helper
  var axis = new THREE.AxisHelper(1000);

  axis.position.set(0, 0, 0);
  scene.add(axis);

  // rendering
  var renderer = new THREE.WebGLRenderer();

  renderer.setSize(width, height);
  renderer.setClearColor(0xeeeeee, 1);
  document.getElementById('stage').appendChild(renderer.domElement);
  renderer.render(scene, camera);
})();
