"use strict"; //sempre começar o arquivo com essa linha

var TitleState = function(game) {};

TitleState.prototype.preload = function() {
    this.game.load.image('bg', 'assets/background.png');
     this.game.load.image('coin1', 'assets/UI/medalBronze.png');
    this.game.load.image('coin5', 'assets/UI/medalSilver.png');
    this.game.load.image('coin10', 'assets/UI/medalGold.png');
    this.game.load.spritesheet('plane','assets/Planes/planeBlue0.png', 88, 73);
    this.game.load.spritesheet('enemy','assets/Planes/planeRed0.png', 88, 73);
    this.game.load.image('zero', 'assets/Numbers/number0.png');
    this.game.load.image('one', 'assets/Numbers/number1.png');
    this.game.load.image('two', 'assets/Numbers/number2.png');
    this.game.load.image('five', 'assets/Numbers/number5.png');
    this.game.load.image('F', 'assets/Letters/letterF.png');
    this.game.load.image('L', 'assets/Letters/letterL.png');
    this.game.load.image('Y', 'assets/Letters/letterY.png');
    this.game.load.image('N', 'assets/Letters/letterN.png');
    this.game.load.image('S', 'assets/Letters/letterS.png');
    this.game.load.image('H', 'assets/Letters/letterH.png');
    this.game.load.image('O', 'assets/Letters/letterO.png');
    this.game.load.image('T', 'assets/Letters/letterT.png');
}

TitleState.prototype.create = function() {
     this.background = game.add.tileSprite(400,300,800,500,'bg');
    this.background.anchor.setTo(0.5,0.5);
    
    //TITLE
    this.f = this.game.add.sprite(150,150, 'F');
    this.f.anchor.setTo(0.5,0.5);
    this.l = this.game.add.sprite(this.f.position.x+60,150, 'L');
    this.l.anchor.setTo(0.5,0.5);
    this.y = this.game.add.sprite(this.l.position.x+60,150, 'Y');
    this.y.anchor.setTo(0.5,0.5);
    this.n = this.game.add.sprite(this.y.position.x+60,150, 'N');
    this.n.anchor.setTo(0.5,0.5);
    this.s = this.game.add.sprite(this.n.position.x+60,150, 'S');
    this.s.anchor.setTo(0.5,0.5);
    this.h = this.game.add.sprite(this.s.position.x+60,150, 'H');
    this.h.anchor.setTo(0.5,0.5);
    this.o = this.game.add.sprite(this.h.position.x+60,150, 'O');
    this.o.anchor.setTo(0.5,0.5);
    this.o_ = this.game.add.sprite(this.o.position.x+60,150, 'O');
    this.o_.anchor.setTo(0.5,0.5);
    this.t = this.game.add.sprite(this.o_.position.x+60,150, 'T');
    this.t.anchor.setTo(0.5,0.5);
    
    this.coin1 = game.add.sprite(150, 250, 'coin1');
    this.coin1.anchor.setTo(0.5,0.5);
    this.coin1.scale.setTo(0.5,0.5);
    this.equal = this.game.add.text(200, 250, "=", {fill: "#000000"});
    this.equal.anchor.setTo(0.5,0.5);
    this.one = this.game.add.sprite(250, 250, 'one');
    this.one.anchor.setTo(0.5,0.5);
    
    this.coin5 = game.add.sprite(350, 250, 'coin5');
    this.coin5.anchor.setTo(0.5,0.5);
    this.coin5.scale.setTo(0.5,0.5);
    this.equal = this.game.add.text(400, 250, "=", {fill: "#000000"});
    this.equal.anchor.setTo(0.5,0.5);
    this.five = this.game.add.sprite(450, 250, 'five');
    this.five.anchor.setTo(0.5,0.5);
    
    this.coin10 = game.add.sprite(550, 250, 'coin10');
    this.coin10.anchor.setTo(0.5,0.5);
    this.coin10.scale.setTo(0.5,0.5);
    this.equal = this.game.add.text(600, 250, "=", {fill: "#000000"});
    this.equal.anchor.setTo(0.5,0.5);
    this.one = this.game.add.sprite(650, 250, 'one');
    this.one.anchor.setTo(0.5,0.5);
    this.zero = this.game.add.sprite(700, 250, 'zero');
    this.zero.anchor.setTo(0.5,0.5);
    
    this.enemy = game.add.sprite(350, 350, 'enemy');
    this.enemy.anchor.setTo(0.5,0.5);
    this.enemy.scale.setTo(0.5,0.5);
    this.equal = this.game.add.text(400, 350, "=", {fill: "#000000"});
    this.equal.anchor.setTo(0.5,0.5);
    this.two = this.game.add.sprite(450, 350, 'two');
    this.two.anchor.setTo(0.5,0.5);
    this.zero = this.game.add.sprite(500, 350, 'zero');
    this.zero.anchor.setTo(0.5,0.5);
    
    this.inst1 = this.game.add.text(400, 400, "Pressione SETA PARA CIMA para VOAR!", {fill: "#000000"});
    this.inst2 = this.game.add.text(400, 425, "Pressione SPACEBAR para ATIRAR!", {fill: "#000000"});
    this.inst1.anchor.setTo(0.5,0.5);
    this.inst2.anchor.setTo(0.5,0.5);
    
    this.instStart = this.game.add.text(400, 500, "Pressione SPACEBAR para inciar!", {fill: "#000000"});
    this.instStart.anchor.setTo(0.5,0.5);
    
    //START BUTTON
     this.startButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    
}

TitleState.prototype.update = function() {
    if (this.startButton.isDown){
         this.game.state.start('game');  
    }
}