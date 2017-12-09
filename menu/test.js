let size = 10;
let online = 1;
let fadeout = 255;
let fadein = 0;
let ychecker = innerHeight / 2 + 30;
let ytext = innerHeight / 2 - 200;

function setup() {
  createCanvas(innerWidth - 20, innerHeight - 20);
}

function draw() {
  background(255);

  fill(51, 51, 51, fadeout);
  textSize(50);
  text("Wating for another player...", innerWidth / 8, innerHeight / 2);

  if (online == 2) {
    fadeout = fadeout - 5;
    fadein = fadein + 5;

    // text ""
    fill(51, 51, 51, fadein);
    textSize(50);
    text("Press any button to start.", innerWidth / 8, ytext);

    // press checker
    strokeWeight(3);
    stroke(51, 51, 51, fadein);
    fill(255);
    ellipse(innerWidth / 2 - 20, ychecker, 100, 100);
    noStroke();
    fill(51, 51, 51, fadein);
    ellipse(innerWidth / 2 - 20, ychecker, size, size);

    if (size < 97) {
      if (keyIsPressed === true) {
        size = size + 1.5;
        return false;
      }
    } else {
      ychecker = ychecker + 5;
      ytext = ytext - 2.7;
    }
  } else if (online < 2) {
    fadeout = 255;
    fadein = 0;

    fill(51, 51, 51, fadeout);
    textSize(50);
    text("Wating for another player...", innerWidth / 8, innerHeight / 2);
  }
}
