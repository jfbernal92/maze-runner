'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('phaser');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _GameScene = require('./Scenes/GameScene.js');

var _GameScene2 = _interopRequireDefault(_GameScene);

var _Boot = require('./Scenes/Boot.js');

var _Boot2 = _interopRequireDefault(_Boot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint esversion:6*/


var Game = function (_Phaser$Game) {
    _inherits(Game, _Phaser$Game);

    function Game() {
        _classCallCheck(this, Game);

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, _config2.default));

        _this.scene.add('Boot', _Boot2.default);
        _this.scene.add('GameScene', _GameScene2.default);
        _this.scene.start('Boot');

        return _this;
    }

    return Game;
}(Phaser.Game);

exports.default = Game; //window.game = new Game();
//# sourceMappingURL=game.js.map