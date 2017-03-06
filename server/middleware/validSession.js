const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const jwt = require('jwt-simple');
const winston = require('winston');
const dotenv = require('dotenv').config()

const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));

const User = require("../data/users");

router.use(function (req, res, next) {
    winston.level = process.env.LOG_LEVEL
    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)({ filename: 'logfile.log' })
        ]
    });
    logger.log('info', 'Validating user');
    var userID
    var token = req.body.jwt;
    if (token) {
        try {
            var token = req.body.jwt;
            var decoded = jwt.decode(token, process.env.JWT_SECRET_KEY);
            userID = decoded.userID;
            logger.log('info', 'Valid user token');
        }
        catch (err) {
            logger.log('warn', 'Invalid user token');
            logger.log('info', err);
            res.send({ 'response': '400', 'msg': 'Invalid entry' });
            return;
        }
        User.findOne({ _id: userID }, function (err, user) {
            if (err) {
                throw err;
                logger.log('error', 'Data base error');
                logger.log('info', err);
            }
            if (user === null) {
                logger.log('error', 'Invalid user');
                res.send({ 'response': '-1', 'msg': 'Invalid entry' });
            }
            else {
                logger.log('info', 'Valid user');
                next();
            }
        });
    }
    else {
        logger.log('error', 'No token passed');
        res.send({ 'response': '-1', 'msg': 'Invalid entry' });
    }
});

module.exports = router;