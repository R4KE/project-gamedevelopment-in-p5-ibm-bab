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
    wall1.colide();
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
    rect(xpos, ypos, wallWidth, wallHeight);
  }

  this.colide = function() {
    px = pl.xpos;
    py = pl.ypos;
    if (px < this.xpos + this.wallWidth &&
        px + pl.radius > this.xpos &&
        py < this.ypos + this.wallHeight &&
        pl.radius + py > this.ypos) {
      console.log("colide wall");
      pl.xpos += (pl.xpos - (this.xpos + (wallWidth / 2))) / 10;
      pl.ypos += (pl.ypos - (this.ypos + (wallHeight / 2))) / 10;
    }
  }
}

function Player() {
  this.playerHeight = 40;
  this.playerWidth = 10;
  this.radius = 20;
  this.xpos = 0;
  this.ypos = 0;
  this.speed = 5;

  this.display = function() {
    fill(255, 0, 0);
    rect(this.xpos, this.ypos, this.radius, this.radius);
  }

  this.move = function() {
      if (keyIsDown(87)){
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
