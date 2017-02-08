var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require('body-parser');
//controllers
var doctorController = require("./controllers/doctorController");

//Express request pipeline
var app = express();
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json())
app.use("/api", doctorController);

  app.use(bodyParser.urlencoded({ extended: false }));
  

app.get('/hello', function(req, res) {
    var jwt = require('jwt-simple');
var payload =  '58805b34970f632e400fd140' ;
var secret = 'QAZ!@#123';

// HS256 secrets are typically 128-bit random strings, for example hex-encoded:
// var secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex')

// encode
var token = jwt.encode(payload, secret);

// decode
var decoded = jwt.decode(token, secret);
console.log(decoded); //=> { foo: 'bar' }
  res.send({ token: token, payload:payload });
});
app.listen(3003, function () {
    console.log("Started listening on port", 3003);
});

// Connect to mongodb database
mongoose.connect("mongodb://localhost/dental");