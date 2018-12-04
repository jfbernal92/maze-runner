/*jshint esversion:6*/
import 'phaser';
export default class Key extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, keyName) {
        var spriteNumber = 0;
        switch(keyName){
            case 'keyRed':
                spriteNumber = 284;
            break;
            case 'keyGreen':
                spriteNumber = 308;
            break;
            case 'keyBlue':
                spriteNumber = 332;
            break;
            case 'keyYellow':
                spriteNumber = 331;
            break;      
        }
        super(scene, x, y, 'spritesheet2', spriteNumber);
        this.scene = scene;
        // enable physics
        this.scene.physics.world.enable(this);
        // add our player to the scene
        this.scene.add.existing(this);  
    }

    setName(name){
        this.name = name;
    }
    
}
