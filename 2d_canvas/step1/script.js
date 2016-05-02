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
  var y = 10;
  var x = 250;

  function drawScreen() {
    context.fillStyle = '#eeeeee';
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);

    // ボックス
    context.strokeStyle = '#000000';
    context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

    // ボール
    y += speed;

    context.fillStyle = '#000000';
    context.beginPath();
    context.arc(x, y, 15, 0, Math.PI * 2, true); // x, y, 半径, スタート(ラジアン), エンド(ラジアン), 時計回りかどうか
    context.fill();

    requestAnimationFrame(drawScreen);
  }

  drawScreen();
}
