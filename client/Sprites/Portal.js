/*jshint esversion:6*/
import 'phaser';
export default class Portal extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, keyName) {
        var spriteNumber = 0; // Transparent sprite
        super(scene, x, y, 'spritesheet2', spriteNumber);
        this.scene = scene;
        // enable physics
        this.scene.physics.world.enable(this);
        // add our player to the scene
        this.scene.add.existing(this);

    }
    
    setName(name) {
        this.name= name;   
    }
    
}
