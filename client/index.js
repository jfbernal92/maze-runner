/*jshint esversion:6*/
/*
* This class will load the game using the Config, Boot and GameScene class.
*/
import 'phaser';
import config from './config';
import GameScene from './Scenes/GameScene.js';
import BootScene from './Scenes/Boot.js';
class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('Boot', BootScene);
        this.scene.add('GameScene', GameScene);
        this.scene.start('Boot');
      
    }
}

window.game = new Game();