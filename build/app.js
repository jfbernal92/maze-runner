'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcelBundler = require('parcel-bundler');

var _parcelBundler2 = _interopRequireDefault(_parcelBundler);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*jshint esversion:6*/
var app = (0, _express2.default)();
var server = _http2.default.Server(app);
var bodyParser = require("body-parser");
var bundler = new _parcelBundler2.default(_path2.default.resolve(__dirname, '../client/index.html'));

//BBDD
var mongoose = require("mongoose");
var conString = "mongodb://admin:rootadmin1@ds259111.mlab.com:59111/crono";
mongoose.Promise = Promise;
var Crono = mongoose.model("Crono", {
    user: String,
    h: Number,
    m: Number,
    s: Number
});
mongoose.connect(conString, function (err) {
    if (err) {
        console.log("Database connection error:" + err);
    } else {
        console.log("Database connection OK.");
    }
});

// SERVER SETTINGS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.listen(process.env.PORT || 8080, function () {
    console.log('Listening on port: ' + server.address().port);
});

app.use('/getTimes', function (req, res) {
    Crono.find({}).sort({ h: 1, m: 1, s: 1 }).limit(7).exec(function (err, cronos) {
        res.send(cronos);
    });
});

app.post("/time", function (req, res) {
    console.log(req.body);
    try {
        var crono = new Crono(req.body);
        crono.save();
        res.status(200).send('saved');
    } catch (error) {
        res.status(500).send('error');
        console.log(error);
    }
});

app.use(bundler.middleware());
//# sourceMappingURL=app.js.map