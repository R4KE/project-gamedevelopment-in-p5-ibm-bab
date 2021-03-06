let direction = 0;
var bullets = [];
var bulletsshot = 0;
var cooldown = 0;
var cooldowntimer = 10;

function setup() {
  createCanvas(innerWidth - 20, innerHeight - 20);
  angleMode(RADIANS);
}


var Player = new player();

function draw() {
  background(255);

  fill(0, 255, 0);
  noStroke();
  Player.controls();
  Player.render();

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

  this.teken = function() {
      if(this.x < 0 || this.x > innerWidth || this.y < 0 || this.x > innerHeight) {
          this.x = 20;
          this.y = 20;
          this.xspeed = 0;
          this.yspeed = 0;
      }

      noStroke();
      fill(20);
      ellipse(this.x, this.y, this.straal, this.straal);
  }


  this.beweeg = function() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
}

// credits naar thijs voor wat game logics
