var socket;
var xcanvas = innerWidth - 20;
var ycanvas = innerHeight - 20;
var players = [];
var speed = 6;
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

function setup() {
  createCanvas(xcanvas, ycanvas);
  x = random(20, innerWidth - 70);
  x = Math.floor(x);
  y = random(20, innerHeight - 90);
  y = Math.floor(y);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000/');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('pos',
    // When we receive data
    function(data) {
      console.log("pull: " + data.x + " " + data.y + " " + data.playerID);
      // Draw a blue circle

      ex = data.x;
      ey = data.y;

      dx = data.x - x;
      dy = data.y - y;
      if (sqrt(dx*dx + dy*dy) <= 20){
        x = random(20, innerWidth - 70);
        x = Math.floor(x);
        y = random(20, innerHeight - 90);
        y = Math.floor(y);
        sendmouse(x,y,playerID);
        points++;
      }
    }
  );
}

function draw() {
  background(255);

  //IDlength = playerID.
  //eIDlength = len(eplayerID);

  textSize(12);
  fill(80, 80, 150);
  text(eplayerID, ex - eplayerID.length / 1.5 * 5, ey - 20);
  fill(180, 20, 20);
  text(playerID, x - playerID.length / 1.5 * 5, y - 20);

  if (x < 0){
    points--;
    console.log("je bent uit het veld");
  }

  if (y < 0){
    points--;
    console.log("je bent uit het veld");
  }

  if (x > xcanvas){
    points--;
    console.log("je bent uit het veld");
  }

  if (y > ycanvas){
    points--;
    console.log("je bent uit het veld");
  }

  if (points < 0){
    points = 0;
  }

  if (points < 5){
      textSize(70);
      fill(0);
      text(points, 50, 80);
    } else {
      textSize(70);
      fill(0);
      text("WIN", 50, 80);
    }


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
