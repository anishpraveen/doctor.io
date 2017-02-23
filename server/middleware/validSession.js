var express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var jwt = require('jwt-simple');
var JWTsecret = 'QAZ!@#123';

var bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
var sess;
var User = require("../data/users");

router.use(function (req, res, next) {
    console.log('user checking');
    var userID
    var token = req.body.jwt;
    if (token) {
        try {
            var token = req.body.jwt;
            var decoded = jwt.decode(token, JWTsecret);
            userID = decoded.userID;
            console.log(userID)
        }
        catch (err) {
            console.log(err);
            res.send({ 'response': '400', 'msg': 'Invalid entry' });
            return;
        }
        User.findOne({ _id: userID }, function (err, user) {
            if (err) throw err;
            if (user === null) {
                res.send({ 'response': '-1', 'msg': 'Invalid entry' });
                console.log('\n\Invalid')
            }
            else {
                console.log('\n\Valid')
                next();
            }
        });
    }
    else {
        console.log('\n\No token passed')
        res.send({ 'response': '-1', 'msg': 'Invalid entry' });
    }
});

module.exports = router;