document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.querySelector('#glcanvas');
  var gl = canvas.getContext('experimental-webgl');

  var vShaderSource = [
    'attribute vec4 a_Position',
    'void main(){',
    '  gl_Position = a_Position;',
    '}'
  ].join('\\n');

  var fShaderSource = [
    'void main(){',
    '  gl_FlagColor = vec4(1.0, 0.0, 0.0, 1.0);',
    '}'
  ].join('\\n');

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);

  gl.shaderSource(vertexShader, vShaderSource);
  gl.compileShader(vertexShader);

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(fragmentShader, fShaderSource);
  gl.compileShader(fragmentShader);

  var program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  gl.program = program;

  var vertices = new Float32Array([
     0.0,  0.5, 0.0,
    -0.5, -0.5, 0.0,
     0.5, -0.5, 0.0
  ]);
  var verticesLength = 3;

  var vertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, verticesLength);
}, false);
