// いつものようにシーン、カメラなどを用意していきます。
var width  = window.innerWidth,
    height = window.innerHeight;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 40, width / height, 0.1, 100 );
camera.position.set( 0, 0, 3 );

// 通常、私達が使う画面では、色がsRGBに補正されています。
// 物理ベースレンダリングでは正確な色の計算を行うために
// リニア色空間での処理する必要があります。
// そのため、テクスチャーなど外からはいってくるRGBに対して
// 色の調整が必要になります。
// rendererの`gammaInput`、`gammaOutput`を
// `true`にすることでthree.jsが自動で色空間の調整を行ってくれます。
var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setClearColor( 0xcccccc );
renderer.gammaInput = true;
renderer.gammaOutput = true;
document.body.appendChild( renderer.domElement );

scene.add( new THREE.HemisphereLight( 0x443333, 0x222233, 4 ) );

// 物理ベースレンダリングでは
// すべての物体は「光を反射」をします。
// 反射の材料となるキューブマップを用意しておきます。
var cubeTextureLoader = new THREE.CubeTextureLoader()
var textureCube = cubeTextureLoader.load( [
  './assets/img/LancellottiChapel/posx.jpg',
  './assets/img/LancellottiChapel/negx.jpg',
  './assets/img/LancellottiChapel/posy.jpg',
  './assets/img/LancellottiChapel/negy.jpg',
  './assets/img/LancellottiChapel/posz.jpg',
  './assets/img/LancellottiChapel/negz.jpg'
] );

// - アルベド（`color`）
// - ラフネス
// - メタリック
// - 環境マップ
// をオプションとして、マテリアルのインスタンスを用意します。
var material = new THREE.MeshStandardMaterial( {

    color: 0xFFC355,
    roughness: 0,
    metalness: 1,
    envMap: textureCube

} );

// これまでのthree.jsと同じように
// meshにmaterialを適用し、
// シーンに追加します
var sphere = new THREE.Mesh(
  new THREE.SphereGeometry( 0.4, 16, 16 ),
  material
);
scene.add( sphere );

// レンダリングします
( function renderLoop () {

  requestAnimationFrame( renderLoop );
  renderer.render( scene, camera );

} )();
