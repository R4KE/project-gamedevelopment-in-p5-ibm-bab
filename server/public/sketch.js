var socket;
var xcanvas = innerWidth - 20;
var ycanvas = innerHeight - 20;
var enemyplayers = [];
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
  for (i = 0; i < aantalplayers; i++) {
    x = random(20, 400);
    y = random(20, 400);
    enemyplayers.push(new Enemyplayer(x, y, "OTTO", 10, 10, 10));
  }
  otto = new Player(100, 100, prompt("Geef je nickname: "), 250, 20, 20)
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000/');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('pos',
    // When we receive data
    function(data) {
      console.log("pull: " + data.x + " " + data.y + " " + data.playerID);

      ex = data.x;
      ey = data.y;

      /*dx = data.x - x;
      dy = data.y - y;
      if (sqrt(dx*dx + dy*dy) <= 20){ //collision
        x = random(20, innerWidth - 70);
        x = Math.floor(x);
        y = random(20, innerHeight - 90);
        y = Math.floor(y);
        sendmouse(x,y,playerID);
        points++;
      }*/
    }
  );
}

function draw() {
  background(255);

  for (i = 0; i < aantalplayers; i++) {
    enemyplayers[i].teken()
  }

  otto.teken()

  textSize(12);
  fill(80, 80, 150);
  text(eplayerID, ex - eplayerID.length / 1.5 * 5, ey - 20);
  fill(180, 20, 20);
  text(playerID, x - playerID.length / 1.5 * 5, y - 20);

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
  }*/
}

// Function for sending to the socket
function sendmouse(xpos, ypos, playerName) {
  // We are sending!
  //console.log("push: " + xpos + " " + ypos + " " + playerName);

  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
    playerID: playerName
  };

  // Send that object to the socket
  socket.emit('pos',data);
}

function Enemyplayer(ex, ey, eplayerID, col1, col2, col3) {
    this.xPos = ex;
    this.yPos = ey;
    this.eID = eplayerID;
    this.red = col1;
    this.green = col2;
    this.blue = col3;

    this.teken = function() {
      fill(this.red, this.green, this.blue);
      noStroke();
      ellipse(this.xPos, this.yPos, 20, 20);
    }
}

function Player(_x, _y, playerID, col1, col2, col3) {
    this.xPos = _x;
    this.yPos = _y;
    this.eID = playerID;
    this.red = col1;
    this.green = col2;
    this.blue = col3;

    this.teken = function() {
      fill(this.red, this.green, this.blue);
      noStroke();
      ellipse(this.xPos, this.yPos, 20, 20);

      // Send the ball coordinates
      //if(x > 20) {
        if (keyIsDown(65)) {
            x -= speed;
            sendmouse(x,y,playerID);
            return false;
        }
      //}

      //if(x < xcanvas - 20) {
        if (keyIsDown(68)) {
            x += speed;
            sendmouse(x,y,playerID);
            return false;
        }
      //}

      //if(y > 20) {
        if (keyIsDown(87)) {
            y -= speed;
            sendmouse(x,y,playerID);
            return false;
        }
      //}

      //if(y < ycanvas - 20) {
        if (keyIsDown(83)) {
            y += speed;
            sendmouse(x,y,playerID);
            return false;
        }
      //}
    }
}
