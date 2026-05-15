//Experiment 1-artistic clock
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  smooth();
}

function draw() {
  background(5, 5, 12, 40);

  translate(width / 2, height / 2);
  //time
  let hr = hour() % 12;
  let mn = minute();
  let sc = second();

  let secA = map(sc, 0, 60, 0, 360);
  let minA = map(mn, 0, 60, 0, 360);
  let hrA = map(hr, 0, 12, 0, 360);
  //mouse interaction
  let mouseForce = map(mouseX, 0, width, -20, 20);

  let mouseWave = map(mouseY, 0, height, 0.5, 2);

  drawingContext.shadowBlur = 0;
  //clock border
  noFill();
  strokeWeight(2);

  stroke(0, 255, 200);

  ellipse(0, 0, 360);
  //clock lines
  for (let a = 0; a < 360; a += 6) {
    let r1 = 170;
    let r2 = 175;

    if (a % 30 == 0) {
      r1 = 160;
      strokeWeight(3);
    } else {
      strokeWeight(1.5);
    }

    let x1 = cos(a) * r1;
    let y1 = sin(a) * r1;

    let x2 = cos(a) * r2;
    let y2 = sin(a) * r2;

    if (a % 30 == 0) {
      stroke(255, 0, 180);
    } else {
      stroke(0, 255, 255);
    }

    line(x1, y1, x2, y2);
  }
  //illusion/spirals in clock
  noFill();

  for (let i = 0; i < 45; i++) {
    push();

    rotate(frameCount * 0.25 + i * 8 + mouseForce * 0.3);

    let size = 40 + i * 3;

    // alternate  colors
    if (i % 2 == 0) {
      stroke(0, 255, 255, 120);
    } else {
      stroke(255, 0, 200, 120);
    }

    strokeWeight(1.3);

    beginShape();

    for (let a = 0; a < 360; a += 5) {
      let wave = sin(a * mouseWave + frameCount * 2) * 8;

      let radius = size + wave + sin(frameCount + i * 3) * 4;

      let x = cos(a) * radius;
      let y = sin(a) * radius;

      vertex(x, y);
    }

    endShape(CLOSE);

    pop();
  }

  noStroke();

  fill(255, 255, 255);

  ellipse(0, 0, 10);

  // Hour Hand
  push();

  rotate(hrA + mn * 0.5);

  stroke(255, 0, 180);
  strokeWeight(7);

  line(0, 0, 70, 0);

  pop();

  // Minute Hand
  push();

  rotate(minA);

  stroke(0, 255, 255);
  strokeWeight(5);

  line(0, 0, 110, 0);

  pop();

  // Second Hand
  push();

  rotate(secA);

  stroke(255, 255, 255);
  strokeWeight(2);

  line(0, 0, 135, 0);

  pop();
  // numbers
  textAlign(CENTER, CENTER);
  textSize(22);
  textFont("monospace");

  for (let n = 1; n <= 12; n++) {
    let angle = n * 30 - 90;

    let x = cos(angle) * 145;
    let y = sin(angle) * 145;

    if (n % 2 == 0) {
      fill(255, 0, 180);
    } else {
      fill(0, 255, 255);
    }

    text(n, x, y);
  }
  //digital clock
  resetMatrix();

  fill(255);

  textSize(18);

  let t = nf(hour(), 2) + ":" + nf(minute(), 2) + ":" + nf(second(), 2);

  textAlign(CENTER);

  text(t, width / 2, 380);
}
