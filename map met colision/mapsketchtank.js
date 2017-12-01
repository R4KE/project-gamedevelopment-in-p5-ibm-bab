var xSize = window.innerWidth - 20;
var ySize = window.innerHeight - 20;
let direction = 0;
var bullets = [];
var bulletsshot = 0;
var cooldown = 0;
var cooldowntimer = 10;
player = new player;
muren = [];

function setup(){
  background(255);
  createCanvas(xSize, ySize);
  for (var i = 0; i < 20; i++) {
    wallkleur = random(0, 45)
    xPos = random(0, xSize)
    yPos = random(0, ySize)
    wallWidth = random(30, 110)
    wallHeight = random(40, 120)
    wall = new Wall(xPos, yPos, wallHeight, wallWidth);
    muren.push(wall);
  }
}

function draw() {
  background(255);
  for (i = 0; i < bulletsshot; i++) {
    var bullet1 = bullets[i];
    bullet1.teken();
    bullet1.beweeg();
  }
  fill(0, 255, 0);
  noStroke();
  player.controls();
  player.render();

  for (i = 0; i < bulletsshot; i++) {
    var bullet1 = bullets[i];
    bullet1.teken();
    bullet1.beweeg();
  }

  cooldown += 1;

  for (var i = 0; i < 20; i++) {
    wall1 = muren[i];
    wall1.teken();
    wall1.colide();
  }
}

function Wall(xPos, yPos, wallWidth, WallHeigt) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.wallWidth = wallWidth;
  this.wallHeight = wallHeight;

  this.teken = function() {
    fill(wallkleur);
    noStroke();
    rect(xPos, yPos, wallWidth, wallHeight);
  }

  this.colide = function() {
    px = player.xPos;
    py = player.yPos;
    if (px < this.xPos + this.wallWidth &&
        px + 45 > this.xPos &&
        py < this.yPos + this.wallHeight &&
        60 + py > this.yPos) {
      console.log("colide wall");
      player.xPos += (player.xPos - (this.xPos + (wallWidth / 2))) / 10;
      player.yPos += (player.yPos - (this.yPos + (wallHeight / 2))) / 10;
    }
  }
}

function player() {
  this.xPos = 100;
  this.yPos = 100;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.direction = 0;


  this.controls = function() {
    if (keyIsDown(32)) { //"space"
      if (cooldown > cooldowntimer){
        bulletsshot += 1;
        console.log("new bullet");
        bullets.push(new Bullet(this.xPos, this.yPos, 10, Math.sin(this.direction) * -5, Math.cos(this.direction) * 5));
        cooldown = 0;
      }
      return false;
    } else {
      if (keyIsDown(65)) { //a
        this.direction -= 0.03;
      }
      if (keyIsDown(68)) { //d
        this.direction += 0.03;
      }
      if (keyIsDown(87)) { //w
        this.xSpeed -= Math.sin(this.direction);
        this.ySpeed += Math.cos(this.direction);
      }
      if (keyIsDown(83)) { //s
        this.xSpeed += Math.sin(this.direction);
        this.ySpeed -= Math.cos(this.direction);
      }
      if (keyIsDown(82)) { //r
        //c4ode
      }//reload
    }

    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
    this.xSpeed = this.xSpeed * 0.6;
    this.ySpeed = this.ySpeed * 0.6;
  }

  this.render = function() {
    stroke(20);
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
}

function Bullet(_x, _y, _straal, _xspeed, _yspeed) {
  this.x = _x;
  this.y = _y;
  this.straal = _straal;
  this.xspeed = _xspeed;
  this.yspeed = _yspeed;
  this.shot = 0;

  if(this.x < innerWidth - 100) {
    this.teken = function() {
      noStroke();
      fill(20);
      ellipse(this.x, this.y, this.straal, this.straal);
    }
  }
  else{
    //nothing
  }

  this.beweeg = function() {
    this.x += this.xspeed;
    this.y += this.yspeed;

    if (this.x > innerWidth - 20) {
      //code
    }
  }
}
