// This game is best and easiest played when you simply lower the console/shell/instruction screen all the way down to the very bottom of the screen, although the game still works in other screen sizes 

// Declares the variable constants for each key
const D_KEY = 68;
const F_KEY = 70;
const P_KEY = 80;
const O_KEY = 79;

// Loads each image into the game
function preload() {
  img = loadImage("basket.png");
  img2 = loadImage("x2.png");
  img3 = loadImage("ice.png");
  treeImg1 = loadImage("house.jpg");
  treeImg2 = loadImage("stormyTree.jpg");
  treeImg3 = loadImage("grassField.jpg");
  cherish = loadFont("Cherish-Regular.ttf");
}

function setup() {
  // Creates the canvas, sets the framerate to 20, sets the fill colour, stroke colour, and the stroke weight to a random value
  createCanvas(windowWidth, windowHeight);
  frameRate(20);
  fill(random(256), random(256), random(256));
  stroke(random(256), random(256), random(256));
  strokeWeight(random(7));

  // Sets the X and Y values as well as the width and height of the rectangles and circles coming down
  rectX = random(40, width - 40);
  rectY = 0;
  rectWidth = random(61) + 10;
  rectHeight = random(91) + 10;
  circleX = random(40, width - 40);
  circleY = 0;
  circleWidth = random(41) + 20;
  circleHeight = random(71) + 20;

  // Sets the initial rectangle and circle speeds
  rectIncrementer = 12;
  circleIncrementer = 7;

  // Sets the score and misses to 0. Also sets how much the score and power up time is increased each time and the initial power up time
  score = 0;
  misses = 0;
  scoreIncrementer = 1;
  powerUpTime = 0;
  powerTimeIncrementer = 0;

  // Sets the initial power bar height and sets the variables doubleImageBinary and freezImageBinary to 0. When they are 0, then the corresponding images do not show, but if they are set to one, the corresponding will show on the screen
  powerBarY = 247;
  doubleImageBinary = 0;
  freezeImageBinary = 0;

  // Declares an array containing the different backgrounds. Also sets a variable for the index of the array
  backgrounder = [treeImg1, treeImg2, treeImg3];
  index = 0;

  // Sets another initial background time and the amount it is increased each time
  groundTime = 0;
  groundTimeIncrementer = 0;

  pauseKey = 0; // When key is 0, game is not paused, when it is 1, game is paused

  textAlign(CENTER); // Centers the text
}

function draw() {
  // So if P_KEY is pressed, then pauseKey is set to 1, effectively pausing the game
  if (keyIsDown(P_KEY)) {
    pauseKey = 1;
  }

  // If the O_KEY is pressed, then the pauseKey is set to 0, effectively unpausing the game
  if (keyIsDown(O_KEY)) {
    pauseKey = 0;
  }

  // If the pauseKey variable is equal to 0
  if (pauseKey == 0) {
    // Sets the background to an image in the backgrounder array based on the index. It will be called 20 times each second
    image(backgrounder[index], 0, 0, width * 2, height * 2);

    push(); // Starts a new style
    textFont(cherish, 20); // Sets the text font to the Cherish font and its size to 20
    strokeWeight(3); // Sets the strokeweight to 3
    fill(252, 3, 11); // Sets the fill color to red
    stroke(3, 15, 252); // Sets the outline color to blue 
    text("William Liang", 60, height / 1.1); // Sets the text to William Liang and the size of it
    pop(); // Restores original style

    // If the a mouse button is pressed and the groundTime variable is also set to 0 (the reason why is explained on line 89), then execute the following code
    if (mouseIsPressed && groundTime == 0) {
      groundTimeIncrementer = 1;

      // If the index value is less than 2, then increase it by 1, otherwise, set it back to 0
      if (index < 2) {
        index++;
      } else {
        index = 0;
      }
    }

    // If groundtimeIncrementer is set to 1, then we can track the time by simply knowing that 1 second will correspond to 20, since the draw function is called 20 times per second
    groundTime += groundTimeIncrementer;

    // If the groundTime variable is equal to 30 (1.5 seconds), set the following variables back to 0. This is done to prevent the images from changing rapidly if you hold your mouse button down. In summary, you can only switch the background every 1.5 seconds and only by clicking on a mouse button
    if (groundTime == 30) {
      groundTime = 0;
      groundTimeIncrementer = 0;
    }

    // Creates the basket image and sets the image mode to CENTER so the mouse is centered at the basket
    imageMode(CENTER);
    image(img, mouseX, height / 1.18, 108, 123);

    // Creates the rectangles and circles (always having random coordinates and sizes) and makes them go down by increasing the y coordinates of them by a certain value
    rect(rectX, rectY, rectWidth, rectHeight);
    rectY += rectIncrementer;
    ellipse(circleX, circleY, circleWidth, circleHeight);
    circleY += circleIncrementer;

    // If powerBarY is equal to 22 (in other words, the bar is full) and the D_KEY is held down, then set the time incrementer to 1 to track the time, score incrementer to 2 to double the score, set the powerBarY variable to 247 to reset the power bar, and set the doubleImageBinary variable to 1 to display the x2 image 
    if (powerBarY == 22 && keyIsDown(D_KEY)) {
      powerTimeIncrementer = 1;
      scoreIncrementer = 2;
      powerBarY = 247;
      doubleImageBinary = 1;
    }

    // If powerBarY is equal to 22 (in other words, the bar is full) and the F_KEY is held down, then set the time incrementer to 1 to track the time, set rectIncrementer and circleIncrementer to 6 and 5 respectively to slow down the speed of the rectangles and circles, set the powerBarY variable to 247 to reset the power bar, and set the freezeImageBinary variable to 1 to display the ice image 
    if (powerBarY == 22 && keyIsDown(F_KEY)) {
      powerTimeIncrementer = 1;
      rectIncrementer = 6;
      circleIncrementer = 5;
      powerBarY = 247;
      freezeImageBinary = 1;
    }

    // If powerTimeIncrementer is set to 1, then we can track the time by simply knowing that 1 second will correspond to 20, since the draw function is called 20 times per second
    powerUpTime += powerTimeIncrementer;

    // If the powerUpTime variable is greater than or equal to 100 (5 seconds), then set the scoreIncrementer variable back to 1 so the score will not be doubled, and set the doubleImageBinary and freezeImageBinary variables back to 0, so the x2 and ice images don't stay there
    if (powerUpTime >= 100) {
      scoreIncrementer = 1;
      doubleImageBinary = 0;
      freezeImageBinary = 0;

      // If the score if greater than or equal to 5, but also less than 20, then set the rectangle speed and circle speed to 18 and 13 respectively. Otherwise, set it to 25 and 20 respectively
      if (score >= 5 && score < 20) {
        rectIncrementer = 18;
        circleIncrementer = 13;
      } else {
        rectIncrementer = 25;
        circleIncrementer = 20;
      }

      // Reset the powerUpTime and powerTimeIncrementer variables back to 0
      powerUpTime = 0;
      powerTimeIncrementer = 0;
    }

    // If the power bar is full, then display the following text in that style
    if(powerBarY == 22) {
      push(); // Starts a new style
      fill(0, 0, 0); // Sets fill colour to black
      textSize(15); // Sets the text size to 15
      text("Press f for freeze power up", width/2, height/5);
      text("Press d for double power up", width/2, height/6);
      pop(); // Restores orginal style
    }

    // If the doubleImageBinary or freezeImageBinary variable is 1, then display the x2 and ice images
    if (doubleImageBinary == 1) {
      image(img2, width - 150, 63, 90, 98);
    }

    if (freezeImageBinary == 1) {
      image(img3, width - 150, 63, 90, 98);
    }

    // For the next 2 if statements, if the y coordinates of the rectangle or circle are greater than the height of the window (in other words, the shape is at the bottom at the screen), set their y coordinates back to 0 (at the top of the screen) and give them a new random x coordinate and size. A random fill colour, stroke colour and stroke weight is also given. The misses variable is also incremented by 1
    if (rectY > height) {
      rectY = 0;
      rectX = random(40, width - 40);
      rectWidth = random(61) + 10;
      rectHeight = random(91) + 10;

      fill(random(256), random(256), random(256));
      stroke(random(256), random(256), random(256));
      strokeWeight(random(6));
      misses++;
    }

    if (circleY > height) {
      circleY = 0;
      circleX = random(40, width - 40);
      circleWidth = random(41) + 20;
      circleHeight = random(71) + 20;

      fill(random(256), random(256), random(256));
      stroke(random(256), random(256), random(256));
      strokeWeight(random(6));
      misses++;
    }

    // The next 2 outer if statements check to see if the basket touches the rectangle or circle. If it does, their y coordinates are set back to 0 (at the top of the screen) and a new random x coordinate and size is given. A random fill colour, stroke colour and stroke weight is also given. The score is also incremented
    if (mouseX >= rectX - 40 && mouseX <= rectX + 40 && height / 1.18 >= rectY - 80 && height / 1.18 <= rectY + 80) {
      rectY = 0;
      rectX = random(40, width - 40);
      rectWidth = random(61) + 10;
      rectHeight = random(91 + 10);

      fill(random(256), random(256), random(256));
      stroke(random(256), random(256), random(256));
      strokeWeight(random(6));
      score += scoreIncrementer;

      // If the variable powerBarY is greater than 22 (meaning that the power bar has not reached the top yet), then the power bar is increased
      if (powerBarY > 22) {
        powerBarY -= 15;
      }
    }

    if (mouseX >= circleX - 40 && mouseX <= circleX + 40 && height / 1.18 >= circleY - 40 && height / 1.18 <= circleY + 40) {
      circleY = 0;
      circleX = random(40, width - 40);
      circleWidth = random(41) + 20;
      circleHeight = random(71) + 20;

      fill(random(256), random(256), random(256));
      stroke(random(256), random(256), random(256));
      strokeWeight(random(6));
      score += scoreIncrementer;

      if (powerBarY > 22) {
        powerBarY -= 15;
      }
    }

    push(); // Starts a new style
    strokeWeight(4); // Sets the stroke weight to 4
    fill(255, 255, 255); // Changes the color to white
    rectMode(CORNERS); // Sets the rect mode to CORNERS
    rect(width - 50, 22, width - 25, 248); // Creates the power bar outline
    pop(); // Restores original style

    push(); // Starts a new style
    strokeWeight(0); // Sets the stroke weight to 0
    fill(3, 252, 236); // Changes the fill colour to cyan
    rectMode(CORNERS); // Sets the rect mode to CORNERS
    rect(width - 49, powerBarY, width - 25.5, 247); // Creates the inside bar of the power bar showing the player how full the power bar is
    pop(); // Restores original style

    // If the score is 5, then increase the rectangle and circle speed to 18 and 13 respectively
    if (score == 5) {
      rectIncrementer = 18;
      circleIncrementer = 13;
    }

    // If the score is greater than or equal to 20 and the powerUpTime is equal to 0 (this is done because if the freeze power up is called and the score reaches 20, then the shapes will immediately speed up again even if the 5 seconds of the freeze function is not over), then set the rectangle and circle speed to 25 and 20 respectively
    if (score >= 20 && powerUpTime == 0) {
      rectIncrementer = 25;
      circleIncrementer = 20;
    }

    // If the number of misses is 3, then set the background to white, set the text size to 60, print out "Game Over" in the middle of the screen and throw an Error to terminate the application
    if (misses == 3) {
      background(255);
      textSize(60);
      text("Game Over", width / 2, height / 2);
      throw new Error("Program Terminated");
    }

    // Set the text size 30, set the text style to BOLD and print out "Score" as well as the players score in the center of the screen
    textSize(30);
    textStyle(BOLD);
    text("Score: " + score, 77, height / 13);

    // If the P_KEY is held down, then the game is paused and "Paused" is printed out at the center of the screen with a size of 50
  } else {
    textSize(50);
    text("Paused", width / 2, height / 2);
  }
}

// Double clicking a mouse button simply resets all the variable values to their initial values, effectively restarting the game as you are playing
function doubleClicked() {
  score = 0;
  misses = 0;

  // rectY and circleY values are set to -250 so shapes don't immediately start coming down
  rectY = -250;
  circleY = -200;

  rectIncrementer = 12;
  circleIncrementer = 7;
  scoreIncrementer = 1;
  powerBarY = 247;
  powerUpTime = 0;
  powerTimeIncrementer = 0;
  doubleImageBinary = 0;
  freezeImageBinary = 0;

  rectX = random(40, width - 40);
  rectWidth = random(61) + 10;
  rectHeight = random(91) + 10;

  circleX = random(40, width - 40);
  circleWidth = random(41) + 20;
  circleHeight = random(71) + 20;

  groundTime = 0;
  groundTimeIncrementer = 0;

  fill(random(256), random(256), random(256));
  stroke(random(256), random(256), random(256));
  strokeWeight(random(6));
}