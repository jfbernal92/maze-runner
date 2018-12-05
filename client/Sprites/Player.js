/*jshint esversion:6*/
import 'phaser';
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, tile) {
        super(scene, x, y, tile, 131);
        this.scene = scene;
        // enable physics
        this.scene.physics.world.enable(this);
        // add our player to the scene
        this.scene.add.existing(this);
        // scale our player
        this.setScale(0.5);
    }

    update(cursors) {
        this.setVelocity(0);
        if (cursors.up.isDown) {
            this.go(0,-250,'up');
        } else if (cursors.down.isDown) {
            this.go(0,250,'down');
        } else if (cursors.left.isDown) {
            this.go(-250,0,'left');
        } else if (cursors.right.isDown) {
            this.go(250,0,'right');
        }else{
            this.direction = 'stop';
            if(this.anims.isPlaying){
                // Stopping the current animation with a matching frame
                this.anims.setCurrentFrame(this.anims.currentAnim.getFrameAt(0));
            } 
        }
    }

    /*
    * Method to handle the animations and setting the velocity easily.
    */
    go(vX, vY, direction){
        this.setVelocityX(vX);
        this.setVelocityY(vY);
        if(direction!= this.direction){
            this.direction = direction;
            this.anims.play(direction);
        }
        
    }
   
    setName(name) {
        this.nickname = name;
    }
}
