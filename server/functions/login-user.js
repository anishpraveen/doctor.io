
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require("mongoose");
const jwt = require('jwt-simple');
const winston = require('winston');
const dotenv = require('dotenv').config()

const User = require("../data/users");


module.exports = {
    login: function (req, res) {
        winston.level = process.env.LOG_LEVEL  
        User.findOne({ username: req.body.username }, function (err, user, password = req.body.password) {
            if (err) throw err;
            if (user === null || password === null) {
                res.redirect('login');
            }
            else {
                // test a matching password
                email = user.email;
                user.comparePassword(password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        var payload = { email: email, user: user.username, userID: user._id };

                        // encode
                        var token = jwt.encode(payload, process.env.JWT_SECRET_KEY);
                        req.session.token = token;
                        res.send({ token: token });
                    }
                    else res.send({ 'msg': 'Invalid entry' });
                });
            }
        });
    }
}