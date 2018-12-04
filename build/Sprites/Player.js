'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('phaser');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint esversion:6*/


var Player = function (_Phaser$Physics$Arcad) {
    _inherits(Player, _Phaser$Physics$Arcad);

    function Player(scene, x, y, tile) {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, scene, x, y, tile, 131));

        _this.scene = scene;
        // enable physics
        _this.scene.physics.world.enable(_this);
        // add our player to the scene
        _this.scene.add.existing(_this);
        // scale our player
        _this.setScale(0.5);
        return _this;
    }

    _createClass(Player, [{
        key: 'update',
        value: function update(cursors) {
            this.setVelocity(0);
            if (cursors.up.isDown) {
                this.go(0, -250, 'up');
            } else if (cursors.down.isDown) {
                this.go(0, 250, 'down');
            } else if (cursors.left.isDown) {
                this.go(-250, 0, 'left');
            } else if (cursors.right.isDown) {
                this.go(250, 0, 'right');
            } else {
                this.direction = 'stop';
                if (this.anims.isPlaying) {

                    this.anims.setCurrentFrame(this.anims.currentAnim.getFrameAt(0));
                }
            }
        }
    }, {
        key: 'go',
        value: function go(vX, vY, direction) {
            this.setVelocityX(vX);
            this.setVelocityY(vY);
            if (direction != this.direction) {
                this.direction = direction;
                this.anims.play(direction);
            }
        }
    }, {
        key: 'setName',
        value: function setName(name) {
            this.nickname = name;
        }
    }]);

    return Player;
}(Phaser.Physics.Arcade.Sprite);

exports.default = Player;
//# sourceMappingURL=Player.js.map