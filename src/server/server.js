/*jshint esversion:6*/
const express = require("express");
const app = express();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
var mongoose = require("mongoose")

var conString = "mongodb://admin:rootadmin1@ds259111.mlab.com:59111/crono";

mongoose.Promise = Promise;
var Crono = mongoose.model("Crono", {
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
app.set("port", 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

server.listen( 
    app.get("port"), function() {
    console.log(`Listening on http://localhost:${server.address().port}`);
});

app.use(express.static('./dist'));

app.get('/', function (req, res) {
    res.sendFile('/index.html');
});

app.post('/getTimes', (req, res) =>{
    Crono.find({}).sort({h:1,m:1,s:1}).limit(7).exec(function(err, cronos) { res.send(cronos); });
    
});

app.post("/time", function (req, res){
    console.log(req.body);
    try {
        var crono = new Crono(req.body)
        crono.save()
        res.status(200).send('saved');
    } catch (error) {
        res.status(500).send('error');
        console.log(error);
    }
})

