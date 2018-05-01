var canvasWidth = 1152; //16:9 resolution
var canvasHeight = 648; //16:9 resolution
var sceneID = 0;
var nextScene = 0;
var fadeAlpha = 0.0; // alpha value for fadeRect
var fadingOut = false;
var fadingIn = false;
var fadeColor = "rgba(0,0,0,0)";

/* game components */
var fadeRect; //covers canvas and changes alpha to create fading effects
var startBackground;
var startButton;
var startButtonWidth = .2*canvasWidth;
var startButtonHeight = .2*canvasHeight;
var introText1;
var introText2;
var introTextMap;
var introBackground;
var introMapButton;
var introMapButtonWidth = .2*canvasWidth;
var introMapButtonHeight = .2*canvasHeight;
var crimeBackground;

/* Gets called when page loads */
function startGame() {
  fadeRect = new component(canvasWidth, canvasHeight, fadeColor, 0, 0); 
  
  startBackground = new component(canvasWidth, canvasHeight, "assets/images/start_screen_background.png", 0, 0, "image");
  startButton = new component(startButtonWidth, startButtonHeight, "assets/images/start_button.png", canvasWidth/2 - startButtonWidth/2, canvasHeight/2 - startButtonHeight/2 + canvasHeight/3, "image");
  
  introBackground = new component(canvasWidth, canvasHeight, "assets/images/black.jpg", 0, 0, "image");
  introText1 = new component("50px", "Arial", "white", canvasWidth/9, canvasHeight/5, "text");
  introText1.text = "Trenton: 1939";
  introText2 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/3, "text");
  introText2.text = "Officer 1: Good evening Detective, I am afraid we have a problem on Duck Island,\nwe are going to need you to come down to headquarters right away.";
  introTextMap = new component("24px", "Arial", "white", canvasWidth/2 - 50, canvasHeight/2 + canvasHeight/5, "text");
  introTextMap.text = "View Map:";
  introMapButton = new component(introMapButtonWidth, introMapButtonHeight, "assets/images/map.jpg", canvasWidth/2 - introMapButtonWidth/2, canvasHeight/2 - introMapButtonHeight/2 + canvasHeight/3, "image");
  crimeBackground = new component(canvasWidth, canvasHeight, "assets/images/crime_scene.png", 0, 0, "image");
  myGameArea.start();
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
      fillTextMultiLine(ctx, this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  /* Draws the component with changing alpha values for fading out effect
   * Intended to be used only on the fadeRect component */
  this.fadeOut = function(scene_id) {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    console.log("fadeAlpha:"+fadeAlpha);
    color = "rgba(0,0,0," + fadeAlpha + ")";
    fadeAlpha = fadeAlpha + 0.01;
    if (fadeAlpha > 1.0) {
      fadingOut = false;
      sceneID = scene_id;
      fadingIn = true;
     }
  }
  /* Draws the component with changing alpha values for fading in effect 
   * Intended to be used only on the fadeRect component */
  this.fadeIn = function() {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    console.log("fadeAlpha:"+fadeAlpha);
    color = "rgba(0,0,0," + fadeAlpha + ")";
    fadeAlpha = fadeAlpha - 0.01;
    if (fadeAlpha < 0.0) {
      fadingIn = false;
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

/**** Helper Functions ****/

/* Converts document coordinates to coordinates relative to the canvas */
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

/* Draws text on multiple lines when separated by '\n' delimiter */
function fillTextMultiLine(ctx, text, x, y) {
  var lineHeight = ctx.measureText("M").width * 1.2;
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    ctx.fillText(lines[i], x, y);
    y += lineHeight;
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
  introBackground.newPos();
  introBackground.update();
  introText1.newPos();
  introText1.update();
  introText2.newPos();
  introText2.update();
  introTextMap.newPos();
  introTextMap.update();
  introMapButton.newPos();
  introMapButton.update();
}

function drawScene2() {
  crimeBackground.newPos();
  crimeBackground.update();
}

function fadeOutScene() {
  fadeRect.fadeOut(nextScene);
}

function fadeInScene() {
  fadeRect.fadeIn();
}

/* Draws a frame */
function updateGameArea() { 
  myGameArea.clear(); //clear canvas before each frame
  
  /* Check for user actions */
  if (myGameArea.mousePos.x && myGameArea.mousePos.y) {
    if (startButton.clicked()) {
      /* fade scene 0 to next scene */
      if (!fadingOut && !fadingIn && sceneID == 0) {
        fadingOut = true;
        nextScene = 1;
      }
    }
    if (introTextMap.clicked()) {
      if (!fadingOut && !fadingIn && sceneID == 1) {
        fadingOut = true;
        nextScene = 2;
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
        drawScene0();
        fadeOutScene();
      }
      break;
    case 1: //intro scene
      if (!fadingOut && !fadingIn) {
        drawScene1();
      }
      else if (fadingOut) {
        drawScene1();
        fadeOutScene();
      }
      else if (fadingIn) {
        drawScene1();
        fadeInScene();
      }
      break;
    case 2: //crime scene
      if (!fadingOut && !fadingIn) {
        drawScene2();
      }
      else if (fadingIn) {
        drawScene2();
        fadeInScene();
      }
      break;
  }
}