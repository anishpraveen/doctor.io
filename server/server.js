var express = require("express");
var path = require("path");

var app = express();
app.use(express.static(path.join(__dirname,"../app/dist")));
app.listen(3003,function(){
    console.log("Started listening on port", 3003);
})