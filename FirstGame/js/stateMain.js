var StateMain = {
    preload: function() {
        game.load.image("ground", "images/ground.png");
        game.load.image("hero", "images/hero.png");
        game.load.image("bar", "images/powerbar.png");
        game.load.image("block", "images/block.png");
    },
    create: function() {
        this.power = 0;
        //turn the background sky blue
        game.stage.backgroundColor = "#00ffff";
        //add the ground
        var ground = game.add.sprite(0, game.height * .9, "ground");
        //add the hero in 
        this.hero = game.add.sprite(game.width * .2, ground.y - 25, "hero");
        //add the power bar just above the head of the hero
        this.powerBar = game.add.sprite(this.hero.x + 25, this.hero.y - 25, "bar");
        this.powerBar.width = 0;
        //set listeners
        game.input.onUp.add(this.mouseUp, this);
        game.input.onDown.add(this.mouseDown, this);
    },
    mouseDown: function() {
        this.timer = game.time.events.loop(Phaser.Timer.SECOND / 1000, this.increasePower, this);
    },
    mouseUp: function() {
        game.time.events.remove(this.timer);
        this.power = 0;
        this.powerBar.width = 0;
    },
    increasePower: function() {
        this.power++;
        this.powerBar.width = this.power;
        if (this.power > 50) {
            this.power = 50;
        }
    },
    update: function() {}
}