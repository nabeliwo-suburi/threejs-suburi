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
  var p1 = { x: 20, y: 250 };
  var p2 = { x: 480, y: 250 };
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  var distance = Math.sqrt(dx * dx + dy * dy); // 2地点間の距離
  var moves = distance / speed; // 距離をスピードでわって、何回移動するかをきめる
  var xunits = (p2.x - p1.x) / moves; // 移動する回数でわることで1回の移動での距離をだす
  var yunits = (p2.y - p1.y) / moves;
  var ball = { x: p1.x, y: p1.y };

  function drawScreen() {
    context.fillStyle = '#eeeeee';
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);

    // ボックス
    context.strokeStyle = '#000000';
    context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

    // ボール
    if (moves > 0) {
      moves--;
      ball.x += xunits;
      ball.y += yunits;
    }

    context.fillStyle = '#000000';
    context.beginPath();
    context.arc(ball.x, ball.y, 15, 0, Math.PI * 2, true); // x, y, 半径, スタート(ラジアン), エンド(ラジアン), 時計回りかどうか
    context.fill();

    requestAnimationFrame(drawScreen);
  }

  drawScreen();
}
