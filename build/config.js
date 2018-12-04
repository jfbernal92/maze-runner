'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('phaser');

exports.default = {
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
}; /*jshint esversion:6*/

window.addEventListener('resize', function (event) {
    game.resize(window.innerWidth, window.innerHeight);
}, false);
//# sourceMappingURL=config.js.map