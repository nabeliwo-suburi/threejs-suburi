const WIDTH = 983;
const HEIGHT = 983;
const LIFEMAX = 100;
const NUM = 100;

(w => {
  function Particle(ctx, x, y) {
    this.ctx = ctx;
    this.initialize(x, y);
  }

  Particle['prototype']['initialize'] = initialize;
  Particle['prototype']['render'] = render;
  Particle['prototype']['draw'] = draw;
  Particle['prototype']['updateParams'] = updateParams;
  Particle['prototype']['updatePosition'] = updatePosition;
  Particle['prototype']['wrapPosition'] = wrapPosition;
  Particle['prototype']['gradient'] = gradient;

  function initialize(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 250;
    this.startLife = Math.ceil(LIFEMAX * Math.random());
    this.life = this.startLife;
    this.v = {
      x: Math.random() * 10 - 5,
      y: Math.random() * 10 - 5
    };
    this.color = {
      r: Math.floor(Math.random() * 255),
      g: Math.floor(Math.random() * 255),
      b: Math.floor(Math.random() * 255),
      a: 1
    };
  }

  function render() {
    this.updateParams();
    this.updatePosition();
    this.wrapPosition();
    this.draw();
  }

  function draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.gradient();
    this.ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

  function updateParams() {
    const ratio = this.life / this.startLife;

    this.color.a = 1 - ratio;
    this.radius = 30 / ratio;

    if (this.radius > 300) this.radius = 300;

    this.life -= 1;

    if (this.life === 0) {
      const positionx = Math.random() * WIDTH;
      const positiony = Math.random() * HEIGHT;

      this.initialize(positionx, positiony);
    };
  }

  function updatePosition() {
    this.x += this.v.x;
    this.y += this.v.y;
  }

  function wrapPosition() {
    if (this.x < 0) this.x = WIDTH;
    if (this.x > WIDTH) this.x = 0;
    if (this.y < 0) this.y = HEIGHT;
    if (this.y > HEIGHT) this.y = 0;
  }

  function gradient() {
    const col = `${this.color.r}, ${this.color.g}, ${this.color.b}`;
    const g = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);

    g.addColorStop(0, `rgba(${col}, ${this.color.a * 1}`);
    g.addColorStop(0.5, `rgba(${col}, ${this.color.a * 0.2})`);
    g.addColorStop(1, `rgba(${col}, ${this.color.a * 0})`);

    return g;
  }

  w.Particle = Particle;
})(window);

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const particles = [];

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  for (let i = 0; i < NUM; i++) {
    const positionx = Math.random() * WIDTH;
    const positiony = Math.random() * HEIGHT;

    particle = new Particle(ctx, positionx, positiony);
    particles.push(particle);
  }

  function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.globalCompositeOperation = 'lighter';
    particles.forEach(item => item.render());
    requestAnimationFrame(render);
  }

  render();
}, false);
