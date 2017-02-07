var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");

//controllers
var doctorController = require("./controllers/doctorController");

//Express request pipeline
var app = express();
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json())
app.use("/api", doctorController);

app.listen(3003, function () {
    console.log("Started listening on port", 3003);
});

// Connect to mongodb database
mongoose.connect("mongodb://localhost/dental");