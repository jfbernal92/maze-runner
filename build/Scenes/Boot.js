'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('phaser');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint esversion:6*/


var BootScene = function (_Phaser$Scene) {
    _inherits(BootScene, _Phaser$Scene);

    function BootScene(key) {
        _classCallCheck(this, BootScene);

        return _possibleConstructorReturn(this, (BootScene.__proto__ || Object.getPrototypeOf(BootScene)).call(this, key));
    }

    _createClass(BootScene, [{
        key: 'preload',
        value: function preload() {

            // load the map with the json
            this.load.tilemapTiledJSON('maze1', 'assets/tilemaps/maze1.json');
            // load in the spritesheet
            this.load.spritesheet('spritesheet2', 'assets/tilemaps/spritesheet2.png', { frameWidth: 32, frameHeight: 32 });

            //Player
            this.load.spritesheet('player', 'assets/tilemaps/player.png', { frameWidth: 64, frameHeight: 64 });

            //Sounds
            this.load.audio('locked', 'assets/sounds/locked.mp3');
            this.load.audio('opened', 'assets/sounds/opened.mp3');
            this.load.audio('cofre', 'assets/sounds/cofre.mp3');
            this.load.audio('drink', 'assets/sounds/drink.mp3');
        }
    }, {
        key: 'create',
        value: function create() {
            this.scene.start('GameScene');
            this.createAnimations();
        }
    }, {
        key: 'createAnimations',
        value: function createAnimations() {
            this.anims.create({
                key: 'velaAnimation',
                frames: this.anims.generateFrameNames('spritesheet2', { start: 256, end: 259 }),
                frameRate: 6,
                repeat: -1
            });
            this.anims.create({
                key: 'up',
                frames: this.anims.generateFrameNames('player', { start: 104, end: 112 }),
                frameRate: 16,
                repeat: -1
            });
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNames('player', { start: 117, end: 125 }),
                frameRate: 16,
                repeat: -1
            });
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNames('player', { start: 143, end: 151 }),
                frameRate: 16,
                repeat: -1
            });
            this.anims.create({
                key: 'down',
                frames: this.anims.generateFrameNames('player', { start: 130, end: 138 }),
                frameRate: 16,
                repeat: -1
            });
            this.anims.create({
                key: 'die',
                frames: this.anims.generateFrameNames('player', { start: 260, end: 265 }),
                frameRate: 12,
                repeat: 0
            });
            this.anims.create({
                key: 'win',
                frames: this.anims.generateFrameNames('player', { start: 26, end: 32 }),
                frameRate: 16,
                repeat: -1
            });
        }
    }]);

    return BootScene;
}(Phaser.Scene);

// Marcador de tiempo

exports.default = BootScene;
$.ajax({
    type: "POST",
    url: 'getTimes',
    success: function success(data) {
        //success es una funcion que se utiliza si el servidor retorna informacion
        data.forEach(function (d) {
            $('#marcador').append('<tr><td>' + d.user + '</td><td>' + d.h + ':' + d.m + ':' + d.s + '</td></tr>');
        });
    }
});
//# sourceMappingURL=Boot.js.map