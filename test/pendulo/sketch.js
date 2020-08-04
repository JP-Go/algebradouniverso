let p;
let L = 1;
let g = 9.81;
let m = 100;
let ang_0 = 30;
let damp = 0;

function getInputs() {
  g = Number(document.getElementById("g").value);
  L = Number(document.getElementById("l").value);
  m = Number(document.getElementById("m").value);
  ang_0 = Number(document.getElementById("ang").value);
  damp = Number(document.getElementById("damp").value);
}

function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);
  p = new Pendulum();
  p.setAxis(width / 2, 30);
  let onLoop = false;
  noLoop();

  let startBtn = document.getElementById("start-btn");
  let fbfBtn = document.getElementById("frame-by-frame-btn");
  let resetBtn = document.getElementById("reset-btn");

  startBtn.addEventListener("click", () => {
    loopControl(onLoop, startBtn);
    onLoop = !onLoop;
  });

  fbfBtn.addEventListener("click", () => {
    if (!onLoop) redraw();
  });

  resetBtn.addEventListener("click", () => {
    resetLoop();
  });
}

function draw() {
  background(220);
  getInputs();
  line(0, 30, width, 30);

  p.update();
  p.display();
  strokeWeight(1);
  dashedVline(p.axis.x, p.axis.y, height / 3, 10);
}
class Pendulum {
  constructor() {
    this.axis = {
      x: width / 2,
      y: 30,
    };
    this.l = 100;
    this.m = 100;
    this.damp = 0;
    this.omega_0 = sqrt(g / this.l);
    this.ang = ang_0;
    this.pos = {
      x: 0,
      y: 0,
    };
  }

  setAxis(x, y) {
    this.axis.x = x;
    this.axis.y = y;
  }
  update() {
    this.damp = damp / (2 * this.m);
    this.l = L;
    this.m = m;
    this.omega_0 = sqrt(g / this.l);
    if (this.damp == 0) {
      this.ang = ang_0 * cos(this.omega_0 * frameCount);
    } else if (this.damp > this.omega_0) {
      this.ang = ang_0 * exp(-(this.damp * 2 * frameCount));
    } else {
      let omega = sqrt(sq(this.omega_0) - sq(this.damp));
      this.ang =
        ang_0 *
        exp(-(this.damp * frameCount)) *
        (cos(omega * frameCount) -
          (this.damp / omega) * sin(omega * frameCount));
    }
    this.pos = {
      x: this.axis.x + this.l * 100 * sin(this.ang),
      y: this.axis.y + this.l * 100 * cos(this.ang),
    };
  }
  display() {
    line(this.axis.x, this.axis.y, this.pos.x, this.pos.y);
    fill(180, 60, 180);
    circle(this.pos.x, this.pos.y, this.m / 5);
  }
}

function dashedVline(x, y1, y2, n) {
  let gap = Math.abs(y2 - y1) / n;

  for (let c = 0; y1 < y2; c++) {
    line(x, y1 + c * gap, x, y1 + (c + 1) * gap);
    y1 += gap;
  }
}

function loopControl(loopStatus, btn) {
  if (!loopStatus) {
    loop();
    btn.innerText = "Parar";
  } else {
    noLoop();
    btn.innerText = "Continuar";
  }
}

function resetLoop() {
  document.getElementById("g").value = 9.81;
  document.getElementById("l").value = 1;
  document.getElementById("m").value = 100;
  document.getElementById("ang").value = 30;
  document.getElementById("damp").value = 0;
}
