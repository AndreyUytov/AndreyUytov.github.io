const Screen = {
  WIDTH: 800,
  HEIGHT: 600
};

const getRandomValue = function (param) {
  let value = Math.ceil(Math.random() * param);
  return value;
};

const clearFrame = function (ctx) {
  ctx.clearRect(0, 0, Screen.WIDTH, Screen.HEIGHT);
};

class Raindrop {
  constructor () {
    this.x = getRandomValue(Screen.WIDTH);
    this.y = getRandomValue(Screen.HEIGHT);
    this.size = getRandomValue(12) + 8;
    this.line = this.size > 15 ? 2 : 1;
  }

  get reset() {
    this.x = getRandomValue(Screen.WIDTH);
    this.y = getRandomValue(Screen.HEIGHT);
    this.size = getRandomValue(12) + 8;
    this.line = this.size > 15 ? 2 : 1;
  }

  render (ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.line;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.size, this.y + this.size);
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }

  update () {
    this.x = this.x - this.size/2;
    this.y = this.y + this.size;
    if (this.isOffscreen()) {
      this.reset;
    }
  }

  isOffscreen () {
    return this.y > Screen.HEIGHT + this.size || this.x > Screen.WIDTH + this.size || this.x < -this.size;
  }
};

const renderFrame = function (ctx, raindrops) {
  clearFrame(ctx);

  raindrops.forEach( (it) => {
    it.render(ctx);
    it.update();
  });
  requestAnimationFrame(renderFrame.bind(null, ctx, raindrops));
}

const setup = function () {
  const DROPS = 400;

  const canvas = document.querySelector(`.can`);
  canvas.width = Screen.WIDTH;
  canvas.height = Screen.HEIGHT;
  const ctx = canvas.getContext(`2d`);


  const raindrops = new Array(DROPS).fill('').map( function() {
  return new Raindrop;
  });

  renderFrame(ctx, raindrops);
};

setup();
