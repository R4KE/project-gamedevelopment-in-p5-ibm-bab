var xSize = window.innerWidth - 20;
var ySize = window.innerHeight - 20;
pl = new Player;
muren = [];

function setup(){
  background(255);
  createCanvas(xSize, ySize);
  for (var i = 0; i < 20; i++) {
    wallkleur = random(0, 45)
    xpos = random(0, xSize)
    ypos = random(0, ySize)
    wallWidth = random(30, 110)
    wallHeight = random(40, 120)
    wall = new Wall(xpos, ypos, wallHeight, wallWidth);
    muren.push(wall);
  }
}

function draw() {
  background(255);
  pl.display();
  pl.move();

  for (var i = 0; i < 20; i++) {
    wall1 = muren[i];
    wall1.teken();
  }
}

function Wall(xpos, ypos, wallWidth, WallHeigt) {
  this.xpos = xpos;
  this.ypos = ypos;
  this.wallWidth = wallWidth;
  this.wallHeight = wallHeight;

  this.teken = function() {
    fill(wallkleur);
    noStroke();
    rectMode(CENTER);
    rect(xpos, ypos, wallHeight, wallWidth);
  }

  this.colide = function() {
    pl[0].xpos = px;
    pl[0].ypos = py;
    if (!(px > this.xpos || px < this.xpos +  wallWidth || py > this.ypos || py < this.ypos + wallHeight)){
      console.log(dipp);
    }
  }
}

function Player() {
  this.playerHeight = 40;
  this.playerWidth = 10;
  this.radius = 15;
  this.xpos = 0;
  this.ypos = 0;
  this.speed = 2;

  this.display = function() {
    fill(255, 0, 0);
    rect(this.xpos, this.ypos, 2*this.radius, 2*this.radius);
  }

  this.move = function() {
      if (keyIsDown(32)){
        console.log("test");
      }
      else if (keyIsDown(87)){
        this.ypos -= this.speed;
      }
      else if (keyIsDown(83)){
        this.ypos += this.speed;
      }
      else if (keyIsDown(65)){
        this.xpos -= this.speed;
      }
      else if (keyIsDown(68)){
        this.xpos += this.speed;
      }
  }
}
