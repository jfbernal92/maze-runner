/*jshint esversion:6*/
import 'phaser';
export default class BootScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }
    preload() {

        // load the map with the json
        this.load.tilemapTiledJSON('maze1', 'assets/tilemaps/maze1.json');
        // load in the spritesheet
        this.load.spritesheet('spritesheet2', 'assets/tilemaps/spritesheet2.png', { frameWidth: 32, frameHeight: 32 });

        //Player
        this.load.spritesheet('player', 'assets/tilemaps/player.png', {frameWidth:64, frameHeight:64});

        //Sounds
        this.load.audio('locked','assets/sounds/locked.mp3');
        this.load.audio('opened','assets/sounds/opened.mp3');
        this.load.audio('cofre','assets/sounds/cofre.mp3');
        this.load.audio('drink','assets/sounds/drink.mp3');

        
    }
    create() {
        //Create animations
        this.createAnimations();
        //Start the main Scene, "GameScene"
        this.scene.start('GameScene'); 
    }

    createAnimations(){
        this.anims.create({
            key: 'velaAnimation',
            frames: this.anims.generateFrameNames('spritesheet2',{start:256, end:259}),
            frameRate: 6, 
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNames('player',{start:104, end:112}),
            frameRate: 16, 
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames('player',{start:117, end:125}),
            frameRate: 16, 
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNames('player',{start:143, end:151}),
            frameRate: 16, 
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNames('player',{start:130, end:138}),
            frameRate: 16, 
            repeat: -1
        });
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNames('player',{start:260,end:265}),
            frameRate:12,
            repeat: 0
        });
        this.anims.create({
            key:'win',
            frames: this.anims.generateFrameNames('player',{start:26,end:32}),
            frameRate: 16,
            repeat:-1
        })

    }
}

//Ajax POST request to get the records solving the maze.
$.ajax({
    type: "POST",
    url: 'getTimes',
    success:function(data){ 
        data.forEach(d => { //append a new row to the table for each record.
            $('#marcador').append('<tr><td>'+d.user+'</td><td>'+d.h+':'+d.m+':'+d.s+'</td></tr>');
        });
        
    }
});