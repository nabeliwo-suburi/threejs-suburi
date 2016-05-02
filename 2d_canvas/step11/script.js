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
  var p0 = { x: 60, y: 10 };
  var p1 = { x: 70, y: 200 };
  var p2 = { x: 125, y: 295 };
  var p3 = { x: 350, y: 350 };
  var ball = {
    x: 0,
    y: 0,
    speed: .01,
    t: 0
  };

  function drawScreen() {
    context.fillStyle = '#eee';
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);

    // ボックス
    context.strokeStyle = '#000';
    context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

    var t = ball.t;

    var cx = 3 * (p1.x - p0.x);
    var bx = 3 * (p2.x - p1.x) - cx;
    var ax = p3.x - p0.x - cx - bx;

    var cy = 3 * (p1.y - p0.y);
    var by = 3 * (p2.y - p1.y) - cy;
    var ay = p3.y - p0.y - cy - by;

    var xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
    var yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;

    ball.t += ball.speed;

    if (ball.t > 1) {
      ball.t = 1;
    }

    // 4つの点
    context.font = '10px sans';
    context.fillStyle = '#f00';
    context.beginPath();
    context.arc(p0.x, p0.y, 8, 0, Math.PI * 2, true);
    context.fill();
    context.fillStyle = '#fff';
    context.fillText('0', p0.x - 3, p0.y + 3);

    context.font = '10px sans';
    context.fillStyle = '#f00';
    context.beginPath();
    context.arc(p1.x, p1.y, 8, 0, Math.PI * 2, true);
    context.fill();
    context.fillStyle = '#fff';
    context.fillText('1', p1.x - 3, p1.y + 3);

    context.font = '10px sans';
    context.fillStyle = '#f00';
    context.beginPath();
    context.arc(p2.x, p2.y, 8, 0, Math.PI * 2, true);
    context.fill();
    context.fillStyle = '#fff';
    context.fillText('2', p2.x - 3, p2.y + 3);

    context.font = '10px sans';
    context.fillStyle = '#f00';
    context.beginPath();
    context.arc(p3.x, p3.y, 8, 0, Math.PI * 2, true);
    context.fill();
    context.fillStyle = '#fff';
    context.fillText('3', p3.x - 3, p3.y + 3);

    // 移動するボール
    context.fillStyle = '#000';
    context.beginPath();
    context.arc(xt, yt, 5, 0, Math.PI * 2, true);
    context.fill();

    requestAnimationFrame(drawScreen);
  }

  drawScreen();
}
