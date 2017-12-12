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
let i = 0;
let ringsize = 50;
let ringvalue = 0;


function setup() {
  createCanvas(innerWidth - 20, innerHeight - 20);
  //nothing
}

function draw() {

  menu();
}

function menu() {
  background(255);

  if (online < 2) {
    waiting();
  } if (online == 2) {
    fadein2 = 255;
    nickname();
  } if (stage == 2) {
    fadein1 = 255;
    pressstart();
  }
}

//waiting menu
function waiting() {
  noStroke();
  fill(51, 51, 51, fadeout2);
  textSize(textsize);
  text("Waiting for another player...", innerWidth / 7, innerHeight / 2);
}

//choose your nickname
function nickname() {
  background(255);

  if (ringvalue == 0) {
    ringsize = ringsize + 0.2;
  } if (ringsize > 60 || ringsize == 60) {
    ringvalue = 1;
  } if (ringvalue == 1) {
    ringsize = ringsize - 0.2;
  } if (ringsize < 50 || ringsize == 50) {
    ringvalue = 0;
  }

  fill(51, 51, 51, fadein2);
  textSize(textsize);
  text("Choose your Nickname", innerWidth / 5, innerHeight / 4.4);

  fill(51, 51, 51, fadein2);
  textSize(textsize);
  text("By clicking anywhere", innerWidth / 4.1, innerHeight / 1.3);

  //circles
  noFill();
  strokeWeight(3);
  stroke(51, 51, 51, fadein2);
  ellipse(innerWidth / 2, innerHeight / 2, ringsize, ringsize);

  noFill();
  strokeWeight(3);
  stroke(51, 51, 51, fadein2);
  ellipse(innerWidth / 2, innerHeight / 2, ringsize * 2, ringsize * 2);

  noFill();
  strokeWeight(3);
  stroke(51, 51, 51, fadein2);
  ellipse(innerWidth / 2, innerHeight / 2, ringsize * 3, ringsize * 3);

  noStroke();

  if (stage == 2) {
    fadein2 = 0;
  }

  if (mouseIsPressed) {
    input();
    return false;
  }
}

//press to start the game
function pressstart() {
  background(255);

  fill(51, 51, 51, fadein1);
  textSize(50);
  text("Hold any key to start.", innerWidth / 5, ytext);

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
    ychecker = ychecker + 15;
    ytext = ytext - 7;

  }
}

function input() {
  if (i < 1) {
    ID = prompt("Choose a nickname: ", "Nickname");
    if (ID != null) {
      	playerID = ID;
        stage = 2;
    } else {
      alert("You need to have a name!");
    }
  }
  i++;
}
