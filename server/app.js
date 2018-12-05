/*jshint esversion:6*/
// Import of needed modules
import express from 'express';
import Bundler from 'parcel-bundler';
import path from 'path';
import http from 'http';

// Constants
const app = express();
const server = http.Server(app);
const bodyParser = require("body-parser");
const bundler = new Bundler(path.resolve(__dirname, '../client/index.html'));

// BBDD
var mongoose = require("mongoose");
var conString = "mongodb://admin:rootadmin1@ds259111.mlab.com:59111/crono";
mongoose.Promise = Promise;
var Crono = mongoose.model("Crono", { // My data model
    user:String,
    h: Number,
    m: Number,
    s: Number
});
mongoose.connect(conString, (err) => {
    if(err){
        console.log("Database connection error:" + err);
    }else{
        console.log("Database connection OK.");
    }
    
});


// SERVER SETTINGS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // Needed for post requests
app.use(function(req, res, next) { // Needed for different origin requests
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/*
* If the host does not assign a port it will take the 8080
*/
server.listen(process.env.PORT || 8080, function() {
    console.log(`Listening on port: ${server.address().port}`);
});


/*
* URL to obtain the records
*/
app.use('/getTimes', (req, res) =>{
    Crono.find({}).sort({h:1,m:1,s:1}).limit(7).exec(function(err, cronos) { res.send(cronos); });
    
});

/*
* URL to save a record
*/
app.post("/time", function (req, res){
    try {
        var crono = new Crono(req.body);
        crono.save();
        res.status(200).send('saved');
    } catch (error) {
        res.status(500).send('error');
        console.log(error);
    }
});


/*
* Bundler package needed to convert ES6 to ES5
*/
app.use(bundler.middleware());