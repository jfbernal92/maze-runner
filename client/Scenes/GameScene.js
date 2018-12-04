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
        //Resize event
        this.events.on('resize', this.resize, this);


        //Objects
        this.keys = this.physics.add.group();
        this.cofre = this.physics.add.staticGroup();
        this.portals = this.physics.add.group();
        this.door = this.physics.add.staticGroup();
        this.velas = this.physics.add.group();
        this.otherPlayers = [];

        

        this.add.tileSprite(0,0,'spritesheet2'); 
        this.createMap();
       
        this.createObjects();
        
        this.createPlayer();
        this.player.keys = [];
        this.cameras.main.startFollow(this.player);
        this.cameras.main.zoom = 2.5;
        this.addCollisions();
        this.wall.setCollisionByExclusion([-1]);
       
        

        // listen for player input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);      
        
        // USER NICK NAME
        document.getElementById("formFooter").addEventListener("click", this.setPlayerName);         
       
        
    
    }

    update() {
       if(this.player.move){
        this.player.update(this.cursors); 
       }
    
    }
  
    createPlayer() {
        this.map.findObject('Player', (obj)=>{
            if(obj.type === 'StartingPosition'){
                this.player =new Player(this, obj.x, obj.y,'player');
            }
        });
        this.player.move = false;
        this.player.body.setSize(28,30);
        this.player.body.setOffset(20,30);
    }

    setPlayerName(){
        var player = self.game.scene.keys.GameScene.player;

        if($('#loginInput').val().trim() !== ''){
            player.setName($('#loginInput').val());
            player.move = true;
            player.time = new Date();
            $('#wrapper').hide();
            $('canvas').show();
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
        // Pociones
        this.map.findObject('Keys', (obj)=>{
            if(obj.type === 'key'){
                var key =new Key(this, obj.x, obj.y, obj.name);
                key.body.setSize(12,12);
                key.body.setOffset(20,20);
                key.setName(obj.name);
                this.keys.add(key);
            }
        });
        // Portales
        this.map.findObject('Portals', (obj)=>{
            if(obj.type === 'portal'){
                if(obj.name == 'theEnd'){
                    // this.door.add(portal, true); 
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
        //Velas
        this.map.findObject('Velas', (obj)=>{
            if(obj.type === 'vela'){
                var vela  = this.physics.add.sprite(obj.x, obj.y, 'spritesheet2',256);
                this.velas.add(vela);
                vela.anims.play('velaAnimation');
            }
        });

        //Cofres
        this.map.findObject('Cofres', (obj)=>{
            if(obj.type === 'cofre1'){
                var c1 = this.cofre.create(obj.x, obj.y,'spritesheet2',287,true,true);
                c1.color ="gold";
                c1.setSize(16,16);
                c1.setOffset(16,0);
               
            }else   if(obj.type === 'cofre2'){
                var c2 = this.cofre.create(obj.x, obj.y,'spritesheet2',286,true,true);
                c2.setSize(16,16);
                c2.setOffset(0,0);
            }
        });

    }

    

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
        this.cameras.main.fadeIn(2500);
        this.player.move=false;
        this.player.setVelocity(0,0);
        var play = this.player;
        setTimeout(function(){
            play.move=true;
        }, 1250);
    }
    
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

    takeKey(player, key){
        if(this.spaceKey.isDown){
            player.keys.push(key);
            key.destroy();
            this.sound.play('drink');
        }
        
    }
   
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

    addCollisions(){
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(this.portals, this.player, this.teleport,null,this);
        this.physics.add.overlap(this.keys, this.player, this.takeKey,null,this);
        this.physics.add.collider(this.player, this.door,this.teleport,null,this);
        this.physics.add.collider(this.player, this.cofre,this.openCase,null,this);



    }
    
    createMap(){
        this.map = this.make.tilemap({key:'maze1'});
        this.tiles = this.map.addTilesetImage('spritesheet2');
        this.backGroundLayer = this.map.createStaticLayer('bg', this.tiles,0,0);   
        this.wall = this.map.createStaticLayer('wall', this.tiles,0,0); 
        this.decoracion = this.map.createStaticLayer('decoracion', this.tiles,0,0);   
    }

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
