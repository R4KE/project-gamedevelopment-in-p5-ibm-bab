var xSize = window.innerWidth - 20;
var ySize = window.innerHeight - 20;
var width = 200;
var height = 200;
var score = 0;
var rotspeed = 5;
var rot = 1;
var blaster = new Audio('assets/blaster.mp3');
var win = new Audio('assets/win.mp3');
var gameover = new Audio('assets/gameover.mp3');
var gun = new Audio('assets/gun.mp3');

pl = new Player();

function setup(){
  createCanvas(xSize, ySize);
  kleur1 = random(1, 255);
  kleur2 = random(1, 255);
  kleur3 = random(1, 255);
  kleur4 = random(1, 255);
}

function draw() {
  background(255);
  noStroke();
  textSize(72);
  textAlign(CENTER);
  textAlign(TOP);
  if (score < 100) {
  text(score, width/2, height/2);
  }
  else{
    text("perfect score!", width/2, height/2);
  }
  if(score == 100) {
    win.play();
  }
  noStroke();
  //var axis = (this.xpos+this.radius/2, this.ypos+this.radius/2);
  //rotate(rot,[axis]);
  pl.display();
  var rots = rots + rotspeed;
  pl.move();
  pl.rotate(rots);
}

function Player() {
  this.playerHeight = 40;
  this.playerWidth = 10;
  this.radius = 20;
  this.xpos = -this.radius/2;
  this.ypos = -this.radius/2;
  this.speed = 2;

  this.display = function() {
    fill(127, 255, 0);
    rect(this.xpos, this.ypos, 2*this.radius, 2*this.radius);
  }



  this.move = function() {
      if (keyIsDown(32)){
        gun.play();
      }
      else if (keyIsDown(87)){
        this.ypos -= this.speed;
        score += 1;
      }
      else if (keyIsDown(83)){
        this.ypos += this.speed;
        score += 1;
      }
      else if (keyIsDown(65)){
        rot = rot - rotspeed
        score += 1;
      }
      else if (keyIsDown(68)){
        rot = rot + rotspeed
        score += 1;
      }
      else if (keyIsDown(32)){
        console.log("test");
        kleur1 = random(1, 255);
        kleur2 = random(1, 255);
        kleur3 = random(1, 255);
        kleur4 = random(1, 255);
      }
      if (this.xpos > xSize){
        this.xpos = xSize
      }
      else if (this.ypos > ySize){
        this.ypos = ySize
      }

  }
}
