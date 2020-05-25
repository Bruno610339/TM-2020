// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {
  this.playerSpeed = 1.5;
  this.enemySpeed = 2;
  this.enemyMaxY = 280;
  this.enemyMinY = 80;
}

// load asset files for our game
gameScene.preload = function() {
  // load images
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('dragon', 'assets/dragon.png');
  this.load.image('treasure', 'assets/treasure.png');
};

// executed once, after assets were loaded
gameScene.create = function() {
  // background
  let bg = this.add.sprite(0, 0, 'background');
  bg.setOrigin(0, 0);

  //Player Sprite, Reduce Size 50%
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
  this.player.setScale(0.5);

  //Goal
  this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
  this.treasure.setScale(0.6);

  //Add Enemies
  this.enemies = this.add.group({
    key: 'dragon',
    repeat: 5,
    setXY: {
      x: 110,
      y: 100,
      stepX: 80,
      stepY: 20
    }
  });

  //Scale the Enemies
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

  //Set Speed for Enemies
  Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
    enemy.speed = Math.random() * 2 + 1;
  }, this);

  //Player Alive
  this.isPlayerAlive = true;

  //Reset Cameras
  this.cameras.main.resetFX();

}; //END OF CREATE

//Executed on every frame (60 frames per second)
gameScene.update = function() {

  //Player is Alive
  if (!this.isPlayerAlive) {
    return;
  }

  //Check for Input
  if(this.input.activePointer.isDown) {

    //Player Move
    this.player.x += this.playerSpeed;
  }

  //Collision between Player and Treasure
  if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
    this.gameOver();
  }

  //Enemy
  let enemies = this.enemies.getChildren();
  let numEnemies = enemies.length;

  for (let i = 0; i < numEnemies; i++) {

    //Enemies Move
    enemies[i].y += enemies[i].speed;

    //Turn around when hits edges
    if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
      enemies[i].speed *= -1;
    } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
      enemies[i].speed *= -1;
    }

    //Collisions between Player and Enemies
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
      this.gameOver();
      break;
    }
  }

}; //END OF UPDATE

//Execute whenPlayer Losses
gameScene.gameOver = function() {

  //Player Dead
  this.isPlayerAlive = false;

  //Shake Camera
  this.cameras.main.shake(500);

  //Fade Camera
  this.time.delayedCall(250, function() {
    this.cameras.main.fade(250);
  }, [], this);

  //Restart the Game
  this.time.delayedCall(500, function() {
    this.scene.restart();
  }, [], this);

};

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);