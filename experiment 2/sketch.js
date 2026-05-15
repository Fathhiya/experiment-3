//EXPERIMENT 2-Mouse driven painting

let paintLayer;
let toolIndex = 0;
let colorIndex = 0;
let bottomBarHeight = 45;
let brushRadius = 15;

//tools and color settings
let tools = ["Neon Light", "Water Color", "Spray Paint", "Star Brush"];
let colors = ["#ff4fd8", "#00bfff", "#9b5de5", "#ffd700", "#39ff14"];
let toolStartColors = [0, 1, 2, 3];

//create canva and drawing layer
function setup() {
  createCanvas(450, 450);
  paintLayer = createGraphics(width, height - bottomBarHeight);
  paintLayer.background(0);
  textFont("Arial");
}

function draw() {
  background(255);
  image(paintLayer, 0, 0);
  drawBottomBar();

  //draw only inside the canva
  if (mouseIsPressed && mouseY < height - bottomBarHeight) {
    drawTool(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function drawTool(x, y, px, py) {
  let c = colors[colorIndex];
  if (toolIndex === 0) {
    neonLightBrush(x, y, px, py, c);
  } else if (toolIndex === 1) {
    waterColorBrush(x, y, c);
  } else if (toolIndex === 2) {
    sprayPaintBrush(x, y, c);
  } else if (toolIndex === 3) {
    starBrush(x, y);
  }
}

//neon brush
function neonLightBrush(x, y, px, py, c) {
  drawLine(px, py, x, y, red(c), green(c), blue(c), 35, 30);
  drawLine(px, py, x, y, red(c), green(c), blue(c), 80, 16);
  paintLayer.stroke(c);
  paintLayer.strokeWeight(4);
  paintLayer.line(px, py, x, y);
}
function drawLine(px, py, x, y, r, g, b, a, weight) {
  paintLayer.stroke(r, g, b, a);
  paintLayer.strokeWeight(weight);
  paintLayer.line(px, py, x, y);
}

//water color brush
function waterColorBrush(x, y, c) {
  paintLayer.noStroke();
  for (let i = 0; i < 9; i++) {
    let rx = random(-15, 15);
    let ry = random(-15, 15);
    let size = random(15, 25);
    paintLayer.fill(red(c), green(c), blue(c), random(18, 45));
    paintLayer.ellipse(x + rx, y + ry, size, size);
  }
}

//spray brush
function sprayPaintBrush(x, y, c) {
  paintLayer.noStroke();
  for (let i = 0; i < 150; i++) {
    let p = randomPoint(x, y, 20);
    paintLayer.fill(red(c), green(c), blue(c), random(50, 170));
    paintLayer.circle(p.x, p.y, random(1, 4));
  }
}

//starbrush
function starBrush(x, y) {
  paintLayer.noStroke();
  let starColors = [
    "#ffffff",
    "#fff3b0",
    "#9bf6ff",
    "#c77dff",
    "#ff70a6",
    "#ffd700",
  ];
  for (let i = 0; i < 20; i++) {
    let p = randomPoint(x, y, brushRadius);
    paintLayer.fill(random(starColors));
    drawStar(paintLayer, p.x, p.y, random(2, 4), random(5, 9), 5);
  }
}

function randomPoint(x, y, radiusLimit) {
  let angle = random(TWO_PI);
  let radius = random(0, radiusLimit);
  return {
    x: x + cos(angle) * radius,
    y: y + sin(angle) * radius,
  };
}

//star shape
function drawStar(pg, x, y, radius1, radius2, points) {
  let angle = TWO_PI / points;
  let halfAngle = angle / 2;
  pg.beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
    pg.vertex(x + cos(a) * radius2, y + sin(a) * radius2);
    pg.vertex(
      x + cos(a + halfAngle) * radius1,
      y + sin(a + halfAngle) * radius1
    );
  }
  pg.endShape(CLOSE);
}

//text box
function drawBottomBar() {
  noStroke();
  fill(245);
  rect(0, height - bottomBarHeight, width, bottomBarHeight);
  fill(0);
  textSize(10);
  textAlign(LEFT, CENTER);
  text(
    "Tool: " +
      tools[toolIndex] +
      "   |   Right Arrow = Tool   Space = Style   0 = Clear",
    15,
    height - bottomBarHeight / 2
  );
}

//key controls
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    toolIndex = (toolIndex + 1) % tools.length;
    colorIndex = toolStartColors[toolIndex];
    return false;
  }

  if (key === " ") {
    colorIndex = (colorIndex + 1) % colors.length;
    return false;
  }
  
  if (key === "0") {
    paintLayer.background(0);
    return false;
  }
}
