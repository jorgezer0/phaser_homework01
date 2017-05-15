"use strict"; //sempre começar o arquivo com essa linha

var LoseState = function(game) {};

LoseState.prototype.preload = function() {
    this.game.load.image('bg', 'assets/background.png');
    this.game.load.image('gameover', 'assets/UI/textGameOver.png');
}

// create: instanciar e inicializar todos os objetos dessa scene
LoseState.prototype.create = function() {
    this.background = game.add.tileSprite(400,300,800,500,'bg');
    this.background.anchor.setTo(0.5,0.5);
    this.gameover = game.add.tileSprite(400,300,412,78,'gameover');
    this.gameover.anchor.setTo(0.5,0.5);
    
    this.msg = this.game.add.text(400, 500, "Pressione SPACE BAR para tentar novamente! ", {fill: "#000000"});
    this.msg.anchor.setTo(0.5,0.5);
    
        //START BUTTON
     this.startButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}

LoseState.prototype.update = function() {
    if (this.startButton.isDown){
         this.game.state.start('game');  
    }
}