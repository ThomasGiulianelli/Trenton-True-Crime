var canvasWidth = 1024; //16:9 resolution
var canvasHeight = 576; //16:9 resolution
var gameStates = Object.freeze({"intro":1, "sheriff_debrief":2, "visited_crimescene":3, "visited_suspects":4, "epilogue":5}); //game states enum
var gameState = gameStates.intro; //used to keep track of player progress
var sceneID = 0;
var nextScene = 0;
var mapState = 0; //used for determining what to draw on map, depends on when the player visits it.
var displayReturn = false; //used for controlling whether or not the returnToMapButton should be displayed
var displayMagnify = false; //used for controlling whether or not the magnifying glass icon should be displayed
var inventoryOpen = false; //used for checking if inventory should be displayed
var descriptionIsOpen = false; //used for checking if description is being displayed
var acquiredCrimeEvidence1 = false; //used for displaying crime evidence 1 in the inventory
var acquiredCrimeEvidence2 = false; //used for displaying crime evidence 2 in the inventory
var acquiredMyatovichEvidence1 = false; //used for displaying myatovich evidence 1 in the inventory
var acquiredMyatovichEvidence2 = false; //used for displaying myatovich evidence 2 in the inventory
var acquiredTonzilloEvidence1= false; //used for displaying tonzillo evidence 1 in the inventory
var acquiredTonzilloEvidence2 = false; //used for displaying tonzillo evidence 2 in the inventory
var acquiredHillEvidence1 = false; //used for displaying hill evidence 1 in the inventory
var acquiredHillEvidence2 = false; //used for displaying hill evidence 2 in the inventory
var sheriffDialogue = 1; //used for tracking what dialogue is being displayed
var officerDialogue = 1; //used for tracking what dialogue is being displayed
var myatovichDialogue = 1; //used for tracking what dialogue is being displayed
var tonzilloDialogue = 1; //used for tracking what dialogue is being displayed
var hillDialogue = 1; //used for tracking what dialogue is being displayed
var evidence1 = 0; //used for tracking what evidence description is being displayed. Applies to one piece of evidence per scene.
var evidence2 = 0; //used for tracking what evidence description is being displayed. Applies to one piece of evidence per scene.
var playerChoice = 0; //used for checking if the player chose the correct supsect
var mouseUp = true; //manual check for mouseup or touchend event
var fadeAlpha = 0.0; // alpha value for fadeRect
var fadingOut = false;
var fadingIn = false;
var fadeColor = "rgba(0,0,0,0)";

/* game components */
var fadeRect; //covers canvas and changes alpha to create fading effects
var dialogueBox;
var descriptionBox1;
var descriptionBox2;
var descriptionBox3;
var descriptionBox4;
var descriptionBox5;
var descriptionBox6;
var descriptionBox7;
var descriptionBox8;
var descriptionBoxWidth = canvasWidth - canvasWidth/4;
var descriptionBoxHeight = canvasHeight - canvasHeight/4;
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
var sheriffText2;
var sheriffText3;
var sheriffText4;
var sheriffText5;
var returnToMapButton;
var returnToMapButtonWidth = .2*canvasWidth;
var returnToMapButtonHeight = .1*canvasHeight;
var returnToMapText;
var magnifyingIcon;
var inventory;
var mapDuckIcon;
var crimeBackground;
var crimeEvidence1;
var crimeEvidence2;
var evidenceWidthSmall = canvasWidth/9;
var evidenceHeightSmall = canvasHeight/9;
var evidenceWidthLarge = canvasWidth/7;
var evidenceHeightLarge = canvasHeight/7;
var crimeEvidenceText1;
var crimeEvidenceText2;
var crimeText1;
var crimeText2;
var crimeText3;
var crimeText4;
var crimeText5;
var crimeText6;
var crimeText7;
var mapMyatovichIcon;
var myatovichBackground;
var myatovichText1;
var myatovichSuspect;
var myatovichEvidence1;
var myatovichEvidence2;
var myatovichEvidenceText1;
var myatovichEvidenceText2;
var mapTonzilloIcon;
var tonzilloBackground;
var tonzilloText1;
var tonzilloSuspect;
var tonzilloEvidence1;
var tonzilloEvidence2;
var tonzilloEvidenceText1;
var tonzilloEvidenceText2;
var mapHillIcon;
var hillBackground;
var hillText1;
var hillSuspect;
var hillEvidence1;
var hillEvidence2;
var hillEvidenceText1;
var hillEvidenceText2;
var suspectWidth = canvasWidth/4;
var suspectHeight = canvasHeight/3;
var choiceBox1;
var choiceBox2;
var choiceBox3;
var choiceBoxWidth = canvasWidth - canvasWidth/4;
var choiceBoxHeight = canvasHeight/5;
var choiceBoxText1;
var choiceBoxText2;
var choiceBoxText3;
var choiceSeparator1;
var choiceSeparator2;
var choiceMyatovichSuspect;
var choiceTonzilloSuspect;
var choiceHillSuspect;
var epilogueBackground;
var epilogueText1;
var epilogueButton1;
var epilogueButton2;
var epilogueButtonWidth = 335;
var epilogueButtonHeight = 43;

/* Gets called when page loads. Instantiate game components here. */
function startGame() {
  fadeRect = new component(canvasWidth, canvasHeight, fadeColor, 0, 0); 
  dialogueBox = new component(canvasWidth, canvasHeight/3, "assets/images/000000-0.5.png", 0, canvasHeight - canvasHeight/3, "image");
  descriptionBox1 = new component(descriptionBoxWidth, descriptionBoxHeight, "assets/images/000000-0.5.png", canvasWidth/2 - descriptionBoxWidth/2, canvasHeight/2 - canvasHeight/3, "image");
  descriptionBox2 = new component(descriptionBoxWidth, descriptionBoxHeight, "assets/images/000000-0.5.png", canvasWidth/2 - descriptionBoxWidth/2, canvasHeight/2 - canvasHeight/3, "image");
  descriptionBox3 = new component(descriptionBoxWidth, descriptionBoxHeight, "assets/images/000000-0.5.png", canvasWidth/2 - descriptionBoxWidth/2, canvasHeight/2 - canvasHeight/3, "image");
  descriptionBox4 = new component(descriptionBoxWidth, descriptionBoxHeight, "assets/images/000000-0.5.png", canvasWidth/2 - descriptionBoxWidth/2, canvasHeight/2 - canvasHeight/3, "image");
  descriptionBox5 = new component(descriptionBoxWidth, descriptionBoxHeight, "assets/images/000000-0.5.png", canvasWidth/2 - descriptionBoxWidth/2, canvasHeight/2 - canvasHeight/3, "image");
  descriptionBox6 = new component(descriptionBoxWidth, descriptionBoxHeight, "assets/images/000000-0.5.png", canvasWidth/2 - descriptionBoxWidth/2, canvasHeight/2 - canvasHeight/3, "image");
  descriptionBox7 = new component(descriptionBoxWidth, descriptionBoxHeight, "assets/images/000000-0.5.png", canvasWidth/2 - descriptionBoxWidth/2, canvasHeight/2 - canvasHeight/3, "image");
  descriptionBox8 = new component(descriptionBoxWidth, descriptionBoxHeight, "assets/images/000000-0.5.png", canvasWidth/2 - descriptionBoxWidth/2, canvasHeight/2 - canvasHeight/3, "image");
  returnToMapButton = new component(returnToMapButtonWidth, returnToMapButtonHeight, "assets/images/crystal-button.png", canvasWidth/12, canvasHeight/20, "image");
  returnToMapText = new component("24px", "Arial", "black", canvasWidth/10, canvasHeight/9, "text");
  returnToMapText.text = "[Return to map]";
  magnifyingIcon = new component(canvasHeight/5, canvasHeight/5, "assets/images/magnifying_glass.png", canvasWidth - canvasHeight/5, canvasHeight - canvasHeight/5, "image");
  inventory = new component(canvasWidth/4, canvasHeight - canvasHeight/5, "black", canvasWidth - canvasWidth/4, 0);
  
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
  stationBackground = new component(canvasWidth, canvasHeight, "assets/images/policestation.jpg", 0, 0, "image");
  sheriffText1 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  sheriffText1.text = "Sheriff:\nThank you for coming down so quickly, Detective, I regret to inform you,\nthere has been a murder.  A young couple from the Trenton area have been\nbrutally killed on Lover’s Lane down at Duck Island.\n\nIt’s your job to go down there and investigate what happened."
  sheriffText2 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  sheriffText2.text = "Sheriff:\nSo, detective, do you think you know who did it?";
  choiceSeparator1 = new component(choiceBoxWidth, choiceBoxHeight/20, "black", canvasWidth/2 - choiceBoxWidth/2, 2*choiceBoxHeight - choiceBoxHeight/20);
  choiceSeparator2 = new component(choiceBoxWidth, choiceBoxHeight/20, "black", canvasWidth/2 - choiceBoxWidth/2, 3*choiceBoxHeight - choiceBoxHeight/20);
  choiceBox1 = new component(choiceBoxWidth, choiceBoxHeight, "assets/images/000000-0.5.png", canvasWidth/2 - choiceBoxWidth/2, choiceBoxHeight, "image");
  choiceBoxText1 = new component("26px", "Arial", "white", canvasWidth/2, choiceBoxHeight + choiceBoxHeight/3, "text");
  choiceBoxText1.text = "Mr. Myatovich";
  choiceBox2 = new component(choiceBoxWidth, choiceBoxHeight, "assets/images/000000-0.5.png", canvasWidth/2 - choiceBoxWidth/2, 2*choiceBoxHeight, "image");
  choiceBoxText2 = new component("26px", "Arial", "white", canvasWidth/2, 2*choiceBoxHeight + choiceBoxHeight/3, "text");
  choiceBoxText2.text = "Mrs. Tonzillo";
  choiceBox3 = new component(choiceBoxWidth, choiceBoxHeight, "assets/images/000000-0.5.png", canvasWidth/2 - choiceBoxWidth/2, 3*choiceBoxHeight, "image");
  choiceBoxText3 = new component("26px", "Arial", "white", canvasWidth/2, 3*choiceBoxHeight + choiceBoxHeight/3, "text");
  choiceBoxText3.text = "Mr. Hill";
  sheriffText3 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  sheriffText3.text = "Sheriff:\nNot a bad guess, however the evidence isn't strong enough to\nconfirm Mr. Myatovich as the murderer. The culprit was likely\nsomeone else.";
  sheriffText4 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  sheriffText4.text = "Sheriff:\nNot a bad guess, however the evidence isn't strong enough to\nconfirm Mrs. Tonzillo as the murderer. The culprit was likely\nsomeone else.";
  sheriffText5 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  sheriffText5.text = "Sheriff:\nGreat work Detective! The evidence you collected is solid proof\nthat Mr. Hill is the murderer. Now we will be able to arrest him\nfor his crimes.";
  choiceMyatovichSuspect = new component(0.55*suspectWidth, 0.55*suspectHeight, "assets/images/suspectdad.png", canvasWidth/2 - choiceBoxWidth/3, 2*choiceBoxHeight - 0.55*suspectHeight, "image");
  choiceTonzilloSuspect = new component(0.55*suspectWidth, 0.55*suspectHeight, "assets/images/suspectwife.png", canvasWidth/2 - choiceBoxWidth/3, 3*choiceBoxHeight - 0.55*suspectHeight, "image");
  choiceHillSuspect = new component(0.55*suspectWidth, 0.55*suspectHeight, "assets/images/suspectkiller.png", canvasWidth/2 - choiceBoxWidth/3, 4*choiceBoxHeight - 0.55*suspectHeight, "image");
  
  /* Crime scene */
  crimeBackground = new component(canvasWidth, canvasHeight, "assets/images/duckisland.jpg", 0, 0, "image");
  crimeEvidence1 = new component(evidenceHeightSmall, evidenceHeightSmall, "assets/images/shotgun_shells.png", canvasWidth - canvasWidth/4, canvasHeight/2 + canvasHeight/6, "image");
  crimeEvidenceText1 = new component("24px", "Arial", "white", canvasWidth/6, canvasHeight/2 + canvasHeight/6, "text");
  crimeEvidenceText1.text = "A couple of spent shotgun shells. This tells us what\nweapon the murderer used.";
  crimeEvidence2 = new component(evidenceWidthLarge, evidenceHeightLarge, "assets/images/car.png", canvasWidth - canvasWidth/2, canvasHeight/2 + canvasHeight/10, "image");
  crimeEvidenceText2 = new component("24px", "Arial", "white", canvasWidth/6, canvasHeight/2 + canvasHeight/6, "text");
  crimeEvidenceText2.text = "The car in which the couple were killed. There is a handprint on\nthe side of the door. It could belong to the killer.";
  crimeText1 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  crimeText1.text = "Officer 2:\nIt appears our victims were a young couple named Vincenzo 'Jim'\nTonzillo and Mary Myatovich. Jim was a 20-year-old man married,\nhaving an affair with Mary Myatovich. And Mary Myatovich was a 15-year-old girl.\nShe was unmarried.";
  crimeText2 = new component("24px", "Arial", "white", canvasWidth/9, canvasHeight/2 + canvasHeight/4, "text");
  crimeText2.text = "You:\nThat is so terrible, who would do such a thing?";
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
  
  /* Myatovich suspect scene */
  myatovichBackground = new component(canvasWidth, canvasHeight, "assets/images/bedroom.jpg", 0, 0, "image");
  myatovichEvidence1 = new component(evidenceHeightSmall, evidenceHeightSmall, "assets/images/gift_and_card_sepia.png", canvasWidth/2 - canvasWidth/4, canvasHeight/2 - canvasHeight/5, "image");
  myatovichEvidenceText1 = new component("24px", "Arial", "white", canvasWidth/6, canvasHeight/2 + canvasHeight/6, "text");
  myatovichEvidenceText1.text = "A card and gift for Mr. Myatovich’s daughter. Her birthday\nwas in a few days. It is signed by Mr. Myatovich.";
  myatovichEvidence2 = new component(evidenceWidthSmall, evidenceHeightSmall, "assets/images/gloves.png", canvasWidth/2 + canvasWidth/4, canvasHeight/2 - canvasHeight/8, "image");
  myatovichEvidenceText2 = new component("24px", "Arial", "white", canvasWidth/6, canvasHeight/2 + canvasHeight/6, "text");
  myatovichEvidenceText2.text = "These are Mr. Myatovich’s leather gloves. They are about the\nsame size as the handprint found at the scene of the crime.";
  myatovichText1 = new component("24px", "Arial", "white", canvasWidth/5, canvasHeight/2 + canvasHeight/4, "text");
  myatovichText1.text = "Mr. Myatovich:\nSure, I was upset, but I would never hurt my little girl.";
  myatovichSuspect = new component(suspectWidth, suspectHeight, "assets/images/suspectdad.png", 0, canvasHeight - suspectHeight, "image");
  
  /* Tonzillo suspect scene */
  tonzilloBackground = new component(canvasWidth, canvasHeight, "assets/images/room.jpg", 0, 0, "image");
  tonzilloEvidence1 = new component(evidenceWidthSmall, evidenceHeightSmall, "assets/images/shoes.png", canvasWidth - canvasWidth/5, canvasHeight - canvasHeight/3, "image");
  tonzilloEvidenceText1 = new component("24px", "Arial", "white", canvasWidth/6, canvasHeight/2 + canvasHeight/6, "text");
  tonzilloEvidenceText1.text = "These are Mrs. Tonzillo’s shoes. They are covered in mud, much\nlike the mud that surrounds Duck Island.";
  tonzilloEvidence2 = new component(evidenceHeightSmall, evidenceHeightSmall, "assets/images/wedding_ring.png", canvasWidth/3 + canvasWidth/15, canvasHeight/2 + evidenceHeightSmall/2, "image");
  tonzilloEvidenceText2 = new component("24px", "Arial", "white", canvasWidth/5, canvasHeight/2 + canvasHeight/8, "text");
  tonzilloEvidenceText2.text = "This is Mrs. Tonzillo’s wedding ring. She was still wearing\nit when we arrived questioned her.";
  tonzilloText1 = new component("24px", "Arial", "white", canvasWidth/5, canvasHeight/2 + canvasHeight/4, "text");
  tonzilloText1.text = "Mrs. Tonzillo:\nI was shocked to find out Jim was cheating on me, especially\nbecause I’m pregnant with his child. But, I couldn’t have killed him,\nI’m not strong enough nor do I have the stomach to deal with blood.";
  tonzilloSuspect = new component(suspectWidth, suspectHeight, "assets/images/suspectwife.png", 0, canvasHeight - suspectHeight, "image");
  
  /* Hill suspect scene */
  hillBackground = new component(canvasWidth, canvasHeight, "assets/images/factory.jpg", 0, 0, "image");
  hillEvidence1 = new component(evidenceWidthSmall, evidenceHeightSmall, "assets/images/work-schedule.jpg", canvasWidth - canvasWidth/5, canvasHeight/2 - evidenceHeightSmall, "image");
  hillEvidenceText1 = new component("24px", "Arial", "white", canvasWidth/6, canvasHeight/2 + canvasHeight/6, "text");
  hillEvidenceText1.text = "This is Mr. Hill’s work schedule. He told us he was working the\nnight of the murder, but according to this he was off that day.";
  hillEvidence2 = new component(evidenceHeightSmall, evidenceHeightSmall, "assets/images/diary.png", evidenceHeightSmall, canvasHeight/2, "image");
  hillEvidenceText2 = new component("24px", "Arial", "white", canvasWidth/5, canvasHeight/2 + canvasHeight/8, "text");
  hillEvidenceText2.text = "This is Mr. Hill’s personal journal. There are a few entries in it\nthat talk about the victim, Jim, in a poor light. One quote reads\n“Jim didn’t stop talking about how he is cheating on his wife\nwith another woman today. The other woman is years\nyounger than him and his poor wife is pregnant. He keeps\nbragging about it as if I want to know his business. His whole\nlifestyle is against God if you ask me.”";
  hillText1 = new component("24px", "Arial", "white", canvasWidth/5, canvasHeight/2 + canvasHeight/4, "text");
  hillText1.text = "Mr. Hill:\nYeah, I worked with Jim, he was a fine guy and all,\nhe just talked about himself mostly. But, I couldn’t have done\nthe murder, I was down at the factory when it happened.";
  hillSuspect = new component(suspectWidth, suspectHeight, "assets/images/suspectkiller.png", 0, canvasHeight - suspectHeight, "image");
  
  /* Epilogue scene */
  epilogueBackground = new component(canvasWidth, canvasHeight, "assets/images/black.jpg", 0, 0, "image");
  epilogueText1 = new component("50px", "Arial", "white",  canvasWidth/9, canvasHeight/5, "text");
  epilogueText1.text = "Epilogue";
  epilogueButton1 = new component(epilogueButtonWidth, epilogueButtonHeight, "assets/images/button_read-article-about-the-murders.png", canvasWidth/2 - epilogueButtonWidth/2, canvasHeight/2 - canvasHeight/8, "image");
  epilogueButton2 = new component(epilogueButtonWidth, epilogueButtonHeight, "assets/images/button_credits.png", canvasWidth/2 - epilogueButtonWidth/2, canvasHeight/2 + canvasHeight/8, "image");
  
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
      myGameArea.mousePos = getTouchPos(document.getElementById("canvas"), evt);
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

/* Converts document coordinates to coordinates relative to the canvas */
function getTouchPos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.touches[0].clientX - rect.left,
    y: evt.touches[0].clientY - rect.top
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

/* Start scene */
function drawScene0() {
  startBackground.newPos();
  startBackground.update();
  startButton.newPos();
  startButton.update();
}

/* Intro scene */
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

/* Map scene */
function drawScene2() {
  mapBackground.newPos();
  mapBackground.update();
  
  /* Draw map icons */
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
  
  /* Draw magnifying glass icon */
  if (displayMagnify) {
    magnifyingIcon.newPos();
    magnifyingIcon.update();
  }
}

/* Police station scene */
function drawScene3() {
  stationBackground.newPos();
  stationBackground.update();
  
  if (gameState == gameStates.visited_suspects) {
    /* Draw dialogue */
    switch(sheriffDialogue) {
      case 1:
        dialogueBox.newPos();
        dialogueBox.update();
        sheriffText2.newPos();
        sheriffText2.update();
        break;
      case 2:
        choiceBox1.newPos();
        choiceBox1.update();
        choiceMyatovichSuspect.newPos();
        choiceMyatovichSuspect.update();
        choiceBoxText1.newPos();
        choiceBoxText1.update();
        choiceBox2.newPos();
        choiceBox2.update();
        choiceTonzilloSuspect.newPos();
        choiceTonzilloSuspect.update();
        choiceBoxText2.newPos();
        choiceBoxText2.update();
        choiceBox3.newPos();
        choiceBox3.update();
        choiceHillSuspect.newPos();
        choiceHillSuspect.update();
        choiceBoxText3.newPos();
        choiceBoxText3.update();
        choiceSeparator1.newPos();
        choiceSeparator1.update();
        choiceSeparator2.newPos();
        choiceSeparator2.update();
        break;
      case 3:
        if (playerChoice == 1) {
          dialogueBox.newPos();
          dialogueBox.update();
          sheriffText3.newPos();
          sheriffText3.update();
        }
        else if (playerChoice == 2) {
          dialogueBox.newPos();
          dialogueBox.update();
          sheriffText4.newPos();
          sheriffText4.update();
        }
        else if (playerChoice == 3) {
          dialogueBox.newPos();
          dialogueBox.update();
          sheriffText5.newPos();
          sheriffText5.update();
        }
        break;
    }
    
    /* Draw magnifying glass icon */
    if (displayMagnify) {
      magnifyingIcon.newPos();
      magnifyingIcon.update();
    }
  }
  else {
    dialogueBox.newPos();
    dialogueBox.update();
    sheriffText1.newPos();
    sheriffText1.update();
  }
  
  /* Draw returnToMapButton */
  if (displayReturn) {
    returnToMapButton.newPos();
    returnToMapButton.update();
    returnToMapText.newPos();
    returnToMapText.update();
  }
}

/* Crime scene */
function drawScene4() {
  crimeBackground.newPos();
  crimeBackground.update();
  
  /* Draw shotgun shells */
  if (!acquiredCrimeEvidence1) {
    switch(evidence1) {
      case 0:
        crimeEvidence1.newPos();
        crimeEvidence1.update();
        break;
      case 1:
        descriptionBox1.newPos();
        descriptionBox1.update();
        crimeEvidence1.newPos();
        crimeEvidence1.update();
        crimeEvidenceText1.newPos();
        crimeEvidenceText1.update();
        break;
      case 2:
        break;
    }
  }
  /* Allows user to open up the description again after having collected the evidence */
  else if (evidence1 == 1) {
    descriptionBox1.newPos();
    descriptionBox1.update();
    crimeEvidence1.newPos();
    crimeEvidence1.update();
    crimeEvidenceText1.newPos();
    crimeEvidenceText1.update();
  }
  
  /* Draw car */
  if (!acquiredCrimeEvidence2) {
    switch(evidence2) {
      case 0:
        crimeEvidence2.newPos();
        crimeEvidence2.update();
        break;
      case 1:
        descriptionBox2.newPos();
        descriptionBox2.update();
        crimeEvidence2.newPos();
        crimeEvidence2.update();
        crimeEvidenceText2.newPos();
        crimeEvidenceText2.update();
        break;
      case 2:
        break;
    }
  }
  /* Allows user to open up the description again after having collected the evidence */
  else if (evidence2 == 1) {
    descriptionBox2.newPos();
    descriptionBox2.update();
    crimeEvidence2.newPos();
    crimeEvidence2.update();
    crimeEvidenceText2.newPos();
    crimeEvidenceText2.update();
  }
  
  /* Draw dialogue */
  switch(officerDialogue) {
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
      break;
  }
  
  /* Draw magnifying glass icon */
  if (displayMagnify) {
    magnifyingIcon.newPos();
    magnifyingIcon.update();
  }
  /* Draw returnToMapButton */
  if (displayReturn) {
    returnToMapButton.newPos();
    returnToMapButton.update();
    returnToMapText.newPos();
    returnToMapText.update();
  }
}

/* Myatovich suspect scene */
function drawScene5() {
  myatovichBackground.newPos();
  myatovichBackground.update();
  
  /* Draw gift and card */
  if (!acquiredMyatovichEvidence1) {
    switch(evidence1) {
      case 0:
        myatovichEvidence1.newPos();
        myatovichEvidence1.update();
        break;
      case 1:
        descriptionBox3.newPos();
        descriptionBox3.update();
        myatovichEvidence1.newPos();
        myatovichEvidence1.update();
        myatovichEvidenceText1.newPos();
        myatovichEvidenceText1.update();
        break;
      case 2:
        break;
    }
  }
  /* Allows user to open up the description again after having collected the evidence */
  else if (evidence1 == 1) {
    descriptionBox3.newPos();
    descriptionBox3.update();
    myatovichEvidence1.newPos();
    myatovichEvidence1.update();
    myatovichEvidenceText1.newPos();
    myatovichEvidenceText1.update();
  }
  
  /* Draw gloves */
  if (!acquiredMyatovichEvidence2) {
    switch(evidence2) {
      case 0:
        myatovichEvidence2.newPos();
        myatovichEvidence2.update();
        break;
      case 1:
        descriptionBox4.newPos();
        descriptionBox4.update();
        myatovichEvidence2.newPos();
        myatovichEvidence2.update();
        myatovichEvidenceText2.newPos();
        myatovichEvidenceText2.update();
        break;
      case 2:
        break;
    }
  }
  /* Allows user to open up the description again after having collected the evidence */
  else if (evidence2 == 1) {
    descriptionBox4.newPos();
    descriptionBox4.update();
    myatovichEvidence2.newPos();
    myatovichEvidence2.update();
    myatovichEvidenceText2.newPos();
    myatovichEvidenceText2.update();
  }
  
  /* Draw dialogue */
  switch(myatovichDialogue) {
    case 1:
      dialogueBox.newPos();
      dialogueBox.update();
      myatovichText1.newPos();
      myatovichText1.update();
      myatovichSuspect.newPos();
      myatovichSuspect.update();
    case 2:
      myatovichSuspect.newPos();
      myatovichSuspect.update();
      break;
  }
  
  /* Draw magnifying glass icon */
  if (displayMagnify) {
    magnifyingIcon.newPos();
    magnifyingIcon.update();
  }
  /* Draw returnToMapButton */
  if (displayReturn) {
    returnToMapButton.newPos();
    returnToMapButton.update();
    returnToMapText.newPos();
    returnToMapText.update();
  }
}

/* Tonzillo suspect scene */
function drawScene6() {
  tonzilloBackground.newPos();
  tonzilloBackground.update();
  
  /* Draw shoes */
  if (!acquiredTonzilloEvidence1) {
    switch(evidence1) {
      case 0:
        tonzilloEvidence1.newPos();
        tonzilloEvidence1.update();
        break;
      case 1:
        descriptionBox7.newPos();
        descriptionBox7.update();
        tonzilloEvidence1.newPos();
        tonzilloEvidence1.update();
        tonzilloEvidenceText1.newPos();
        tonzilloEvidenceText1.update();
        break;
      case 2:
        break;
    }
  }
  /* Allows user to open up the description again after having collected the evidence */
  else if (evidence1 == 1) {
    descriptionBox7.newPos();
    descriptionBox7.update();
    tonzilloEvidence1.newPos();
    tonzilloEvidence1.update();
    tonzilloEvidenceText1.newPos();
    tonzilloEvidenceText1.update();
  }
  
  /* Draw wedding ring */
  if (!acquiredTonzilloEvidence2) {
    switch(evidence2) {
      case 0:
        tonzilloEvidence2.newPos();
        tonzilloEvidence2.update();
        break;
      case 1:
        descriptionBox8.newPos();
        descriptionBox8.update();
        tonzilloEvidence2.newPos();
        tonzilloEvidence2.update();
        tonzilloEvidenceText2.newPos();
        tonzilloEvidenceText2.update();
        break;
      case 2:
        break;
    }
  }
  /* Allows user to open up the description again after having collected the evidence */
  else if (evidence2 == 1) {
    descriptionBox8.newPos();
    descriptionBox8.update();
    tonzilloEvidence2.newPos();
    tonzilloEvidence2.update();
    tonzilloEvidenceText2.newPos();
    tonzilloEvidenceText2.update();
  }
  
  /* Draw dialogue */
  switch(tonzilloDialogue) {
    case 1:
      dialogueBox.newPos();
      dialogueBox.update();
      tonzilloText1.newPos();
      tonzilloText1.update();
      tonzilloSuspect.newPos();
      tonzilloSuspect.update();
    case 2:
      tonzilloSuspect.newPos();
      tonzilloSuspect.update();
      break;
  }
  
  /* Draw magnifying glass icon */
  if (displayMagnify) {
    magnifyingIcon.newPos();
    magnifyingIcon.update();
  }
  /* Draw returnToMapButton */
  if (displayReturn) {
    returnToMapButton.newPos();
    returnToMapButton.update();
    returnToMapText.newPos();
    returnToMapText.update();
  }
}

/* Hill suspect scene */
function drawScene7() {
  hillBackground.newPos();
  hillBackground.update();

  /* Draw work schedule */
  if (!acquiredHillEvidence1) {
    switch(evidence1) {
      case 0:
        hillEvidence1.newPos();
        hillEvidence1.update();
        break;
      case 1:
        descriptionBox7.newPos();
        descriptionBox7.update();
        hillEvidence1.newPos();
        hillEvidence1.update();
        hillEvidenceText1.newPos();
        hillEvidenceText1.update();
        break;
      case 2:
        break;
    }
  }
  /* Allows user to open up the description again after having collected the evidence */
  else if (evidence1 == 1) {
    descriptionBox7.newPos();
    descriptionBox7.update();
    hillEvidence1.newPos();
    hillEvidence1.update();
    hillEvidenceText1.newPos();
    hillEvidenceText1.update();
  }
  
  /* Draw journal */
  if (!acquiredHillEvidence2) {
    switch(evidence2) {
      case 0:
        hillEvidence2.newPos();
        hillEvidence2.update();
        break;
      case 1:
        descriptionBox8.newPos();
        descriptionBox8.update();
        hillEvidence2.newPos();
        hillEvidence2.update();
        hillEvidenceText2.newPos();
        hillEvidenceText2.update();
        break;
      case 2:
        break;
    }
  }
  /* Allows user to open up the description again after having collected the evidence */
  else if (evidence2 == 1) {
    descriptionBox8.newPos();
    descriptionBox8.update();
    hillEvidence2.newPos();
    hillEvidence2.update();
    hillEvidenceText2.newPos();
    hillEvidenceText2.update();
  }
  
  /* Draw dialogue */
  switch(hillDialogue) {
    case 1:
      dialogueBox.newPos();
      dialogueBox.update();
      hillText1.newPos();
      hillText1.update();
      hillSuspect.newPos();
      hillSuspect.update();
    case 2:
      hillSuspect.newPos();
      hillSuspect.update();
      break;
  }
  
  /* Draw magnifying glass icon */
  if (displayMagnify) {
    magnifyingIcon.newPos();
    magnifyingIcon.update();
  }
  /* Draw returnToMapButton */
  if (displayReturn) {
    returnToMapButton.newPos();
    returnToMapButton.update();
    returnToMapText.newPos();
    returnToMapText.update();
  }
}

/* Epilogue scene */
function drawScene8() {
  epilogueBackground.newPos();
  epilogueBackground.update();
  epilogueText1.newPos();
  epilogueText1.update();
  epilogueButton1.newPos();
  epilogueButton1.update();
  //epilogueButton2.newPos();
  //epilogueButton2.update();
}

function drawInventory() {
  inventory.newPos();
  inventory.update();
  if (acquiredCrimeEvidence1) {
    crimeEvidence1.newPos();
    crimeEvidence1.update();
  }
  if (acquiredCrimeEvidence2) {
    crimeEvidence2.newPos();
    crimeEvidence2.update();
  }
  if (acquiredMyatovichEvidence1) {
    myatovichEvidence1.newPos();
    myatovichEvidence1.update();
  }
  if (acquiredMyatovichEvidence2) {
    myatovichEvidence2.newPos();
    myatovichEvidence2.update();
  }
  if (acquiredTonzilloEvidence1) {
    tonzilloEvidence1.newPos();
    tonzilloEvidence1.update();
  }
  if (acquiredTonzilloEvidence2) {
    tonzilloEvidence2.newPos();
    tonzilloEvidence2.update();
  }
  if (acquiredHillEvidence1) {
    hillEvidence1.newPos();
    hillEvidence1.update();
  }
  if (acquiredHillEvidence2) {
    hillEvidence2.newPos();
    hillEvidence2.update();
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

  /* Check game state to update variables accordingly */
  if (gameState == gameStates.intro) {
    mapState = 0;
    
    if (sceneID == 3) {
      displayReturn = true;
    }
  }
  if (gameState == gameStates.sheriff_debrief) {
    mapState = 1;
  }
  else if (gameState == gameStates.visited_crimescene) {
    mapState = 2;
  }
  
  if (gameState > gameStates.intro && gameState != gameStates.epilogue) {
    switch(sceneID) {
      case 1:
        displayMagnify = false;
        displayReturn = false;
        break;
      case 2:
        displayReturn = false;
        if (mapState > 1) {
          displayMagnify = true;
        }
        else {
          displayMagnify = false;
        }
        break;
      case 3:
        if (!descriptionIsOpen) {
          displayReturn = true;
        }
        else {
          displayReturn = false;
        }
        if (sheriffDialogue > 1) {
          displayMagnify = true;  
        }
        else {
          displayMagnify = false;
        }
        break;
      case 4:
        if (officerDialogue > 7) {
          displayMagnify = true;
          if (!descriptionIsOpen) {
            displayReturn = true;
          }
          else {
            displayReturn = false;
          }
        }
        else {
          displayMagnify = false;
          displayReturn = false;
        }
        break;
      case 5:
        if (myatovichDialogue > 1) {
          displayMagnify = true;
          if (!descriptionIsOpen) {
            displayReturn = true;
          }
          else {
            displayReturn = false;
          }
        }
        else {
          displayMagnify = false;
          displayReturn = false;
        }
        break;
      case 6:
        if (tonzilloDialogue > 1) {
          displayMagnify = true;
          if (!descriptionIsOpen) {
            displayReturn = true;
          }
          else {
            displayReturn = false;
          }
        }
        else {
          displayMagnify = false;
          displayReturn = false;
        }
        break;
      case 7:
        if (hillDialogue > 1) {
          displayMagnify = true;
          if (!descriptionIsOpen) {
            displayReturn = true;
          }
          else {
            displayReturn = false;
          }
        }
        else {
          displayMagnify = false;
          displayReturn = false;
        }
        break;
    }
  }
  if (gameState == gameStates.epilogue) {
    displayMagnify = false;
    displayReturn = false;
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
        sheriffDialogue = 1;
        inventoryOpen = false;
      }
    }
    if (returnToMapButton.clicked()) {
      /* fade police station scene to map scene */
      if (!fadingOut && !fadingIn && sceneID == 3 && displayReturn) {
        fadingOut = true;
        nextScene = 2;
        if (gameState == gameStates.intro) {
          gameState = gameStates.sheriff_debrief;
        }
        inventoryOpen = false;
      }
      /* fade crime scene to map scene */
      if (!fadingOut && !fadingIn && sceneID == 4 && displayReturn) {
        fadingOut = true;
        nextScene = 2;
        gameState = gameStates.visited_crimescene;
        inventoryOpen = false;
      }
      /* fade suspect scene to map scene */
      if (!fadingOut && !fadingIn && sceneID > 4 && displayReturn) {
        fadingOut = true;
        nextScene = 2;
        gameState = gameStates.visited_suspects;
        inventoryOpen = false;
      }
    }
    if (mapDuckIcon.clicked()) {
      /* fade map scene to crime scene */
      if (!fadingOut && !fadingIn && sceneID == 2 && (gameState == gameStates.sheriff_debrief || gameState == gameStates.visited_crimescene || gameState == gameStates.visited_suspects)) {
        fadingOut = true;
        nextScene = 4;
        inventoryOpen = false;
      } 
    }
    if (mapMyatovichIcon.clicked()) {
      /* fade map scene to Myatovich supsect scene */
      if (!fadingOut && !fadingIn && sceneID == 2) {
        fadingOut = true;
        nextScene = 5;
        inventoryOpen = false;
      }
    }
    if (mapTonzilloIcon.clicked()) {
      /* fade map scene to Tonzillo supsect scene */
      if (!fadingOut && !fadingIn && sceneID == 2) {
        fadingOut = true;
        nextScene = 6;
        inventoryOpen = false;
      }
    }
    if (mapHillIcon.clicked()) {
      /* fade map scene to Hill supsect scene */
      if (!fadingOut && !fadingIn && sceneID == 2) {
        fadingOut = true;
        nextScene = 7;
        inventoryOpen = false;
      }
    }    
    if (dialogueBox.clicked()) {
      /* Display next block of text */
      if (!fadingOut && !fadingIn && sceneID == 3 && gameState == gameStates.visited_suspects && mouseUp) {
        if (sheriffDialogue < 2) {
          sheriffDialogue++;
          mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
        }
        else if (sheriffDialogue == 3) {
          /* Fade to epilogue scene */
          fadingOut = true;
          nextScene = 8;
          inventoryOpen = false;
        }
      }
      if (!fadingOut && !fadingIn && sceneID == 4 && mouseUp) {
        if (officerDialogue < 8) {
          officerDialogue++;
          mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
        }
      }
      if (!fadingOut && !fadingIn && sceneID == 5 && mouseUp) {
        if (myatovichDialogue < 2) {
          myatovichDialogue++;
          mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
        }
      }
      if (!fadingOut && !fadingIn && sceneID == 6 && mouseUp) {
        if (tonzilloDialogue < 2) {
          tonzilloDialogue++;
          mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
        }
      }
      if (!fadingOut && !fadingIn && sceneID == 7 && mouseUp) {
        if (hillDialogue < 2) {
          hillDialogue++;
          mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
        }
      }
    }
    if (magnifyingIcon.clicked()) {
      /* Toggle inventory open/close */
      if (!fadingOut && !fadingIn && displayMagnify && mouseUp) {
        inventoryOpen = !inventoryOpen;
        mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
      }
    }
    if (descriptionBox1.clicked()) {
      if (!fadingOut && !fadingIn && sceneID == 4 && evidence1 == 1 && mouseUp) {
        /* Close description box and add evidence to inventory */
        evidence1 = 0;
        acquiredCrimeEvidence1 = true;
        descriptionIsOpen = false;
        
        /* Move shotgun shells to inventory */
        crimeEvidence1.width = evidenceHeightSmall;
        crimeEvidence1.height = evidenceHeightSmall;
        crimeEvidence1.x = canvasWidth - 1.2*crimeEvidence1.width;
        crimeEvidence1.y = canvasHeight/15;
        
        mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
      }
    }
    if (crimeEvidence1.clicked() && !descriptionIsOpen) {
      /* Show description of evidence */
      if (!acquiredCrimeEvidence1 || inventoryOpen) {
        if (!fadingOut && !fadingIn && sceneID == 4 && officerDialogue == 8 && mouseUp) {
          crimeEvidence1.width = canvasWidth/6;
          crimeEvidence1.height = canvasWidth/6;
          crimeEvidence1.x = canvasWidth/2 - crimeEvidence1.width/2;
          crimeEvidence1.y = canvasHeight/2 - crimeEvidence1.height/2 - canvasHeight/7;
          evidence1 = 1;
          descriptionIsOpen = true;

          mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
        }
      }
    }
    if (descriptionBox2.clicked()) {
      if (!fadingOut && !fadingIn && sceneID == 4 && evidence2 == 1 && mouseUp) {
        /* Close description box and add evidence to inventory */
        evidence2 = 0;
        acquiredCrimeEvidence2 = true;
        descriptionIsOpen = false;
        
        /* Move car to inventory */
        crimeEvidence2.width = evidenceWidthSmall;
        crimeEvidence2.height = evidenceHeightSmall;
        crimeEvidence2.x = canvasWidth - 2.2*crimeEvidence2.width;
        crimeEvidence2.y = canvasHeight/15;
        
        mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
      }
    }
    if (crimeEvidence2.clicked() && !descriptionIsOpen) {
      /* Show description of evidence */
      if (!acquiredCrimeEvidence2 || inventoryOpen) {  
        if (!fadingOut && !fadingIn && sceneID == 4 && officerDialogue == 8 && mouseUp) {
          crimeEvidence2.width = canvasWidth/4;
          crimeEvidence2.height = canvasHeight/4;
          crimeEvidence2.x = canvasWidth/2 - crimeEvidence2.width/2;
          crimeEvidence2.y = canvasHeight/2 - crimeEvidence2.height/2 - canvasHeight/7;
          evidence2 = 1;
          descriptionIsOpen = true;

          mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
        }
      }
    }
    if (descriptionBox3.clicked()) {
      if (!fadingOut && !fadingIn && sceneID == 5 && evidence1 == 1 && mouseUp) {
        /* Close description box and add evidence to inventory */
        evidence1 = 0;
        acquiredMyatovichEvidence1 = true;
        descriptionIsOpen = false;
        
        /* Move gift and card to inventory */
        myatovichEvidence1.width = evidenceHeightSmall;
        myatovichEvidence1.height = evidenceHeightSmall;
        myatovichEvidence1.x = canvasWidth - 1.2*myatovichEvidence1.width;
        myatovichEvidence1.y = canvasHeight/15 + 1.2*evidenceHeightSmall;
        
        mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
      }
    }
    if (myatovichEvidence1.clicked() && !descriptionIsOpen) {
      /* Show description of evidence */
      if (!acquiredMyatovichEvidence1 || inventoryOpen) {
        if (!fadingOut && !fadingIn && sceneID == 5 && myatovichDialogue == 2 && mouseUp) {
          myatovichEvidence1.image.src = "assets/images/gift_and_card.png";
          myatovichEvidence1.width = canvasWidth/5;
          myatovichEvidence1.height = canvasWidth/5;
          myatovichEvidence1.x = canvasWidth/2 - myatovichEvidence1.width/2;
          myatovichEvidence1.y = canvasHeight/2 - myatovichEvidence1.height/2 - canvasHeight/7;
          evidence1 = 1;
          descriptionIsOpen = true;

          mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
        }
      }
    }
    if (descriptionBox4.clicked()) {
      if (!fadingOut && !fadingIn && sceneID == 5 && evidence2 == 1 && mouseUp) {
        /* Close description box and add evidence to inventory */
        evidence2 = 0;
        acquiredMyatovichEvidence2 = true;
        descriptionIsOpen = false;
        
        /* Move gloves to inventory */
        myatovichEvidence2.width = evidenceWidthSmall;
        myatovichEvidence2.height = evidenceHeightSmall;
        myatovichEvidence2.x = canvasWidth - 2.2*myatovichEvidence2.width;
        myatovichEvidence2.y = canvasHeight/15 + 1.2*evidenceHeightSmall;
        
        mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
      }
    }
    if (myatovichEvidence2.clicked() && !descriptionIsOpen) {
      /* Show description of evidence */
      if (!acquiredMyatovichEvidence2 || inventoryOpen) {
        if (!fadingOut && !fadingIn && sceneID == 5 && myatovichDialogue == 2 && mouseUp) {
          myatovichEvidence2.width = canvasWidth/5;
          myatovichEvidence2.height = canvasHeight/5;
          myatovichEvidence2.x = canvasWidth/2 - myatovichEvidence2.width/2;
          myatovichEvidence2.y = canvasHeight/2 - myatovichEvidence2.height/2 - canvasHeight/7;
          evidence2 = 1;
          descriptionIsOpen = true;

          mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
        }
      }
    }
    if (descriptionBox5.clicked()) {
      if (!fadingOut && !fadingIn && sceneID == 6 && evidence1 == 1 && mouseUp) {
        /* Close description box and add evidence to inventory */
        evidence1 = 0;
        acquiredTonzilloEvidence1 = true;
        descriptionIsOpen = false;
        
        /* Move shoes to inventory */
        tonzilloEvidence1.width = evidenceWidthSmall;
        tonzilloEvidence1.height = evidenceHeightSmall;
        tonzilloEvidence1.x = canvasWidth - 2.2*tonzilloEvidence1.width;
        tonzilloEvidence1.y = canvasHeight/15 + 2.4*evidenceHeightSmall;
        
        mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
      }
    }
    if (tonzilloEvidence1.clicked() && !descriptionIsOpen) {
      /* Show description of evidence */
      if (!acquiredTonzilloEvidence1 || inventoryOpen) {
        if (!fadingOut && !fadingIn && sceneID == 6 && tonzilloDialogue == 2 && mouseUp) {
          tonzilloEvidence1.width = canvasWidth/4;
          tonzilloEvidence1.height = canvasHeight/4;
          tonzilloEvidence1.x = canvasWidth/2 - tonzilloEvidence1.width/2;
          tonzilloEvidence1.y = canvasHeight/2 - tonzilloEvidence1.height/2 - canvasHeight/7;
          evidence1 = 1;
          descriptionIsOpen = true;

          mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
        }
      }
    }
    if (descriptionBox6.clicked()) {
      if (!fadingOut && !fadingIn && sceneID == 6 && evidence2 == 1 && mouseUp) {
        /* Close description box and add evidence to inventory */
        evidence2 = 0;
        acquiredTonzilloEvidence2 = true;
        descriptionIsOpen = false;
        
        /* Move wedding ring to inventory */
        tonzilloEvidence2.width = evidenceHeightSmall;
        tonzilloEvidence2.height = evidenceHeightSmall;
        tonzilloEvidence2.x = canvasWidth - 1.2*tonzilloEvidence2.width;
        tonzilloEvidence2.y = canvasHeight/15 + 2.4*evidenceHeightSmall;
        
        mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
      }
    }
    if (tonzilloEvidence2.clicked() && !descriptionIsOpen) {
      /* Show description of evidence */
      if (!acquiredTonzilloEvidence2 || inventoryOpen) {
        if (!fadingOut && !fadingIn && sceneID == 6 && tonzilloDialogue == 2 && mouseUp) {
          tonzilloEvidence2.width = canvasWidth/6;
          tonzilloEvidence2.height = canvasWidth/6;
          tonzilloEvidence2.x = canvasWidth/2 - tonzilloEvidence2.width/2;
          tonzilloEvidence2.y = canvasHeight/2 - tonzilloEvidence2.height/2 - canvasHeight/7;
          evidence2 = 1;
          descriptionIsOpen = true;

          mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
        }
      }
    }
    if (descriptionBox7.clicked()) {
      if (!fadingOut && !fadingIn && sceneID == 7 && evidence1 == 1 && mouseUp) {
        /* Close description box and add evidence to inventory */
        evidence1 = 0;
        acquiredHillEvidence1 = true;
        descriptionIsOpen = false;
        
        /* Move work schedule to inventory */
        hillEvidence1.width = evidenceWidthSmall;
        hillEvidence1.height = evidenceHeightSmall;
        hillEvidence1.x = canvasWidth - 2.2*hillEvidence1.width;
        hillEvidence1.y = canvasHeight/15 + 3.6*evidenceHeightSmall;
        
        mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
      }
    }
    if (hillEvidence1.clicked() && !descriptionIsOpen) {
      /* Show description of evidence */
      if (!acquiredHillEvidence1 || inventoryOpen) {
        if (!fadingOut && !fadingIn && sceneID == 7 && hillDialogue == 2 && mouseUp) {
          hillEvidence1.width = canvasWidth/4;
          hillEvidence1.height = canvasHeight/4;
          hillEvidence1.x = canvasWidth/2 - hillEvidence1.width/2;
          hillEvidence1.y = canvasHeight/2 - hillEvidence1.height/2 - canvasHeight/7;
          evidence1 = 1;
          descriptionIsOpen = true;

          mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
        }
      }
    }
    if (descriptionBox8.clicked()) {
      if (!fadingOut && !fadingIn && sceneID == 7 && evidence2 == 1 && mouseUp) {
        /* Close description box and add evidence to inventory */
        evidence2 = 0;
        acquiredHillEvidence2 = true;
        descriptionIsOpen = false;
        
        /* Move journal to inventory */
        hillEvidence2.width = evidenceHeightSmall;
        hillEvidence2.height = evidenceHeightSmall;
        hillEvidence2.x = canvasWidth - 1.2*hillEvidence2.width;
        hillEvidence2.y = canvasHeight/15 + 3.6*evidenceHeightSmall;
        
        mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
      }
    }
    if (hillEvidence2.clicked() && !descriptionIsOpen) {
      /* Show description of evidence */
      if (!acquiredHillEvidence2 || inventoryOpen) {
        if (!fadingOut && !fadingIn && sceneID == 7 && hillDialogue == 2 && mouseUp) {
          hillEvidence2.width = canvasWidth/6;
          hillEvidence2.height = canvasWidth/6;
          hillEvidence2.x = canvasWidth/2 - hillEvidence2.width/2;
          hillEvidence2.y = canvasHeight/2 - hillEvidence2.height/2 - canvasHeight/7;
          evidence2 = 1;
          descriptionIsOpen = true;

          mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
        }
      }
    }
    if (choiceBox1.clicked() && !descriptionIsOpen && !inventoryOpen) {
      /* Player selected first choice */
      if (!fadingOut && !fadingIn && sceneID == 3 && sheriffDialogue == 2 && mouseUp) {
        playerChoice = 1;
        sheriffDialogue = 3;
        
        mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
      }
    }
    if (choiceBox2.clicked() && !descriptionIsOpen && !inventoryOpen) {
      /* Player selected second choice */
      if (!fadingOut && !fadingIn && sceneID == 3 && sheriffDialogue == 2 && mouseUp) {
        playerChoice = 2;
        sheriffDialogue = 3;
        
        mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
      }
    }
    if (choiceBox3.clicked() && !descriptionIsOpen && !inventoryOpen) {
      /* Player selected third choice */
      if (!fadingOut && !fadingIn && sceneID == 3 && sheriffDialogue == 2 && mouseUp) {
        playerChoice = 3;
        sheriffDialogue = 3;
        
        mouseUp = false; //prevents this code block from executing again until the user releases the mouse button
      }
    }
    if (epilogueButton1.clicked()) {
      /* Redirect to article */
      if (!fadingOut && !fadingIn && sceneID == 8) {
        window.location = "http://www.capitalcentury.com/1939.html";
      }
    }
  }

  /* Draw the current scene */
  switch (sceneID) {
    case 0: //start scene
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
        if (inventoryOpen) {
          drawInventory();
        }
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
        if (inventoryOpen) {
          drawInventory();
        }
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
        if (inventoryOpen) {
          drawInventory();
        }
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
      case 5: //myatovich suspect scene
      if (!fadingOut && !fadingIn) {
        drawScene5();
        if (inventoryOpen) {
          drawInventory();
        }
      }
      else if (fadingOut) {
        drawScene5();
        fadeOutScene();
      }
      else if (fadingIn) {
        drawScene5();
        fadeInScene();
      }
      break;
      case 6: //tonzillo suspect scene
      if (!fadingOut && !fadingIn) {
        drawScene6();
        if (inventoryOpen) {
          drawInventory();
        }
      }
      else if (fadingOut) {
        drawScene6();
        fadeOutScene();
      }
      else if (fadingIn) {
        drawScene6();
        fadeInScene();
      }
      break;
      case 7: //hill suspect scene
      if (!fadingOut && !fadingIn) {
        drawScene7();
        if (inventoryOpen) {
          drawInventory();
        }
      }
      else if (fadingOut) {
        drawScene7();
        fadeOutScene();
      }
      else if (fadingIn) {
        drawScene7();
        fadeInScene();
      }
      break;
      case 8: //epilogue scene
      if (!fadingOut && !fadingIn) {
        drawScene8();
      }
      else if (fadingOut) {
        drawScene8();
        fadeOutScene();
      }
      else if (fadingIn) {
        drawScene8();
        fadeInScene();
      }
      break;
  }
}