var canvasWidth = 1024; //16:9 resolution
var canvasHeight = 576; //16:9 resolution
var gameStates = Object.freeze({"intro":1, "sheriff_debrief":2, "visited_crimescene":3, "visited_suspects":4}); //game states enum
var gameState = gameStates.intro; //used to keep track of player progress
var sceneID = 0;
var nextScene = 0;
var mapState = 0; //used to determine what to draw on map depending on when the player visits it.
var currentDialogue = 1; //used to track what dialogue is being displayed
var mouseUp = true; //manual check for mouseup or touchend event
var fadeAlpha = 0.0; // alpha value for fadeRect
var fadingOut = false;
var fadingIn = false;
var fadeColor = "rgba(0,0,0,0)";

/* game components */
var fadeRect; //covers canvas and changes alpha to create fading effects
var dialogueBox;
var startBackground;
var startButton;
var startButtonWidth = .2*canvasWidth;
var startButtonHeight = .2*canvasHeight;
var introBackground;
var introText1;
var introText2;
var introTextMap;
var introMapButton;
var introMapButtonWidth = .2*canvasWidth;
var introMapButtonHeight = .2*canvasHeight;
var mapBackground;
var mapStationIcon;
var mapIconWidth = .2*canvasWidth;
var mapIconHeight = .2*canvasHeight;
var stationBackground;
var sheriffText1;
var returnToMapButton;
var returnToMapButtonWidth = .2*canvasWidth;
var returnToMapButtonHeight = .1*canvasHeight;
var returnToMapText;
var mapDuckIcon;
var crimeBackground;
var crimeText1;
var crimeText2;
var crimeText3;
var crimeText4;
var crimeText5;
var crimeText6;
var crimeText7;
var mapMyatovichIcon;
var mapTonzilloIcon;
var mapHillIcon;

/* Gets called when page loads. Instantiate game components here. */
function startGame() {
  fadeRect = new component(canvasWidth, canvasHeight, fadeColor, 0, 0); 
  dialogueBox = new component(canvasWidth, canvasHeight/3, "assets/images/000000-0.5.png", 0, canvasHeight - canvasHeight/3, "image");
  
  /* Start scene */
  startBackground = new component(canvasWidth, canvasHeight, "assets/images/start_screen_background.png", 0, 0, "image");
  startButton = new component(startButtonWidth, startButtonHeight, "assets/images/start_button.png", canvasWidth/2 - startButtonWidth/2, canvasHeight/2 - startButtonHeight/2 + canvasHeight/3, "image");
  
  /* Intro scene */
  introBackground = new component(canvasWidth, canvasHeight, "assets/images/black.jpg", 0, 0, "image");
  introText1 = new component("50px", "Arial", "white", canvasWidth/9, canvasHeight/5, "text");
  introText1.text = "Trenton: 1939";
  introText2 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/3, "text");
  introText2.text = "Officer 1:\nGood evening Detective, I'm afraid we have a problem on Duck Island,\nwe're going to need you to come down to headquarters right away.";
  introTextMap = new component("24px", "Arial", "white", canvasWidth/2 - 50, canvasHeight/2 + canvasHeight/5, "text");
  introTextMap.text = "View Map:";
  introMapButton = new component(introMapButtonWidth, introMapButtonHeight, "assets/images/map.jpg", canvasWidth/2 - introMapButtonWidth/2, canvasHeight/2 - introMapButtonHeight/2 + canvasHeight/3, "image");
  
  /* Map scene */
  mapBackground = new component(canvasWidth, canvasHeight, "assets/images/map_inverted.jpg", 0, 0, "image");
  mapStationIcon = new component(mapIconWidth, mapIconHeight, "assets/images/pd.png", canvasWidth/4, canvasHeight/2 + canvasHeight/6, "image");
  mapDuckIcon = new component(mapIconWidth*.8, mapIconWidth*.8, "assets/images/duck_island_icon.png", canvasWidth/3, canvasHeight/20, "image");
  mapMyatovichIcon = new component(mapIconHeight*.9, mapIconHeight*.9, "assets/images/house.png", canvasWidth/9, canvasHeight/3, "image");
  mapTonzilloIcon = new component(mapIconHeight*.9, mapIconHeight*.9, "assets/images/house.png", canvasWidth/2, canvasHeight/2.2, "image");
  mapHillIcon = new component(mapIconHeight*.9, mapIconHeight*.9, "assets/images/house.png", canvasWidth - canvasWidth/7, canvasHeight/6, "image");
  
  /* Police station scene */
  stationBackground = new component(canvasWidth, canvasHeight, "assets/images/station_scene_background.jpg", 0, 0, "image");
  sheriffText1 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  sheriffText1.text = "Sheriff:\nThank you for coming down so quickly, Detective, I regret to inform you,\nthere has been a murder.  A young couple from the Trenton area have been\nbrutally killed on Lover’s Lane down at Duck Island.\n\nIt’s your job to go down there and investigate what happened."
  returnToMapButton = new component(returnToMapButtonWidth, returnToMapButtonHeight, "assets/images/crystal-button.png", canvasWidth/12, canvasHeight/20, "image");
  returnToMapText = new component("24px", "Arial", "black", canvasWidth/10, canvasHeight/9, "text");
  returnToMapText.text = "[Return to map]";
  
  /* Crime scene */
  crimeBackground = new component(canvasWidth, canvasHeight, "assets/images/duckisland.jpg", 0, 0, "image");
  crimeText1 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  crimeText1.text = "Officer 2:\nIt appears our victims were a young couple named Vincenzo 'Jim'\nTonzillo and Mary Myatovich. Jim was a 20-year-old man married,\nhaving an affair with Mary Myatovich. And Mary Myatovich was a 15-year-old girl.\nShe was unmarried.";
  crimeText2 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  crimeText2.text = "You:\nThat is so terrible, who would want to do a thing like this to an innocent couple?";
  crimeText3 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  crimeText3.text = "Officer 2:\nWell detective, we have a few leads, Mary Myatovich father found out about\nher affair and was furious, he refused to let her out of the house at night.";
  crimeText4 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  crimeText4.text = "Officer 2:\nMrs. Tonzillo is also a possible suspect. She is the wife, pregnant\nwith Mr. Tonzillo’s child and recently found out about their affair.";
  crimeText5 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  crimeText5.text = "Officer 2:\nLastly, Clarence Hill was a married man who was a coworker of Jim’s.\nHe is a laborer who worked the same shift as Jim. He often had to listen to\nJim brag about his affair.Hill is a very Christian man who did not approve\nof how Jim was sneaking around his wife.";
  crimeText6 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  crimeText6.text = "You:\nThank you for all that information, I will keep that in mind when I investigate\nfurther. Now, if you will excuse me, I am going to search for evidence.";
  crimeText7 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  crimeText7.text = "Officer 2:\nNo problem Detective, good luck.";
  
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
      mouseUp = true;
    })
    window.addEventListener('touchstart', function (evt) {
      myGameArea.mousePos = getMousePos(document.getElementById("canvas"), evt);
      console.log("touch: "+ myGameArea.mousePos.x);
    })
    window.addEventListener('touchend', function (evt) {
      myGameArea.mousePos.x = false;
      myGameArea.mousePos.y = false;
      mouseUp = true;
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
  mapBackground.newPos();
  mapBackground.update();
  
  switch(mapState) {
    case 0:
      mapStationIcon.newPos();
      mapStationIcon.update();
      break;
    case 1:
      mapStationIcon.newPos();
      mapStationIcon.update();
      mapDuckIcon.newPos();
      mapDuckIcon.update();
      break;
    case 2:
      mapStationIcon.newPos();
      mapStationIcon.update();
      mapDuckIcon.newPos();
      mapDuckIcon.update();
      mapMyatovichIcon.newPos();
      mapMyatovichIcon.update();
      mapTonzilloIcon.newPos();
      mapTonzilloIcon.update();
      mapHillIcon.newPos();
      mapHillIcon.update();
  }
}

function drawScene3() {
  stationBackground.newPos();
  stationBackground.update();
  dialogueBox.newPos();
  dialogueBox.update();
  sheriffText1.newPos();
  sheriffText1.update();
  returnToMapButton.newPos();
  returnToMapButton.update();
  returnToMapText.newPos();
  returnToMapText.update();
}

function drawScene4() {
  crimeBackground.newPos();
  crimeBackground.update();
  
  switch(currentDialogue) {
    case 1:
      dialogueBox.newPos();
      dialogueBox.update();
      crimeText1.newPos();
      crimeText1.update();
      break;
    case 2:
      dialogueBox.newPos();
      dialogueBox.update();
      crimeText2.newPos();
      crimeText2.update();
      break;
    case 3:
      dialogueBox.newPos();
      dialogueBox.update();
      crimeText3.newPos();
      crimeText3.update();
      break;
    case 4:
      dialogueBox.newPos();
      dialogueBox.update();
      crimeText4.newPos();
      crimeText4.update();
      break;
    case 5:
      dialogueBox.newPos();
      dialogueBox.update();
      crimeText5.newPos();
      crimeText5.update();
      break;
    case 6:
      dialogueBox.newPos();
      dialogueBox.update();
      crimeText6.newPos();
      crimeText6.update();
      break;
    case 7:
      dialogueBox.newPos();
      dialogueBox.update();
      crimeText7.newPos();
      crimeText7.update();
      break;
    case 8:
      returnToMapButton.newPos();
      returnToMapButton.update();
      returnToMapText.newPos();
      returnToMapText.update();
      break;
  }
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
  
  if (gameState == gameStates.sheriff_debrief) {
    mapState = 1;
  }
  else if (gameState == gameStates.visited_crimescene) {
    mapState = 2;
  }
  
  /* Check for user actions */
  if (myGameArea.mousePos.x && myGameArea.mousePos.y) {
    if (startButton.clicked()) {
      /* fade start scene to next scene */
      if (!fadingOut && !fadingIn && sceneID == 0) {
        fadingOut = true;
        nextScene = 1;
      }
    }
    if (introTextMap.clicked()) {
      /* fade intro scene to next scene */
      if (!fadingOut && !fadingIn && sceneID == 1) {
        fadingOut = true;
        nextScene = 2;
      }
    }
    if (mapStationIcon.clicked()) {
      /* fade map scene to police station scene */
      if (!fadingOut && !fadingIn && sceneID == 2) {
        fadingOut = true;
        nextScene = 3;
      }
    }
    if (returnToMapButton.clicked()) {
      /* fade police station scene to map scene */
      if (!fadingOut && !fadingIn && sceneID == 3) {
        fadingOut = true;
        nextScene = 2;
        if (gameState == gameStates.intro) {
          gameState = gameStates.sheriff_debrief;
        }
      }
      if (!fadingOut && !fadingIn && sceneID == 4) {
        fadingOut = true;
        nextScene = 2;
        gameState = gameStates.visited_crimescene;
      }
    }
    if (mapDuckIcon.clicked()) {
      /* fade map scene to crime scene */
      if (!fadingOut && !fadingIn && sceneID == 2 && (gameState == gameStates.sheriff_debrief || gameState == gameStates.visited_crimescene)) {
        fadingOut = true;
        nextScene = 4;
      } 
    }
    if (dialogueBox.clicked()) {
      /* Display next block of text */
      if (!fadingOut && !fadingIn && sceneID == 4 && mouseUp) {
        if (currentDialogue < 8) {
          currentDialogue++;
          mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
        }
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
    case 2: //map scene
      if (!fadingOut && !fadingIn) {
        drawScene2();
      }
      else if (fadingOut) {
        drawScene2();
        fadeOutScene();
      }
      else if (fadingIn) {
        drawScene2();
        fadeInScene();
      }
      break;
    case 3: //police station scene
      if (!fadingOut && !fadingIn) {
        drawScene3();
      }
      else if (fadingOut) {
        drawScene3();
        fadeOutScene();
      }
      else if (fadingIn) {
        drawScene3();
        fadeInScene();
      }
      break;
    case 4: //crime scene
      if (!fadingOut && !fadingIn) {
        drawScene4();
      }
      else if (fadingOut) {
        drawScene4();
        fadeOutScene();
      }
      else if (fadingIn) {
        drawScene4();
        fadeInScene();
      }
      break;
  }
}