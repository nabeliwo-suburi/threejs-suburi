window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
  canvasApp();
}

function canvasApp() {
  var theCanvas = document.getElementById('canvasOne');

  if (!theCanvas || !theCanvas.getContext) {
    return;
  }

  var context = theCanvas.getContext('2d');
  var speed = 5;
  var p1 = { x: 20, y: 20 };
  var angle = 45;
  var radians = angle * Math.PI / 180;
  var xunits = Math.cos(radians) * speed;
  var yunits = Math.sin(radians) * speed;
  var ball = { x: p1.x, y: p1.y };

  function drawScreen() {
    context.fillStyle = '#eeeeee';
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);

    // ボックス
    context.strokeStyle = '#000000';
    context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

    ball.x += xunits;
    ball.y += yunits;

    context.fillStyle = '#000000';
    context.beginPath();
    context.arc(ball.x, ball.y, 15, 0, Math.PI * 2, true); // x, y, 半径, スタート(ラジアン), エンド(ラジアン), 時計回りかどうか
    context.fill();

    requestAnimationFrame(drawScreen);
  }

  drawScreen();
}
