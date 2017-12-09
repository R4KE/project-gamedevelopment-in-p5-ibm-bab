let size = 10;
let online = 1;
let fadeout1 = 255;
let fadein1 = 0;
let fadeout2 = 255;
let fadein2 = 0;
let ychecker = innerHeight / 2 + 30;
let ytext = innerHeight / 2 - 200;
let textsize = innerWidth / 18;
var ID;
var playerID;
let stage = 0;


function setup() {
  createCanvas(innerWidth - 20, innerHeight - 20);

  //nothing
}

function draw() {
  background(255);

  noStroke();
  fill(51, 51, 51, fadeout2);
  textSize(textsize);
  text("Wating for another player...", innerWidth / 7, innerHeight / 2);

  if (online == 2) {
      fadeout2 = fadeout2 - 10;
    if (fadein2 < 255) {
      fadein2 = fadein2 + 5;
    }

    fill(51, 51, 51, fadein2);
    textSize(textsize);
    text("Choose your Nickname", innerWidth / 5, innerHeight / 4.4);

    fill(51, 51, 51, fadein2);
    textSize(textsize);
    text("Click anywhere", innerWidth / 3.3, innerHeight / 1.3);

    //circles
    noFill();
    strokeWeight(3);
    stroke(51, 51, 51, fadein2);
    ellipse(innerWidth / 2, innerHeight / 2, 50, 50);

    noFill();
    strokeWeight(3);
    stroke(51, 51, 51, fadein2);
    ellipse(innerWidth / 2, innerHeight / 2, 100, 100);

    noFill();
    strokeWeight(3);
    stroke(51, 51, 51, fadein2);
    ellipse(innerWidth / 2, innerHeight / 2, 150, 150);
  }

  if (stage == 2) {
    fadein2 = fadein2 - 10;
    fadein1 = fadein1 + 5;

    // text ""
    fill(51, 51, 51, fadein1);
    textSize(50);
    text("Press any button to start.", innerWidth / 8, ytext);

    // press checker
    strokeWeight(3);
    stroke(51, 51, 51, fadein1);
    fill(255);
    ellipse(innerWidth / 2 - 20, ychecker, 100, 100);
    noStroke();
    fill(51, 51, 51, fadein1);
    ellipse(innerWidth / 2 - 20, ychecker, size, size);

    if (size < 97) {
      if (keyIsPressed === true) {
        size = size + 1.5;
        return false;
      } else if (size > 10) {
        size = size - 0.5
      }
    } else {
      ychecker = ychecker + 5;
      ytext = ytext - 2.7;
    }
  } else if (online < 2) {
    fadeout2 = 255;
    fadein2 = 0;

    fill(51, 51, 51, fadeout2);
    textSize(textsize);
    text("Wating for another player...", innerWidth / 7, innerHeight / 2);
  }
}

function input() {
  ID = prompt("Choose a nickname: ", "Nickname");
  if (ID != null) {
    	playerID = ID;
  }
}
