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
  var circle = {
    centerX: 250,
    centerY: 250,
    radius: 125,
    angle: 0
  };
  var ball = {
    x: 0,
    y: 0,
    speed: .1
  };

  function drawScreen() {
    context.fillStyle = '#eee';
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);

    // ボックス
    context.strokeStyle = '#000';
    context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

    ball.x = circle.centerX + Math.cos(circle.angle) * circle.radius;
    ball.y = circle.centerY + Math.sin(circle.angle) * circle.radius;

    circle.angle += ball.speed;

    context.fillStyle = '#000';
    context.beginPath();
    context.arc(ball.x, ball.y, 15, 0, Math.PI * 2, true);
    context.fill();

    requestAnimationFrame(drawScreen);
  }

  drawScreen();
}
