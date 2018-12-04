'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('phaser');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint esversion:6*/


var Portal = function (_Phaser$Physics$Arcad) {
    _inherits(Portal, _Phaser$Physics$Arcad);

    function Portal(scene, x, y, keyName) {
        _classCallCheck(this, Portal);

        var spriteNumber = 0;

        var _this = _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).call(this, scene, x, y, 'spritesheet2', spriteNumber));

        _this.scene = scene;
        // enable physics
        _this.scene.physics.world.enable(_this);
        // add our player to the scene
        _this.scene.add.existing(_this);

        return _this;
    }

    _createClass(Portal, [{
        key: 'setName',
        value: function setName(name) {
            this.name = name;
        }
    }]);

    return Portal;
}(Phaser.Physics.Arcade.Sprite);

exports.default = Portal;
//# sourceMappingURL=Portal.js.map