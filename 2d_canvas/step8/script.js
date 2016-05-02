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
  var numBalls = 50;
  var maxSize = 12;
  var minSize = 3;
  var maxSpeed = maxSize + 5;
  var balls = [];
  var tempBall;
  var tempX;
  var tempY;
  var tempSpeed;
  var tempAngle;
  var tempRadius;
  var tempRadians;
  var tempVelocityx;
  var tempVelocityy;
  var friction = .01;

  for (var i = 0; i < numBalls; i++) {
    tempRadius = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

    var placeOK = false;

    while (!placeOK) {
      tempX = Math.floor(Math.random() * theCanvas.width);
      tempY = Math.floor(Math.random() * theCanvas.height);
      tempSpeed = maxSpeed - tempRadius;
      tempAngle = Math.floor(Math.random() * 360);
      tempRadians = tempAngle * Math.PI / 180;
      tempVelocityx = Math.cos(tempRadians) * tempSpeed;
      tempVelocityy = Math.sin(tempRadians) * tempSpeed;

      tempBall = {
        x: tempX,
        y: tempY,
        nextX: tempX,
        nextY: tempY,
        radius: tempRadius,
        speed: tempSpeed,
        angle: tempAngle,
        velocityx: tempVelocityx,
        velocityy: tempVelocityy,
        mass: tempRadius * 8
      };

      placeOK = canStartHere(tempBall);
    }

    balls.push(tempBall);
  }

  function canStartHere(ball) {
    var retval = true;

    for (var i = 0, l = balls.length; i < l; i++) {
      if (hitTestCircle(ball, balls[i])) {
        retval = false;
      }
    }

    return retval;
  }

  function hitTestCircle(ball1, ball2) {
    var retval = false;
    var dx = ball1.nextX - ball2.nextX;
    var dy = ball1.nextY - ball2.nextY;
    var distance = dx * dx + dy * dy;

    if (distance <= (ball1.radius + ball2.radius) * (ball1.radius + ball2.radius)) {
      retval = true;
    }

    return retval;
  }

  function drawScreen() {
    context.fillStyle = '#eeeeee';
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);

    // ボックス
    context.strokeStyle = '#000000';
    context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

    update();
    testWalls();
    collide();
    render();

    requestAnimationFrame(drawScreen);
  }

  drawScreen();

  function update() {
    var ball;

    for (var i = 0, l = balls.length; i < l; i++) {
      ball = balls[i];

      // 摩擦
      ball.velocityx = ball.velocityx - (ball.velocityx * friction);
      ball.velocityy = ball.velocityy - (ball.velocityy * friction);

      ball.nextX = ball.x + ball.velocityx;
      ball.nextY = ball.y + ball.velocityy;
    }
  }

  function testWalls() {
    var ball;

    for (var i = 0, l = balls.length; i < l; i++) {
      ball = balls[i];

      if (ball.nextX + ball.radius > theCanvas.width) {
        ball.velocityx = ball.velocityx * -1;
        ball.nextX = theCanvas.width - ball.radius;
      } else if (ball.nextX - ball.radius < 0) {
        ball.velocityx = ball.velocityx * -1;
        ball.nextX = ball.radius;
      } else if (ball.nextY + ball.radius > theCanvas.height) {
        ball.velocityy = ball.velocityy * -1;
        ball.nextY = theCanvas.height - ball.radius;
      } else if (ball.nextY - ball.radius < 0) {
        ball.velocityy = ball.velocityy * -1;
        ball.nextY = ball.radius;
      }
    }
  }

  function collide() {
    var ball;
    var testBall;

    for (var i = 0, l = balls.length; i < l; i++) {
      ball = balls[i];

      for (var j = i + 1, len = balls.length; j < len; j++) {
        testBall = balls[j];

        if (hitTestCircle(ball, testBall)) {
          collideBalls(ball, testBall);
        }
      }
    }
  }

  function hitTestCircle(ball1, ball2) {
    var retval = false;
    var dx = ball1.nextX - ball2.nextX;
    var dy = ball1.nextY - ball2.nextY;
    var distance = dx * dx + dy * dy;

    if (distance <= (ball1.radius + ball2.radius) * (ball1.radius + ball2.radius)) {
      retval = true;
    }

    return retval;
  }

  function collideBalls(ball1, ball2) {
    var dx = ball1.nextX - ball2.nextX; // 2地点間のx軸の距離
    var dy = ball1.nextY - ball2.nextY; // 2地点間のy軸の距離
    var collisionAngle = Math.atan2(dy, dx); // 衝突の角度
    var speed1 = Math.sqrt(ball1.velocityx * ball1.velocityx + ball1.velocityy * ball1.velocityy); // ball1の速度
    var speed2 = Math.sqrt(ball2.velocityx * ball2.velocityx + ball2.velocityy * ball2.velocityy); // ball2の速度
    var direction1 = Math.atan2(ball1.velocityy, ball1.velocityx); // ball1の角度
    var direction2 = Math.atan2(ball2.velocityy, ball2.velocityx); // ball2の角度
    var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle); // ball1の新しいx軸の移動方向
    var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle); // ball1の新しいy軸の移動方向;
    var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle); // ball2の新しいx軸の移動方向
    var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle); // ball2の新しいy軸の移動方向;

    var final_velocityx_1 = ((ball1.mass - ball2.mass) * velocityx_1 + (ball2.mass + ball2.mass) * velocityx_2) / (ball1.mass + ball2.mass);
    var final_velocityx_2 = ((ball1.mass + ball1.mass) * velocityx_1 + (ball2.mass - ball1.mass) * velocityx_2) / (ball1.mass + ball2.mass);

    var final_velocityy_1 = velocityy_1;
    var final_velocityy_2 = velocityy_2;

    ball1.velocityx = Math.cos(collisionAngle) * final_velocityx_1 + Math.cos(collisionAngle + Math.PI / 2) * final_velocityy_1;
    ball1.velocityy = Math.sin(collisionAngle) * final_velocityx_1 + Math.sin(collisionAngle + Math.PI / 2) * final_velocityy_1;
    ball2.velocityx = Math.cos(collisionAngle) * final_velocityx_2 + Math.cos(collisionAngle + Math.PI / 2) * final_velocityy_2;
    ball2.velocityy = Math.sin(collisionAngle) * final_velocityx_2 + Math.sin(collisionAngle + Math.PI / 2) * final_velocityy_2;

    ball1.nextX = (ball1.nextX += ball1.velocityx);
    ball1.nextY = (ball1.nextY += ball1.velocityy);
    ball2.nextX = (ball2.nextX += ball2.velocityx);
    ball2.nextY = (ball2.nextY += ball2.velocityy);
  }

  function render() {
    var ball;

    context.fillStyle = '#000000';

    for (var i = 0, l = balls.length; i < l; i++) {
      ball = balls[i];

      ball.x = ball.nextX;
      ball.y = ball.nextY;

      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
      context.fill();
    }
  }
}
