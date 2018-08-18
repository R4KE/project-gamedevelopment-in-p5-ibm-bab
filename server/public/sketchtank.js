var socket, x, y, ex = 100, ey = 100, color, IDlength, eIDlength, edirection, exbullet, eybullet;
let cx;
let cy;
var ycanvas = innerHeight - 20;
var xcanvas = innerWidth - 20;
var players = [];
var speed = 3;
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
var score = 0;
var eScore = 0;
var value = false;
var Eenx = 0;

function setup() {
  createCanvas(xcanvas, ycanvas);
  angleMode(RADIANS);

   x = 100;
   y = 100;

  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://192.168.2.10:3000/');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('pos',
    // When we receive data
    function(data) {
      //console.log("pull: " + Math.floor(data.x) + " " + Math.floor(data.y) + " " + Math.floor(data.direction) + " " + data.playerID + " " + Math.floor(data.xbullet) + " " + Math.floor(data.ybullet) + " " + data.score);

      ex = data.x;
      ey = data.y;
      exbullet = data.xbullet;
      eybullet = data.ybullet;
      ePlayerID = data.playerID;
      edirection = data.direction;
      eScore = data.score
    }
  );
}

var Player = new player();

function draw() {
  background(255);

  menu();
}

function scoreboard() {
  points = score / 10;
  ePoints = eScore / 10;
  fill(51);
  textSize(textsize * 1.5);
  text(points + " | " + ePoints, 100, 100);
  if (points > 9.9) {
    fill(51);
    textSize(textsize * 3);
    text("YOU WON!", innerWidth / 20, innerHeight / 2);
  } if (ePoints > 9.9) {
      fill(51);
      textSize(textsize * 2);
      text("ENEMY WON!", innerWidth / 10, innerHeight / 2);
    }
}

function game() {
  dx = ex - xbullet;
  dy = ey - ybullet;

  if (Eenx < 1) {
    Eenx = 2;
  }

  scoreboard();

  if (sqrt(dx*dx + dy*dy) <= 40 + 10){
    console.log("hit");
    score++;
  }

  sendmouse(x,y,direction,playerID,xbullet,ybullet,score);

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
  Player.map();
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

  this.map = function() {
    fill(51);
    //nr.1
    rect(200, 150, 100, 100);
    fill(51);
    //nr.1 + 100, 200
    rect(300, 400, 100, 100);
    fill(51);
    //nr.2 + 50 - 350
    rect(350, 50, 100, 100);
    fill(51);
    //nr.3 + 100 + 400
    rect(450, 450, 100, 100);
    fill(51);
    //nr.4 + 150 - 450
    rect(600, 0, 100, 100);
  }

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
      if (x < 170 || x > 333 || y < 120 || y > 285) {
        if (x < 270 || x > 433 || y < 370 || y > 535) {
          if (x < 320 || x > 483 || y < 20 || y > 185) {
            if (x < 420 || x > 583 || y < 420 || y > 585) {
              if (x < 570 || x > 633 || y < -20 || y > 145) {
                this.xSpeed -= Math.sin(this.direction);
                this.ySpeed += Math.cos(this.direction);
                x = this.xPos;
                y = this.yPos;
              }
            }
          }
        }
      }
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
    rect(0, 0, 50, 50);
    noStroke();
    fill(219, 17, 17);
    rect(-16.5, 0.5, 10, 54)// left shadow
    rect(17.5, 0.5, 10, 54)// right shadow
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
    rect(0, 0, 50, 50);
    noStroke();
    fill(38, 132, 39);
    rect(-16.5, 0.5, 10, 54)// left shadow
    rect(17.5, 0.5, 10, 54)// right shadow
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
    if (this.x > 200 || this.x < 300 || this.y > 150 || this.y < 250) {
      if (this.x < 300 || this.x > 400 || this.y < 400 || this.y > 500) {
        if (this.x < 350 || this.x > 450 || this.y < 50 || this.y > 150) {
          if (this.x < 450 || this.x > 550 || this.y < 450 || this.y > 550) {
            if (this.x < 600 || this.x > 700 || this.y < 0 || this.y > 100) {
              xbullet = this.x;
              ybullet = this.y;
              this.x += this.xspeed;
              this.y += this.yspeed;
            } else {
              this.x = -10;
              this.y = -10;
              this.xspeed = 0;
              this.yspeed = 0;
              console.log("collision");
            }
          } else {
            this.x = -10;
            this.y = -10;
            this.xspeed = 0;
            this.yspeed = 0;
            console.log("collision");
          }
        } else {
          this.x = -10;
          this.y = -10;
          this.xspeed = 0;
          this.yspeed = 0;
          console.log("collision");
        }
      } else {
        this.x = -10;
        this.y = -10;
        this.xspeed = 0;
        this.yspeed = 0;
        console.log("collision");
      }
    } else {
      this.x = -10;
      this.y = -10;
      this.xspeed = 0;
      this.yspeed = 0;
      console.log("collision");
    }
  }
}

function sendmouse(xpos, ypos, direction, playerName, xBullet, yBullet, points) {
  // We are sending!
  //console.log("push: " + Math.floor(xpos) + " " + Math.floor(ypos) + " " + Math.floor(direction) + " " + playerName + " " + Math.floor(xBullet) + " " + Math.floor(yBullet) + " " + points);

  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
    direction: direction,
    playerID: playerName,
    xbullet: xBullet,
    ybullet: yBullet,
    score: points
  };

  // Send that object to the socket
  socket.emit('pos',data);
}
