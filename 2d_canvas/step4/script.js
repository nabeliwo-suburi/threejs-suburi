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
  var angle = 35;
  var radians = 0;
  var xunits = 0;
  var yunits = 0;
  var ball = { x: p1.x, y: p1.y };

  function updateBall() {
    radians = angle * Math.PI / 180;
    xunits = Math.cos(radians) * speed;
    yunits = Math.sin(radians) * speed;
  }

  updateBall();

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

    if (ball.x > theCanvas.width || ball.x < 0) {
      angle = 180 - angle;
      updateBall();
    } else if (ball.y > theCanvas.height || ball.y < 0) {
      angle = 360 - angle;
      updateBall();
    }

    requestAnimationFrame(drawScreen);
  }

  drawScreen();
}
