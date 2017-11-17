let x = innerWidth/2;
let y = innerHeight/2;
let degree = 1;
let rotatespd = 0.05
let spd = 2;

function setup(){
  createCanvas(innerWidth - 20, innerHeight - 20);

}

function draw() {
  background(255);
  translate(x/2, y/2);
  rotate(degree);
  rectMode(CENTER);
  rect(0, 0, 100, 50);

  if (keyIsDown(65)) {
      degree -= rotatespd;
      return false;
  } else if (keyIsDown(68)) {
      degree += rotatespd;
      return false;
  } else if (keyIsDown(87)) {
      y -= spd;
      return false;
  } else if (keyIsDown(83)) {
      y += spd;
      return false;
  }
}
