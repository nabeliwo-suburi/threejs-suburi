(function() {
  'use strict';

  var scene;
  var text;
  var camera;
  var renderer;
  var width = 500;
  var height = 250;
  var controls;
  var loader;

  // scene ステージ
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(200, 100, 300);
  camera.lookAt(scene.position);

  // controls
  controls = new THREE.OrbitControls(camera);

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xefefef);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('stage').appendChild(renderer.domElement);

  // texture
  loader = new THREE.FontLoader();
  loader.load('../threejs/helvetiker_regular.typeface.js', function(font) {
    createText(font);
    render();
  });

  function createText(font) {
    // text
    text = new THREE.Mesh(
      new THREE.TextGeometry('nabeliwo', {
        font: font,
        size: 24,
        height: 4
      }),
      new THREE.MeshBasicMaterial({ color: 0xf39800, side: THREE.DoubleSide })
    );
    text.position.set(-80, 0, 0);
    scene.add(text);
  }

  function render() {
    requestAnimationFrame(render);

    controls.update();
    renderer.render(scene, camera);
  }

})();
