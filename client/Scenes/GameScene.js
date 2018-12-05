/*jshint esversion:6*/
import 'phaser';
import Player from '../Sprites/Player.js';
import Key from '../Sprites/Key.js';
import Portal from '../Sprites/Portal.js';

export default class GameScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    create() {
        // Resize windows event
        this.events.on('resize', this.resize, this);

        // Objects
        this.keys = this.physics.add.group();
        this.cofre = this.physics.add.staticGroup();
        this.portals = this.physics.add.group();
        this.door = this.physics.add.staticGroup();
        this.velas = this.physics.add.group();
        
        // The spritesheet to render the map.
        this.add.tileSprite(0,0,'spritesheet2'); 
        this.createMap();
       
        // Creating objects (keys, doors...)
        this.createObjects();
        
        // Creating player
        this.createPlayer();

        // The player start with 0 keys
        this.player.keys = [];

        // The camera will follow our player with a 2.5 zoom.
        this.cameras.main.startFollow(this.player);
        this.cameras.main.zoom = 2.5;

        // Creating collisions
        this.addCollisions();

        //Setting collisions with the wall layer
        this.wall.setCollisionByExclusion([-1]);
       
        // Player keyboard input events
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);      
        
        // Setting the player's nickname
        document.getElementById("formFooter").addEventListener("click", this.setPlayerName);         
    }

    update() {
        // If player is able to move
       if(this.player.move){
           // Handle the keyboard input in Player Class.
        this.player.update(this.cursors); 
       }
    }
  
    createPlayer() {
        // Find our entity in the map and create our player
        this.map.findObject('Player', (obj)=>{
            if(obj.type === 'StartingPosition'){
                this.player =new Player(this, obj.x, obj.y,'player');
            }
        });
        // We couldn't move until the nick will set
        this.player.move = false;
        // Setting better the player's hitbox
        this.player.body.setSize(28,30);
        this.player.body.setOffset(20,30);
    }

    setPlayerName(){
        // We need this to manage interaction with jquery and phaser
        var player = self.game.scene.keys.GameScene.player;

        // If the input in the form is not spaces or empty
        if($('#loginInput').val().trim() !== ''){
            // We call the player method to set the nickname
            player.setName($('#loginInput').val());
            // Now is able to move
            player.move = true;
            // Start the timming count
            player.time = new Date();
            // Hide the html layer to show the canvas
            $('#wrapper').hide();
            $('canvas').show();
            // Doing the 'setText' in this way to optimize memory and resolution
            $('#nick').css({
                top: $('canvas')[0].height/2 - 45 + 'px',
                left:  $('canvas')[0].width/2  - 32+ 'px',
                display: 'block'
            });
            $('#nickText').html(player.nickname);
            $('#nick').show();
        }else{
            alert("El nickname no puede estar en blanco");
        }
    }

    createObjects(){
        // Rendering the keys to open the final door
        this.map.findObject('Keys', (obj)=>{
            if(obj.type === 'key'){
                var key =new Key(this, obj.x, obj.y, obj.name);
                key.body.setSize(12,12);
                key.body.setOffset(20,20);
                key.setName(obj.name);
                this.keys.add(key);
            }
        });
        // Rendering the Portals
        this.map.findObject('Portals', (obj)=>{
            if(obj.type === 'portal'){
                if(obj.name == 'theEnd'){ // For the final door, we create a static entity.
                    var p = this.door.create(obj.x, obj.y,'spritesheet2',149,true,true);
                    p.setSize(32,24);
                    p.name ="theEnd";
                }else{
                    var portal  = new Portal(this, obj.x, obj.y, obj.name);
                    portal.setName(obj.name);
                    this.portals.add(portal);
                }
                
            }
        });
        // Rendering the Candles (Only for visual effect)
        this.map.findObject('Velas', (obj)=>{
            if(obj.type === 'vela'){
                var vela  = this.physics.add.sprite(obj.x, obj.y, 'spritesheet2',256);
                this.velas.add(vela);
                vela.anims.play('velaAnimation');
            }
        });

        // Rendering the Cases
        this.map.findObject('Cofres', (obj)=>{
            if(obj.type === 'cofre1'){ // Golden case
                var c1 = this.cofre.create(obj.x, obj.y,'spritesheet2',287,true,true);
                c1.color ="gold";
                c1.setSize(16,16);
                c1.setOffset(16,0);
            }else if(obj.type === 'cofre2'){ // Silver case
                var c2 = this.cofre.create(obj.x, obj.y,'spritesheet2',286,true,true);
                c2.setSize(16,16);
                c2.setOffset(0,0);
            }
        });
    }

    /*
    * The teleport method to handle the collision between the player and any door or  ladder.
    * We will stop the animation and hold the movement for a few seconds. Also a cammera fade will
    * improve the visual effect.
    */
    teleport(player, portal){
        this.player.anims.stop();
        switch(portal.name){
            case 'goToRed':
                player.x = this.portals.getChildren().find(portal => portal.name === 'backToRed' ).x;
                player.y = this.portals.getChildren().find(portal => portal.name === 'backToRed' ).y+42;
            break;
            case 'goToYellow':
                player.x = this.portals.getChildren().find(portal => portal.name === 'backToYellow' ).x+42;
                player.y = this.portals.getChildren().find(portal => portal.name === 'backToYellow' ).y;
            break;
            case 'backToRed':
                player.x = this.portals.getChildren().find(portal => portal.name === 'goToRed' ).x+42;
                player.y = this.portals.getChildren().find(portal => portal.name === 'goToRed' ).y;
            break;
            case 'backToYellow':  
                player.x = this.portals.getChildren().find(portal => portal.name === 'goToYellow' ).x+42;
                player.y = this.portals.getChildren().find(portal => portal.name === 'goToYellow' ).y;
            break;
            case 'theEnd': 
            // In this case, the player need 4 keys to open the final door. If he got it an ajax post
            // request will be sent to the server to save the time record. In other case, player will be
            // pushed to the death and the scene will restart.
                if(this.spaceKey.isDown){
                    this.player.move=false; 
                    var self = this;
                    if(this.player.keys.length == 4){   
                        var time = this.getCrono();      
                        $.ajax({
                            type: "POST",
                            url: 'time',
                            data: time,
                            success:function(){ 
                                // We destroy the object to change the texture frame and eliminate the collision
                                self.door.children.iterate(function (child) {
                                    child.destroy();
                                });
                                self.door.clear(true);
                                self.add.sprite(portal.x, portal.y,'spritesheet2',150);
                                self.sound.play('opened');
                                self.player.move=true; 
                            }
                        });
                    }else{
                        this.sound.play('locked');
                        this.player.y += 150;
                        this.player.anims.play('die');
                        this.time.addEvent({
                            delay: 1500,
                            callback: function(){
                                this.player.setTexture('spritesheet2',81);
                                this.player.setScale(1);
                                this.reset();
                            },
                            callbackScope:this
                        });
                    }
                }
                return;
        }
        // By default, for each ladder there is a fade efect to teleport.
        this.cameras.main.fadeIn(2500);
        this.player.move=false;
        this.player.setVelocity(0,0);
        var play = this.player;
        setTimeout(function(){
            play.move=true;
        }, 1250);
    }
    
    /*
    * Restarting the scene and setting again the name of the player to allow him move.
    */
    reset(){
        this.time.addEvent({
            delay:2500,
            callback: function(){
                this.cameras.main.fadeIn(2500);
                this.scene.restart();
                var self = this;
                setTimeout(function(){
                    self.setPlayerName();
                },2000);
               
            },
            callbackScope:this
        });
    }

    /*
    * This method will return the data to be sent to the server. It include the nickname and hours (h)
    * minutes (m) and seconds(s).
    */
    getCrono(){
        var ini = this.player.time;
        var now = new Date();

        var h = now.getHours()-ini.getHours();
        var m = now.getMinutes() - ini.getMinutes();
        var s = now.getSeconds() - ini.getSeconds();
        if(s<0){
            s=60+s;
            m--;
        }
        if(m<0){
            m=60+m;
            h--;
        }
        return {'user':this.player.nickname,'h':h,'m':m,'s':s};
    }

    /*
    * When the player press space and is colliding with a key, it will be added to keys array and deleted
    * in the scene.
    */
    takeKey(player, key){
        if(this.spaceKey.isDown){
            player.keys.push(key);
            key.destroy();
            this.sound.play('drink');
        } 
    }
   
    /*
    * Just for fun, the player can open a case and play with the coins.
    */
    openCase(player, cofre){
        if(this.spaceKey.isDown){
            this.sound.play('cofre');
            if(cofre.color == 'gold'){
                cofre.setFrame(335);
            }else{
                cofre.setFrame(334);
            }
        } 
    }

    /*
    * Creating all collisions needed
    */
    addCollisions(){
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(this.portals, this.player, this.teleport,null,this);
        this.physics.add.overlap(this.keys, this.player, this.takeKey,null,this);
        this.physics.add.collider(this.player, this.door,this.teleport,null,this);
        this.physics.add.collider(this.player, this.cofre,this.openCase,null,this);
    }
    
    /*
    * Iteration over the maze.json to print every layer in the map.
    */
    createMap(){
        this.map = this.make.tilemap({key:'maze1'});
        this.tiles = this.map.addTilesetImage('spritesheet2');
        this.backGroundLayer = this.map.createStaticLayer('bg', this.tiles,0,0);   
        this.wall = this.map.createStaticLayer('wall', this.tiles,0,0); 
        this.decoracion = this.map.createStaticLayer('decoracion', this.tiles,0,0);   
    }

    /*
    * Resize event to adjust the width and height when a user change the resolution.
    */
    resize (width, height){
        if (width === undefined) { width = this.sys.game.config.width; }
        if (height === undefined) { height = this.sys.game.config.height; }
        this.cameras.resize(width, height);
        $('#nick').css({
            top: window.innerHeight/2 - 45 + 'px',
            left: window.innerWidth/2  - 32+ 'px',
            display: 'block'
        });
        
    }
}
