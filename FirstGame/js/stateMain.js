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
        this.ground = game.add.sprite(0, game.height * .9, "ground");
		
        //add the hero in 
        this.hero = game.add.sprite(game.width * .2, this.ground.y - 25, "hero");
        //add the power bar just above the head of the hero
        this.powerBar = game.add.sprite(this.hero.x + 25, this.hero.y - 25, "bar");
        this.powerBar.width = 0;
       
        
		
        

		//start the physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //enable the hero for physics
        game.physics.enable(this.hero, Phaser.Physics.ARCADE);
        game.physics.enable(this.ground, Phaser.Physics.ARCADE);
		
		this.hero.body.gravity.y = 200;
        this.hero.body.collideWorldBounds = true;
        this.ground.body.immovable = true;
		
		//record the initial position
		this.startY = this.hero.y;
		
		//set listeners
		game.input.onDown.add(this.mouseDown, this);
		
		this.blocks = game.add.group();
    },
    mouseDown: function() {
		
		if (this.hero.y != this.startY) {
			return;
		}
		
		game.input.onDown.remove(this.mouseDown, this);
        this.timer = game.time.events.loop(Phaser.Timer.SECOND / 1000, this.increasePower, this);
		game.input.onUp.add(this.mouseUp, this);
    },
    mouseUp: function() {
		game.input.onUp.add(this.mouseUp, this);
		this.doJump();
        game.time.events.remove(this.timer);
        this.power = 0;
        this.powerBar.width = 0;
		game.input.onDown.add(this.mouseDown, this);
    },
    increasePower: function() {
        this.power++;
        this.powerBar.width = this.power;
        if (this.power > 50) {
            this.power = 50;
        }
    },
	doJump: function() {
        this.hero.body.velocity.y = -this.power * 12;
    },
    update: function() {
		 game.physics.arcade.collide(this.hero, this.ground);
		
	},
	makeBlocks: function() {
        var wallHeight=game.rnd.integerInRange(2, 6);
        for (var i = 0; i < wallHeight; i++) {
            var block = game.add.sprite(0, -i * 25, "block");
            this.blocks.add(block);
        }
    }
}