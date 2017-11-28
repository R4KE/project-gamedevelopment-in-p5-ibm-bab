let direction = 0;
let shot = 1;

function setup() {
  createCanvas(innerWidth - 20, innerHeight - 20);
  angleMode(RADIANS);
}


function player() {
  this.xPos = 100;
  this.yPos = 100;
  this.xbullet = 100;
  this.ybullet = 100;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.xbulletspd = 0;
  this.ybulletspd = 0;
  this.direction = 0;
  this.controls = function() {
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
    if (keyIsDown(32)) { //" "
        shot = 2;
        console.log(shot);
    }
    if (shot == 2) {
      this.xbulletspd -= Math.sin(direction);
      this.ybulletspd += Math.cos(direction);
    }//shoot
    if (keyIsDown(82)) { //r
      shot = 1;
      console.log(shot);
      this.xbulletspd = 0;
      this.ybulletspd = 0;
    }//reload
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
    this.xbullet += this.xbulletspd;//bullet
    this.ybullet += this.ybulletspd;//bullet
    this.xSpeed = this.xSpeed * 0.6;
    this.ySpeed = this.ySpeed * 0.6;
    this.xbullet = this.xbulletspd * 3;//bullet
    this.ybullet = this.ybulletspd * 3;//bullet
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

    //draw bullet
/*
    if(this.xbullet < innerWidth - 100 || this.xbullet > 100) {
      noStroke();
      fill(50);
      ellipse(this.xbullet, this.ybullet, 10, 10);// draw bullet
    }
*/
    //draw loop

    fill(219, 17, 17);
    stroke(20);
    rectMode(CORNER);
    rect(-5, 0, 10, 40);
    fill(250, 20, 20);
    ellipse(0, 0, 40, 40);
    pop();
  }
}

var Player = new player();

function draw() {
    background(255);
    fill(0, 255, 0);
    noStroke();
    Player.controls();
    Player.render();
}

// credits naar thijs voor wat game logics
