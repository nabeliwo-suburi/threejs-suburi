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
  var speed = 4;
  var gravity = .1;
  var angle = 295;
  var radians = angle * Math.PI / 180;
  var radius = 15;
  var vx = Math.cos(radians) * speed;
  var vy = Math.sin(radians) * speed;
  var p1 = { x: 20, y: theCanvas.height - radius };
  var ball = {
    x: p1.x,
    y: p1.y,
    velocityx: vx,
    velocityy: vy,
    radius: radius
  };

  function drawScreen() {
    context.fillStyle = '#eee';
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);

    // ボックス
    context.strokeStyle = '#000';
    context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

    ball.velocityy += gravity;

    if ((ball.y + ball.radius) > theCanvas.height) {
      ball.velocityy = -(ball.velocityy);
    }

    ball.y += ball.velocityy;
    ball.x += ball.velocityx;

    context.fillStyle = '#000';
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
    context.fill();

    requestAnimationFrame(drawScreen);
  }

  drawScreen();
}
