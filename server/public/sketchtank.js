var socket;
var xcanvas = innerWidth - 20;
var ycanvas = innerHeight - 20;
var players = [];
var speed = 3;
var x;
var y;
var dx;
var dy;
var ex;
var ey;
var points = 0;
var aantalplayers = 0;
var color;
var playerID = "YOU";
var eplayerID = "ENEMY";
var IDlength;
var eIDlength;
var direction = 0;
var edirection;
var bullets = [];
var bulletsshot = 0;
var cooldown = 0;
var cooldowntimer = 10;
var bulletspd = 5;

function setup() {
  createCanvas(xcanvas, ycanvas);
  angleMode(RADIANS);
  x = random(20, innerWidth - 70);
  x = Math.floor(x);
  y = random(20, innerHeight - 90);
  y = Math.floor(y);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://192.168.0.136:3000/');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('pos',
    // When we receive data
    function(data) {
      console.log("pull: " + data.x + " " + data.y + " " + data.playerID);
      // Draw a blue circle

      ex = data.x;
      ey = data.y;
      edirection = data.direction;

      dx = data.x - x;
      dy = data.y - y;
      if (sqrt(dx*dx + dy*dy) <= 20){
        x = random(20, innerWidth - 70);
        x = Math.floor(x);
        y = random(20, innerHeight - 90);
        y = Math.floor(y);
        sendmouse(x,y,direction,playerID);
        points++;
      }
    }
  );
}

var Player = new player();

//bullets.push(new Bullet(10, 10, 10, 3, 3));

function draw() {
  background(255);
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
    if (keyIsDown(32)) { //"space"
      if (cooldown > cooldowntimer){
        bulletsshot += 1;
        console.log("new bullet");
        bullets.push(new Bullet(this.xPos, this.yPos, 10, Math.sin(this.direction) * - bulletspd, Math.cos(this.direction) * bulletspd));
        cooldown = 0;
      }
      return false;
    } else {
      if (keyIsDown(65)) { //a
        this.direction -= 0.03;
        direction = this.direction;
        sendmouse(x,y,direction,playerID);
      }
      if (keyIsDown(68)) { //d
        this.direction += 0.03;
        direction = this.direction;
        sendmouse(x,y,direction,playerID);
      }
      if (keyIsDown(87)) { //w
        this.xSpeed -= Math.sin(this.direction);
        this.ySpeed += Math.cos(this.direction);
        x = this.xPos;
        y = this.yPos;
        sendmouse(x,y,direction,playerID);
      }
      if (keyIsDown(83)) { //s
        this.xSpeed += Math.sin(this.direction);
        this.ySpeed -= Math.cos(this.direction);
        x = this.xPos;
        y = this.yPos;
        sendmouse(x,y,direction,playerID);
      }
      if (keyIsDown(82)) { //r
        //code
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

  this.eRender = function() {
    stroke(20);
    fill(36, 104, 214);
    push();
    translate(ex,ey);
    rotate(edirection);
    rectMode(CENTER);
    rect(0, 0, 45, 60);
    noStroke();
    fill(36, 84, 214);
    rect(-16.5, 0.5, 10, 59)// left shadow
    rect(17.5, 0.5, 10, 59)// right shadow
    noStroke();
    fill(36, 84, 214);
    stroke(20);
    rectMode(CORNER);
    rect(-5, 0, 10, 40);
    fill(36, 104, 214);
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
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
}

function sendmouse(xpos, ypos, direction, playerName) {
  // We are sending!
  console.log("push: " + Math.floor(xpos) + " " + Math.floor(ypos) + " " + Math.floor(direction) + " " + playerName);

  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
    direction: direction,
    playerID: playerName
  };

  // Send that object to the socket
  socket.emit('pos',data);
}

/*
  fill(80, 80, 150);
  noStroke();
  ellipse(ex, ey, 20, 20);

  fill(180, 20, 20);
  noStroke();
  ellipse(x,y,20,20);
  // Send the ball coordinates
  if(x > 20) {
    if (keyIsDown(65)) {
        x -= speed;
        sendmouse(x,y,playerID);
        return false;
    }
  }

  if(x < xcanvas - 20) {
    if (keyIsDown(68)) {
        x += speed;
        sendmouse(x,y,playerID);
        return false;
    }
  }

  if(y > 20) {
    if (keyIsDown(87)) {
        y -= speed;
        sendmouse(x,y,playerID);
        return false;
    }
  }

  if(y < ycanvas - 20) {
    if (keyIsDown(83)) {
        y += speed;
        sendmouse(x,y,playerID);
        return false;
    }
  }
}

// Function for sending to the socket
function sendmouse(xpos, ypos, playerName) {
  // We are sending!
  console.log("push: " + xpos + " " + ypos + " " + playerName);

  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
    playerID: playerName
  };

  // Send that object to the socket
  socket.emit('pos',data);
}

function Enemyobject(ex, ey, eplayerID) {
    this.xPos = ex;
    this.yPos = ey;
    this.eID = eplayerID;

    this.teken = function() {
      fill(180, 20, 20);
      noStroke();
      ellipse(ex,ey,20,20);
    }
}
*/
