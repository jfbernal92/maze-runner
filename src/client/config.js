/*jshint esversion:6*/
import 'phaser';
export default {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    roundPixels: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    }
};
window.addEventListener('resize', function (event) {
    game.resize(window.innerWidth, window.innerHeight);

}, false);




