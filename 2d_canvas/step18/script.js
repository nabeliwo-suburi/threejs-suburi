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
  var radius = 10;
  var easeValue = .05;
  var p1 = { x: 250, y: 490 };
  var tempSpeed = .5;
  var tempAngle = 270;
  var tempRadians = tempAngle * Math.PI / 180;
  var tempVelocityx = Math.cos(tempRadians) * tempSpeed;
  var tempVelocityy = Math.sin(tempRadians) * tempSpeed;
  var ball = {
    x: p1.x,
    y: p1.y,
    velocityx: tempVelocityx,
    velocityy: tempVelocityy,
    radius: radius
  };

  function drawScreen() {
    context.fillStyle = '#eee';
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);

    // ボックス
    context.strokeStyle = '#000';
    context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

    ball.velocityx = ball.velocityx + (ball.velocityx * easeValue);
    ball.velocityy = ball.velocityy + (ball.velocityy * easeValue);

    ball.x += ball.velocityx;
    ball.y += ball.velocityy;

    context.fillStyle = '#000';
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
    context.fill();

    requestAnimationFrame(drawScreen);
  }

  drawScreen();
}
