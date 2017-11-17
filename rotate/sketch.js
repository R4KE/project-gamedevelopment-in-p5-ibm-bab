let x = innerWidth/2-200;
let y = innerHeight/2;
let degree = 90;
let rotatespd = 1;
let spd = 2;

function setup(){
  createCanvas(innerWidth - 20, innerHeight - 20);
  angleMode(RADIANS);
}

function draw() {
  background(255);
  push();
  translate(x/2, y/2);
  rotate(degree / 57.25);
  rectMode(CENTER);
  rect(0, 0, 50, 50);
  stroke(200);
  line(0, 0, 0, -50);
  pop();
  console.log(degree);
  ellipse(20, 20, 20, 20);

  if (degree <= 0) {
    degree = 360;
  }

  if (keyIsDown(65)) {
      degree -= rotatespd;
      return false;
  } else if (keyIsDown(68)) {
      degree += rotatespd;
      return false;
  } else if (keyIsDown(87)) {
      this.xSpeed -= Math.sin(this.direction);
      this.ySpeed += Math.cos(this.direction);
      return false;
  } else if (keyIsDown(83)) {
    this.xSpeed += Math.sin(this.direction);
    this.ySpeed -= Math.cos(this.direction);
      return false;
  }

  translate(0, 0);
  ellipse(20, 20, 20, 20)
}
