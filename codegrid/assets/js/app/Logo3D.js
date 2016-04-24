var CG2 = CG2 || {};

CG2.Logo3D = (function() {
  'use strict';

  var BREAK_POINT = 768 - 1;
  // matchMediaはCSSのmatchMediaのJS版。.matchesで真偽値を返す
  var isSmallScreen = function() {
    return window.matchMedia('(max-width: ' + BREAK_POINT + 'px)').matches;
  };
  // Page Visibility APIを使う(タブを変えたときなど)
  var isWindowHidden = function() {
    if (typeof (document.hidden || document.msHidden || document.webkitHidden) === 'undefined') {
      // もしAPIがサポートされていなければ、いつでもfalseを返す
      return false;
    }

    return document.hidden || document.msHidden || document.webkitHidden;
  };
  // windowのfocus状態を取得する。windowのイベントでisUnfocusを変更している
  var isWindowUnfocused = (function() {
    var isUnfocused = false;

    window.addEventListener('focus', function() {
      isUnfocused = false;
    });
    window.addEventListener('blur', function() {
      isUnfocused = true;
    });

    return function() {
      return isUnfocused;
    }
  })();

  var Logo3D = function(containerElement) {
    var that = this;

    this.aspect = new THREE.Vector3(16, 9);
    this.height = 1;
    this.width = 1;

    this.containerElement = containerElement;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x000000, 600, 1000);
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 1, 10000);
    this.camera.position.set(0, 0, 600);
    this.renderer = new THREE.WebGLRenderer();
    this.containerElement.appendChild(this.renderer.domElement);
    this.running = false;
    this.mousePonter = new THREE.Vector2(0, 0);
    this.letterMeshes = [];
    this.isNoWrap = true;
    // this.noise = CG2.makePNoise1D(32, 512);

    var grid = new THREE.Points(Logo3D.gridGeometry, Logo3D.gridMaterial);
    this.scene.add(grid);
  };

  ///////////////////////////////
  // grid geometry
  ///////////////////////////////
  Logo3D.gridGeometry = (function() {
    var GRID_WIDTH = 160;
    var GRID_HEIGHT = 60;
    var GRID_STEP = 10;
    var GRID_STEP_HALF = GRID_STEP * 0.5;
    var posV, posH;
    var gridGeometry = new THREE.BufferGeometry();
    var position = [];
    var rand = [];
    var vertexBuffer, randBuffer;

    for (var i = 0, l = GRID_WIDTH * GRID_HEIGHT; i < l; i++) {
      posV = ((i / GRID_HEIGHT) | 0) * GRID_STEP - GRID_WIDTH * GRID_STEP_HALF;
      posH = i % GRID_HEIGHT * GRID_STEP - GRID_HEIGHT * GRID_STEP_HALF + GRID_STEP_HALF;

      position.push(posV, posH, 0);
      rand.push(Math.random());
    }

    console.log(position);
    console.log(rand);

    return gridGeometry;
  })();

  return Logo3D;
})();
