window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
  canvasApp();
}

function canvasApp() {
  var theCanvas = document.getElementById('canvasOne');

  if (!theCanvas || !theCanvas.getContext) {
    return;
  }

  document.getElementById('canvasWidth').addEventListener('change', canvasWidthChanged, false);
  document.getElementById('canvasHeight').addEventListener('change', canvasHeightChanged, false);

  function canvasWidthChanged(e) {
    var target = e.target;

    theCanvas.width = target.value;
  }

  function canvasHeightChanged(e) {
    var target = e.target;

    theCanvas.height = target.value;
  }

  var context = theCanvas.getContext('2d');
  var numBalls = 100;
  var maxSize = 8;
  var minSize = 5;
  var maxSpeed = maxSize + 5;
  var balls = [];
  var tempBall;
  var tempX;
  var tempY;
  var tempSpeed;
  var tempAngle;
  var tempRadius;
  var tempRadians;
  var tempXunits;
  var tempYunits;
  var ball;

  for (var i = 0; i < numBalls; i++) {
    tempRadius = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
    tempX = Math.floor(Math.random() * theCanvas.width);
    tempY = Math.floor(Math.random() * theCanvas.height);
    tempSpeed = maxSpeed - tempRadius;
    tempAngle = Math.floor(Math.random() * 360);
    tempRadians = tempAngle * Math.PI / 180;
    tempXunits = Math.cos(tempRadians) * tempSpeed;
    tempYunits = Math.sin(tempRadians) * tempSpeed;

    tempBall = {
      x: tempX,
      y: tempY,
      radius: tempRadius,
      speed: tempSpeed,
      angle: tempAngle,
      xunits: tempXunits,
      yunits: tempYunits
    };

    balls.push(tempBall);
  }

  function updateBall(ball) {
    ball.radians = ball.angle * Math.PI / 180;
    ball.xunits = Math.cos(ball.radians) * ball.speed;
    ball.yunits = Math.sin(ball.radians) * ball.speed;
  }

  function drawScreen() {
    context.fillStyle = '#eeeeee';
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);

    // ボックス
    context.strokeStyle = '#000000';
    context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

    // ボール
    context.fillStyle = '#000000';

    for (var i = 0, l = balls.length; i < l; i++) {
      ball = balls[i];
      ball.x += ball.xunits;
      ball.y += ball.yunits;

      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true); // x, y, 半径, スタート(ラジアン), エンド(ラジアン), 時計回りかどうか
      context.fill();

      if (ball.x > theCanvas.width || ball.x < 0) {
        ball.angle = 180 - ball.angle;
        updateBall(ball);
      } else if (ball.y > theCanvas.height || ball.y < 0) {
        ball.angle = 360 - ball.angle;
        updateBall(ball);
      }
    }

    requestAnimationFrame(drawScreen);
  }

  drawScreen();
}
