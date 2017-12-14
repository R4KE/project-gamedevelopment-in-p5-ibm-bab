var socket, x, y, ex, ey, color, IDlength, eIDlength, edirection, exbullet, eybullet;
let cx;
let cy;
var ycanvas = innerHeight - 20;
var xcanvas = innerWidth - 20;
var players = [];
var speed = 3;
var points = 0;
var aantalplayers = 0;
var playerID = "YOU";
var ePlayerID = "ENEMY";
var direction = 0;
var bullets = [];
var bulletsshot = 0;
var cooldown = 0;
var cooldowntimer = 100;
var bulletspd = 5;
var xbullet = -10;
var ybullet = -10;
var dx;
var dy;
let score = 0;
let eScore = 0;
var value = false;

function setup() {
  createCanvas(xcanvas, ycanvas);
  angleMode(RADIANS);

   x = random(0, innerWidth - 20);
   y = random(0, innerHeight - 20);

  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000/');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('pos',
    // When we receive data
    function(data) {
      console.log("pull: " + Math.floor(data.x) + " " + Math.floor(data.y) + " " + Math.floor(data.direction) + " " + data.playerID + " " + Math.floor(data.xbullet) + " " + Math.floor(data.ybullet));

      ex = data.x;
      ey = data.y;
      exbullet = data.xbullet;
      eybullet = data.ybullet;
      ePlayerID = data.playerID;
      edirection = data.direction;
    }
  );
}

var Player = new player();

function draw() {
  background(255);

  menu();
}

function scoreboard() {
  fill(51);
  textSize(textsize * 1.5);
  text(score / 10, 100, 100);
}

function game() {
  dx = ex - xbullet;
  dy = ey - ybullet;

  scoreboard();

  if (sqrt(dx*dx + dy*dy) <= 40 + 10){
    console.log("hit");
    score++;
  }

  sendmouse(x,y,direction,playerID,xbullet,ybullet);

  //temporarily enemy bullet
  noStroke();
  fill(0);
  ellipse(exbullet, eybullet, 10, 10);

  for (i = 0; i < bulletsshot; i++) {
    var bullet1 = bullets[i];
    bullet1.teken();
    bullet1.beweeg();
  }
  fill(0, 255, 0);
  noStroke();
  Player.controls();
  Player.render();
  Player.eRender();

  for (i = 0; i < bulletsshot; i++) {
    var bullet1 = bullets[i];
    bullet1.teken();
    bullet1.beweeg();
  }

  cooldown += 1;
}
function player() {
  this.xPos = 100;
  this.yPos = 100;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.direction = 0;


  this.controls = function() {
    if (cooldown > cooldowntimer){
      if (keyIsDown(32)) { //"space"
        bulletsshot += 1;
        console.log("new bullet");
        bullets.push(new Bullet(this.xPos, this.yPos, 10, Math.sin(this.direction) * - bulletspd, Math.cos(this.direction) * bulletspd));
        cooldown = 0;
      }
    }
    if (keyIsDown(65)) { //a
      this.direction -= 0.03;
      direction = this.direction;
    }
    if (keyIsDown(68)) { //d
      this.direction += 0.03;
      direction = this.direction;
    }
    if (keyIsDown(87)) { //w
      this.xSpeed -= Math.sin(this.direction);
      this.ySpeed += Math.cos(this.direction);
      x = this.xPos;
      y = this.yPos;
    }
    if (keyIsDown(83)) { //s
      this.xSpeed += Math.sin(this.direction);
      this.ySpeed -= Math.cos(this.direction);
      x = this.xPos;
      y = this.yPos;
    }
    if (keyIsDown(82)) { //r
      //code
    }//reload


    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
    this.xSpeed = this.xSpeed * 0.6;
    this.ySpeed = this.ySpeed * 0.6;
  }

  this.render = function() {
    textSize(16);
    fill(250, 20, 20);
    text(playerID, this.xPos - 20, this.yPos - 55);

    stroke(20);
    strokeWeight(1);
    fill(250, 20, 20);
    push();
    translate(this.xPos,this.yPos);
    rotate(this.direction);
    rectMode(CENTER);
    rect(0, 0, 45, 60);
    noStroke();
    fill(219, 17, 17);
    rect(-16.5, 0.5, 10, 59)// left shadow
    rect(17.5, 0.5, 10, 59)// right shadow
    noStroke();
    //fill(50);
    //ellipse(this.xbullet, this.ybullet, 5, 5);// draw bullet
    fill(219, 17, 17);
    stroke(20);
    rectMode(CORNER);
    rect(-5, 0, 10, 40);
    fill(250, 20, 20);
    ellipse(0, 0, 40, 40);
    pop();
  }

  this.eRender = function() {
    noStroke();
    textSize(16);
    fill(45, 155, 46);
    text(ePlayerID, ex - 20, ey - 55);

    stroke(20);
    strokeWeight(1);
    fill(45, 155, 46);
    push();
    translate(ex, ey);
    rotate(edirection);
    rectMode(CENTER);
    rect(0, 0, 45, 60);
    noStroke();
    fill(38, 132, 39);
    rect(-16.5, 0.5, 10, 59)// left shadow
    rect(17.5, 0.5, 10, 59)// right shadow
    noStroke();
    fill(38, 132, 39);
    stroke(20);
    rectMode(CORNER);
    rect(-5, 0, 10, 40);
    fill(45, 155, 46);
    ellipse(0, 0, 40, 40);
    pop();
  }
}

function Bullet(_x, _y, _straal, _xspeed, _yspeed) {
  this.x = _x;
  this.y = _y;
  this.straal = _straal;
  this.xspeed = _xspeed;
  this.yspeed = _yspeed;
  this.shot = 0;

  this.teken = function() {
    noStroke();
    fill(20);
    ellipse(this.x, this.y, this.straal, this.straal);
  }

  this.beweeg = function() {
    xbullet = this.x;
    ybullet = this.y;
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
}

function sendmouse(xpos, ypos, direction, playerName, xBullet, yBullet) {
  // We are sending!
  console.log("push: " + Math.floor(xpos) + " " + Math.floor(ypos) + " " + Math.floor(direction) + " " + playerName + " " + Math.floor(xBullet) + " " + Math.floor(yBullet));

  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
    direction: direction,
    playerID: playerName,
    xbullet: xBullet,
    ybullet: yBullet
  };

  // Send that object to the socket
  socket.emit('pos',data);
}
