//GAME SETUP
var sun = createSprite(30, 30);
sun.setAnimation("sun");
// Create the sprites
var bubble = createSprite(370, 20);
bubble.setAnimation("bubble_1");
bubble.scale = 0.3;
var bubble3 = createSprite(200, 50);
bubble3.setAnimation("bubble3");
bubble3.scale = 0.4;
var bubble2 = createSprite(290, 100);
bubble2.setAnimation("bubble2");
bubble2.scale = 0.3;
var frog = createSprite(30, 290);
frog.setAnimation("frog");
//Obstacle;
var mushroom = createSprite(400, 275);
mushroom.setAnimation("mushroom");
mushroom.velocityX = -4;
//Target;
var fly = createSprite(300, 100);
fly.setAnimation("fly");
fly.velocityX = -8;
// set velocity for the obstacle and the target


//create the variables
var score = 0;
var HEALTH_NUMBER = 100;
var health = HEALTH_NUMBER;
var isRunningGame = 0;
var start = createSprite(200, 200);

function draw() {
  if (isRunningGame == 1) {
      
  // BACKGROUND
  background("lightblue");
  fill("lightgreen");
  noStroke();
  rect(0, 300, 400, 100);
  // draw the ground and other background

  // SPRITE INTERACTIONS
  // if the player touches the obstacle
  // the health goes down, and the obstacle turns
  if (frog.isTouching(mushroom)) {
    mushroom.rotation = 30;
    health = health-1;
  }

  // if the frog touches the fly
  // the score goes up, the fly resets
  if (frog.isTouching(fly)) {
      playSound("sound://category_hits/retro_game_hit_block_4.mp3", false);
      playSound.volume=10;
    fly.x = 430;
    fly.y = randomNumber(90, 110);
    score = score+1;
  }
  ;

  // JUMPING
  // if the player has reached the ground
  if (frog.y > 289) {
    // if the player presses the up arrow
    // start moving up
    if (keyWentDown("up")) {
      frog.velocityY = -10;
    } else {
      // stop moving down
      frog.velocityY = 0;
    }
  }

  // if the player reaches the top of the jump
  // start moving down
  if (frog.y < 80) {
    frog.velocityY = 8;
  }

  // LOOPING
  // if the obstacle has gone off the left hand side of the screen, 
  // move it to the right hand side of the screen
  if (mushroom.x < -20) {
    mushroom.x = 430;
    mushroom.rotation = 0;
    mushroom.velocityX = randomNumber(-5, -10);
  }

  // if the target has gone off the left hand side of the screen,
  // move it to the right hand side of the screen
  if (fly.x < -20) {
    fly.x = 430;
    fly.y = randomNumber(90, 110);
  }

  // DRAW SPRITES
  drawSprites();
  
  // SCOREBOARD
  fill("black");
  textSize(20);
  text("Score:", 180, 30);
  text (score, 240, 30);;;
  // add scoreboard and health meter
  fill("black");
  textSize(20);
  text("Health:", 280, 30);
  text (health, 350, 30);
  // GAME OVER
  // if health runs out
  // show Game over
      if (health <= 0) {
          isRunningGame=2;
        }
  } else {
    start.setAnimation("start");
    drawSprites();
    fill("white");
    textSize(30);
    text("Press SPACE to start a game", 5, 200);
    if (keyWentDown("space")) {
      start.visible = false;
      isRunningGame = 1;
      score = 0;
      health = HEALTH_NUMBER;
    }
  }
  if (isRunningGame == 2) {
    stopSound("sound://category_hits/retro_game_hit_block_4.mp3");
    background("pink");
    fill("hotpink");
    textSize(50);
    text("Game Over\n\nPress R to restart\n\nScore: " + score , 13, 80);
    isRunningGame = 2;
    if (keyWentDown("r")) {
      start.visible = true;
      isRunningGame = 0;
      score = 0;
      health = HEALTH_NUMBER;
    }
  }
}
