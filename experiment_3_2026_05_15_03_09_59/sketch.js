//EXPERIMENT 3- generative art
let mode, pal, bg;
let bots = [];
let t = 0;
let seed;
let symmetry;
let tileSize;
//create canva and random settings
function setup() {
  createCanvas(450, 450);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(RADIANS);
  noStroke();

  seed = floor(random(999999));
  noiseSeed(seed);

  mode = floor(random(5));
  pal = makePalette();
  bg = color(random(360), random(20, 60), random(5, 15));
  symmetry = floor(random([3, 4, 5, 6, 8, 10, 12]));
  tileSize = random([20, 25, 40, 50]);

  background(bg);
//create moving particles
  for (let i = 0; i < random(80, 220); i++) {
    bots.push(new Bot());
  }
}

function draw() {
  t += 0.01;
//switch between art modes
  if (mode === 0) galaxyMode();
  else if (mode === 1) crystalMode();
  else if (mode === 2) ribbonMode();
  else if (mode === 3) tileMode();
  else if (mode === 4) creatureMode();
//stop after some frames
  if (frameCount > 900) noLoop();
}
//class for moving particles
class Bot {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.px = this.x;
    this.py = this.y;
    this.a = random(TWO_PI);
    this.s = random(0.5, 4);
    this.r = random(2, 18);
    this.c = random(pal);
    this.life = random(100, 500);
    this.age = 0;
  }

  move() {
    this.px = this.x;
    this.py = this.y;

    let n = noise(this.x * 0.005, this.y * 0.005, t);
    this.a += map(n, 0, 1, -0.4, 0.4);

    this.x += cos(this.a) * this.s;
    this.y += sin(this.a) * this.s;

    this.age++;
//reset particle
    if (
      this.x < -50 ||
      this.x > width + 50 ||
      this.y < -50 ||
      this.y > height + 50 ||
      this.age > this.life
    ) {
      this.x = random(width);
      this.y = random(height);
      this.age = 0;
      this.c = random(pal);
    }
  }
}
//galaxy mode
function galaxyMode() {
  fill(hue(bg), saturation(bg), brightness(bg), 6);
  rect(0, 0, width, height);

  translate(width / 2, height / 2);

  for (let b of bots) {
    b.move();

    let x = b.x - width / 2;
    let y = b.y - height / 2;

    let a = atan2(y, x);
    let d = dist(0, 0, x, y);

    x = cos(a + d * 0.006) * d;
    y = sin(a + d * 0.006) * d;

    for (let i = 0; i < symmetry; i++) {
      rotate(TWO_PI / symmetry);
      stroke(hue(b.c), saturation(b.c), 100, 35);
      strokeWeight(b.r * 0.15);
      line(x, y, x * 0.96, y * 0.96);
      noStroke();
      fill(hue(b.c), saturation(b.c), 100, 40);
      circle(x, y, b.r);
    }
  }
}
//crystal mode
function crystalMode() {
  translate(width / 2, height / 2);
  for (let i = 0; i < 12; i++) {
    let a = frameCount * 0.01 + (i * TWO_PI) / 12;
    let r = noise(i, t) * 230;
    let x = cos(a) * r;
    let y = sin(a) * r;
    push();
    rotate((i * TWO_PI) / symmetry);
    strokeWeight(random(0.5, 2));
    stroke(hue(pal[i % pal.length]), 60, 100, 35);
    line(0, 0, x, y);
    line(x, y, x * 0.8 + random(-30, 30), y * 0.8 + random(-30, 30));
    noStroke();
    fill(hue(pal[i % pal.length]), 80, 100, 35);
    circle(x, y, random(3, 12));

    pop();
  }
}
//ribbon mode
function ribbonMode() {
  fill(hue(bg), saturation(bg), brightness(bg), 3);
  rect(0, 0, width, height);
  for (let b of bots) {
    b.move();
    stroke(hue(b.c), saturation(b.c), brightness(b.c), 45);
    strokeWeight(b.r * 0.4);
    let wave = sin(frameCount * 0.03 + b.x * 0.03) * 20;
    line(b.px, b.py, b.x + wave, b.y - wave);
    noStroke();
    fill(hue(b.c), saturation(b.c), 100, 25);
    circle(b.x, b.y, b.r * 0.8);
  }
}
//tile mode
function tileMode() {
  if (frameCount % 8 !== 0) return;
  let x = floor(random(width / tileSize)) * tileSize;
  let y = floor(random(height / tileSize)) * tileSize;
  let c = random(pal);
  push();
  translate(x + tileSize / 2, y + tileSize / 2);
  rotate(random([0, HALF_PI, PI, PI + HALF_PI]));
  fill(hue(c), saturation(c), brightness(c), random(25, 75));
  let type = floor(random(4));
  if (type === 0) arc(0, 0, tileSize, tileSize, 0, HALF_PI);
  else if (type === 1) rect(-tileSize / 2, -tileSize / 2, tileSize, tileSize);
  else if (type === 2)
    triangle(
      -tileSize / 2,
      tileSize / 2,
      0,
      -tileSize / 2,
      tileSize / 2,
      tileSize / 2
    );
  else {
    stroke(hue(c), saturation(c), 100, 70);
    strokeWeight(random(1, 4));
    line(-tileSize / 2, 0, tileSize / 2, 0);
    line(0, -tileSize / 2, 0, tileSize / 2);
  }
  pop();
}
//creature mode
function creatureMode() {
  fill(hue(bg), saturation(bg), brightness(bg), 4);
  rect(0, 0, width, height);

  for (let b of bots) {
    b.move();

    let wobble = sin(frameCount * 0.05 + b.r) * b.r;

    fill(hue(b.c), saturation(b.c), brightness(b.c), 35);
    ellipse(b.x, b.y, b.r * 2 + wobble, b.r);

    fill(hue(b.c), 30, 100, 50);
    circle(b.x + cos(b.a) * b.r, b.y + sin(b.a) * b.r, b.r * 0.4);
  }
}
//colour palette generator
function makePalette() {
  let base = random(360);
  let type = floor(random(5));
  let p = [];
  for (let i = 0; i < 5; i++) {
    let h;
    if (type === 0) h = base + i * 20;
    else if (type === 1) h = base + i * 72;
    else if (type === 2) h = base + i * 120;
    else if (type === 3) h = base + random(-40, 40);
    else h = random(360);
    p.push(color(h % 360, random(45, 95), random(65, 100), 80));
  }
  return p;
}
