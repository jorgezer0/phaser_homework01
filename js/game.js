"use strict"; //sempre começar o arquivo com essa linha

var GameState = function(game) {};

GameState.prototype.preload = function() {
    this.game.load.spritesheet('plane','assets/Planes/planeBlue0.png', 88, 73);
    this.game.load.spritesheet('enemy','assets/Planes/planeRed0.png', 88, 73);
    this.game.load.image('bullet', 'assets/bullet.png');
    this.game.load.image('coin1', 'assets/UI/medalBronze.png');
    this.game.load.image('coin5', 'assets/UI/medalSilver.png');
    this.game.load.image('coin10', 'assets/UI/medalGold.png');
    this.game.load.image('bg', 'assets/background.png');
    this.game.load.image('rock', 'assets/rockGrass.png');
    this.game.load.image('ground', 'assets/groundGrass.png');
    
    this.game.load.audio('flySound', 'assets/sounds/fly.wav');
    this.game.load.audio('coinSound', 'assets/sounds/coin.wav');
    this.game.load.audio('shootSound', 'assets/sounds/shoot.wav');
    this.game.load.audio('explosion1Sound', 'assets/sounds/explosion.wav');
    this.game.load.audio('explosion2Sound', 'assets/sounds/explosion2.wav');
}



GameState.prototype.create = function() {
    //BG
    this.background = game.add.tileSprite(400,300,800,500,'bg');
    this.background.anchor.setTo(0.5,0.5);
    
    //ROCK
    this.rock = game.add.sprite(900,550,'rock');
    this.rock.anchor.setTo(0.5,1);
    this.game.physics.enable(this.rock);
    this.rock.body.immovable = true;
    this.rock.body.setSize(10,239, 55,0);
    
    //GROUND
    this.ground = game.add.tileSprite(400,525,800,70,'ground');
    this.ground.anchor.setTo(0.5,0.5);
    this.game.physics.enable(this.ground);
    this.ground.body.immovable = true;
    this.ground.body.setSize(808,60,0,10);
    
    //PLAYER
    this.player = game.add.sprite(150,150, 'plane', 1);
    this.player.anchor.setTo(0.5,0.5);
    this.fly = this.player.animations.add('fly', [0,1,2], 24, true);
    this.game.physics.enable(this.player);
    this.player.body.gravity.y = 750;
    //WEAPON
    this.weapon = game.add.weapon(1, 'bullet');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.pulletSpeed = 300;
    this.weapon.fireRate = 1;
    this.weapon.trackSprite(this.player, 0, 0, true);
    
    //ENEMY
    this.enemy = game.add.sprite(900,this.game.rnd.integerInRange(150, 400), 'enemy', 1);
    this.enemy.anchor.setTo(0.5,0.5);
    this.fly = this.enemy.animations.add('fly', [0,1,2], 24, true);
    this.game.physics.enable(this.enemy);
    this.enemy.body.immovable = true;
    
    //COIN 1 point
    this.coin1 = game.add.sprite(
        this.game.rnd.integerInRange(1000, 4000),
        this.game.rnd.integerInRange(150, 400),
        'coin1');
    this.coin1.anchor.setTo(0.5,0.5);
    this.coin1.scale.setTo(0.5,0.5);
    this.game.physics.enable(this.coin1);
    this.coin1.body.immovable = true;
    //COIN 5 point
    this.coin5 = game.add.sprite(
        this.game.rnd.integerInRange(2000, 5000),
        this.game.rnd.integerInRange(150, 400),
        'coin5');
    this.coin5.anchor.setTo(0.5,0.5);
    this.coin5.scale.setTo(0.5,0.5);
    this.game.physics.enable(this.coin5);
    this.coin5.body.immovable = true;
    //COIN 10 point
    this.coin10 = game.add.sprite(
        this.game.rnd.integerInRange(3000, 6000),
        this.game.rnd.integerInRange(150, 400),
        'coin10');
    this.coin10.anchor.setTo(0.5,0.5);
    this.coin10.scale.setTo(0.5,0.5);
    this.game.physics.enable(this.coin10);
    this.coin10.body.immovable = true;
    
    //CONTROLLER
    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    
    //SCORE
    this.score = 0;
    this.scoreTex = this.game.add.text(400, 25, "Score:", {fill: "#ffffff"});
    this.scoreTex.anchor.setTo(0.5,0.5);
    
    //SOUNDS
    this.flySound = this.game.add.audio('flySound');
    this.coinSound = this.game.add.audio('coinSound');
    this.shootSound = this.game.add.audio('shootSound');
    this.explosion1Sound = this.game.add.audio('explosion1Sound');
    this.explosion2Sound = this.game.add.audio('explosion2Sound');
    
}

GameState.prototype.update = function() {
    this.scoreTex.setText("Score: " + this.score);
    this.player.play('fly');
    this.enemy.play('fly');
    this.background.tilePosition.x -= 1;
    this.ground.tilePosition.x -= 3;
    
    this.coin1.position.x -= 3;
    this.coin5.position.x -= 3;
    this.coin10.position.x -= 3;
    
    this.rock.position.x -= 3;    
    if (this.rock.position.x < -50){
        this.rock.position.x = this.game.rnd.integerInRange(900, 1500);
    }
    
    this.enemy.position.x -= 4;
    if (this.enemy.position.x < -50){
        this.enemy.position.x = this.game.rnd.integerInRange(900, 1300);
        this.enemy.position.y = this.game.rnd.integerInRange(150, 400);
    }
    
    this.game.physics.arcade.collide(this.player, this.ground, this.groundCollision, null, this);
    this.game.physics.arcade.collide(this.player, this.rock, this.groundCollision, null, this);
    this.game.physics.arcade.collide(this.player, this.enemy, this.groundCollision, null, this);
    this.game.physics.arcade.collide(this.weapon.bullets, this.enemy, this.bulletCollision, null, this);
    this.game.physics.arcade.overlap(this.player, this.coin1, this.coin1Collision, null, this);
    this.game.physics.arcade.overlap(this.player, this.coin5, this.coin5Collision, null, this);
    this.game.physics.arcade.overlap(this.player, this.coin10, this.coin10Collision, null, this);
    
    if(this.upKey.isDown){
        if (this.player.position.y > 100){
            this.flySound.play();
            this.flySound.volume = 0.1;
            this.player.body.velocity.y = -450;
        }
    }
    if (this.player.position.y < 100){
        this.player.body.velocity.y = 100;
    }
    if (this.fireButton.isDown){
        this.shootSound.play();
        this.weapon.fire();
    }
}

GameState.prototype.groundCollision = function(player, ground){
    this.explosion1Sound.play();
    Globals.score = this.score;
    this.game.state.start('lose');      
}

GameState.prototype.bulletCollision = function(){
    this.score += 20;
    this.weapon.killAll();
    this.explosion2Sound.play();
    this.enemy.position.x = this.game.rnd.integerInRange(900, 1300);
    this.enemy.position.y = this.game.rnd.integerInRange(150, 400);     
}

GameState.prototype.coin1Collision = function(){
    this.score += 1;
    this.coinSound.play();
    this.coin1.position.x = this.game.rnd.integerInRange(1000, 4000);
    this.coin1.position.y = this.game.rnd.integerInRange(150, 400);  
}

GameState.prototype.coin5Collision = function(){
    this.score += 5;
    this.coinSound.play();
    this.coin5.position.x = this.game.rnd.integerInRange(2000, 5000);
    this.coin5.position.y = this.game.rnd.integerInRange(150, 400);  
}

GameState.prototype.coin10Collision = function(){
    this.score += 10;
    this.coinSound.play();
    this.coin10.position.x = this.game.rnd.integerInRange(3000, 6000);
    this.coin10.position.y = this.game.rnd.integerInRange(150, 400);  
}

