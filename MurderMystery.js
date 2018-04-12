var background;
var startButton;
var crimeBackground;
var canvasWidth = 800;
var canvasHeight = 600;
var sceneID = 0;

/* Gets called when page loads */
function startGame() {
  startButton = new component(315, 149, "assets/images/start_button.png", 250, 300, "image");
  background = new component(canvasWidth, canvasHeight, "assets/images/start_screen_background.jpg", 0, 0, "image");
  crimeBackground = new component(canvasWidth, canvasHeight, "assets/images/crime_scene.png", 0, 0, "image");
  myGameArea.start();
}

/* Sets up the canvas */
var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    
    /* Event listeners for mouse clicks or touches */
    window.addEventListener('mousedown', function (e) {
      myGameArea.x = e.pageX;
      myGameArea.y = e.pageY;
    })
    window.addEventListener('mouseup', function (e) {
      myGameArea.x = false;
      myGameArea.y = false;
    })
    window.addEventListener('touchstart', function (e) {
      myGameArea.x = e.pageX;
      myGameArea.y = e.pageY;
    })
    window.addEventListener('touchend', function (e) {
      myGameArea.x = false;
      myGameArea.y = false;
    })
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }
}

/* Constructor for game components */
function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y; 
  this.update = function() {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;        
  }
  /* Checks if user clicks within the bounds of this component */
  this.clicked = function() {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var clicked = true;
    if ((mybottom < myGameArea.y) || (mytop > myGameArea.y)
     || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
        clicked = false;
    }
    return clicked;
  }
}

/* Draws a frame */
function updateGameArea() { 
  myGameArea.clear(); //clear canvas before each frame
  
  if (myGameArea.x && myGameArea.y) {
    if (startButton.clicked()) {
      //hide title screen, show crime scene
      console.log("clicked"); //TODO: button appears to be off-center (fix)
      sceneID = 1;
    }
  }
  switch (sceneID) {
    case 0: //start screen
      background.newPos();
      background.update();
      startButton.newPos();
      startButton.update();
      break;
    case 1:
      crimeBackground.newPos();
      crimeBackground.update();
  }

}