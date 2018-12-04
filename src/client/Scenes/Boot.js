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
        this.scene.start('GameScene');
    }
}

// Marcador de tiempo

$.ajax({
    type: "POST",
    url: 'getTimes',
    success:function(data){ //success es una funcion que se utiliza si el servidor retorna informacion
        data.forEach(d => {
            $('#marcador').append('<tr><td>'+d.user+'</td><td>'+d.h+':'+d.m+':'+d.s+'</td></tr>');
        });
        
    }
});