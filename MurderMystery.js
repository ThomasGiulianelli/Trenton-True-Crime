var canvasWidth = 1152;
var canvasHeight = 648;
var sceneID = 0;
var nextScene = 0;
var ga = 1.0; //global alpha
var fadingOut = false;
var fadingIn = false;

/* game components */
var startBackground;
var startButton;
var startButtonWidth = .2*canvasWidth;
var startButtonHeight = .2*canvasHeight;
//var startText;
var crimeBackground;

/* Gets called when page loads */
function startGame() {
  startButton = new component(startButtonWidth, startButtonHeight, "assets/images/start_button.png", canvasWidth/2 - startButtonWidth/2, canvasHeight/2 - startButtonHeight/2 + canvasHeight/3, "image");
  //startText = new component("50px", "Arial", "black", canvasWidth/3, canvasHeight/3, "text");
  //startText.text = "True Crime: Trenton";
  startBackground = new component(canvasWidth, canvasHeight, "assets/images/start_screen_background.png", 0, 0, "image");
  crimeBackground = new component(canvasWidth, canvasHeight, "assets/images/crime_scene.png", 0, 0, "image");
  myGameArea.start();
}

/* Converts document coordinates to coordinates relative to the canvas */
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  mousePos : false,
  /* Sets up the canvas */
  start : function() {
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    myGameArea.canvas.id = "canvas"; // assign the canvas element an id 
    this.interval = setInterval(updateGameArea, 10); //execute updateGameArea every 10 ms
    
    /* Event listeners for mouse clicks or touches */
    window.addEventListener('mousedown', function (evt) {
      myGameArea.mousePos = getMousePos(document.getElementById("canvas"), evt);
    })
    window.addEventListener('mouseup', function (evt) {
      myGameArea.mousePos.x = false;
      myGameArea.mousePos.y = false;
    })
    window.addEventListener('touchstart', function (evt) {
      myGameArea.mousePos = getMousePos(document.getElementById("canvas"), evt);
      console.log("touch: "+ myGameArea.mousePos.x);
    })
    window.addEventListener('touchend', function (evt) {
      myGameArea.mousePos.x = false;
      myGameArea.mousePos.y = false;
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
  /* Draws the component */
  this.update = function() {
    ctx = myGameArea.context;
    if (this.type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  /* Draws the component with changing alpha values for fading out effect */
  this.fadeOut = function(scene_id) {
    //ctx = myGameArea.context;
    if (this.type == "image") {
      //ctx.save();
      ctx.globalAlpha = ga; //change the global alpha so that the image is drawn with that opacity
      console.log("ga:"+ga);
      this.image = new Image();
      this.image.onload = () => {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      };
      this.image.src = color;
      //ctx.restore();
      
      ga = ga - 0.01;
      if (ga <= 0.0) {
        
        fadingOut = false;
        sceneID = scene_id;
        fadingIn = true;
      }
    }
  }
  /* Draws the component with changing alpha values for fading in effect */
  this.fadeIn = function() {
    //ctx = myGameArea.context;
    if (this.type == "image") {
      //ctx.save();
      ctx.globalAlpha = ga; //change the global alpha so that the image is drawn with that opacity
      console.log("ga:"+ga);
      this.image = new Image();
      this.image.onload = () => {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
      this.image.src = color;
      //ctx.restore();
      
      ga = ga + 0.01;
      if (ga > 1.0) {
        ga = 1.0;
        fadingIn = false;
      }
    }
  }
  /* Updates component position on canvas */
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
    if ((mybottom < myGameArea.mousePos.y) || (mytop > myGameArea.mousePos.y)
     || (myright < myGameArea.mousePos.x) || (myleft > myGameArea.mousePos. x)) {
        clicked = false;
    }
    return clicked;
  }
}

/**** Drawing Functions ****/
function drawScene0() {
  startBackground.newPos();
  startBackground.update();
  startButton.newPos();
  startButton.update();
}
function drawScene1() {
  crimeBackground.newPos();
  crimeBackground.update();
}

function fadeOutScene0() {
  //ctx.save();
  startBackground.fadeOut(nextScene);
  //ctx.restore();
}
function fadeInScene1() {
  //ctx.save();
  crimeBackground.fadeIn();
  //ctx.restore();
}

/* Draws a frame */
function updateGameArea() { 
  myGameArea.clear(); //clear canvas before each frame
  
  if (myGameArea.mousePos.x && myGameArea.mousePos.y) {
    if (startButton.clicked()) {
      //fade to next scene
      if (!fadingOut && !fadingIn && sceneID == 0) {
        fadingOut = true;
        nextScene = 1;
      }
    }
  }
  
  /* Draw the current scene */
  switch (sceneID) {
    case 0: //start screen
      if (!fadingOut && !fadingIn) {
        drawScene0();
      }
      else if (fadingOut) {
        fadeOutScene0();
      }
      break;
    case 1: //crime scene
      if (!fadingOut && !fadingIn) {
        console.log("draw");
        drawScene1();
      }
      else if (fadingIn) {
        fadeInScene1();
      }
  }
}