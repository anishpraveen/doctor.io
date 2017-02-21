// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var jwt = require('jwt-simple');

var mongoose = require("mongoose");
var Doctor = require("./data/doctor");
var bodyParser = require('body-parser');
var cors = require('cors')
var User = require("../server/data/users");
var doctor_manipulation = require("./functions/doctor-manipulation.js");
var doctor_search = require("./functions/doctor-search.js");


const app = express();

// Setup logger
// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());

app.use(session({
    store: new MongoStore({
        url: 'mongodb://localhost/dental'
    }),
    secret: 'QWERTY123456789',
    resave: true,
    saveUninitialized: true
}));


var JWTsecret = 'QAZ!@#123';

app.get('/login', function (req, res) {
    res.send({ 'msg': 'Invalid entry' });
});


/* POST Login form. */
app.post('/login', function (req, res) {
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
                    // var jwt = require('jwt-simple');
                    var payload = { email: email, user: user.username, userID: user._id };


                    // HS256 secrets are typically 128-bit random strings, for example hex-encoded:
                    // var secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex')

                    // encode
                    var token = jwt.encode(payload, JWTsecret);
                    req.session.token = token;
                    res.send({ token: token });
                }
                else res.send({ 'msg': 'Invalid entry' });
            });
        }
    });
});


app.get('/api/doctors', getList);
app.post('/api/doctors', getList);
// Always return the main index.html, so react-router render the route in the client
app.post('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


function getList(req, res, next) {
    // console.log('getlist\n'+req.body.jwt)
    var filterQuery, timeFilter, dayFilter, nameFilter
    filterQuery = ' where '
    var name = '';
    var name = valueValidator(req.body.name);
    var fee = valueValidator(req.body.cost);
    var days = valueValidator(req.body.days);

    var startTime, endTime;
    if (typeof req.body.time === 'undefined' || req.body.time.length == 0) {
        startTime = 9;
        endTime = 19;
    }
    else {
        var time = req.body.time.split(",");
        startTime = Math.ceil(time[0]);
        endTime = Math.ceil(time[1]);
    }
    var daysAvailable = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    timeFilter = ""
    if (days.length) {
        for (i = 0; i < days.length; i++) {
            switch (days[i]) {
                case 'Monday':
                    timeFilter += " timings.i" + daysAvailable[0] + "Start <= " + startTime + " and timings.i" + daysAvailable[0] + "End >=" + endTime + " "
                    break;
                case 'Tuesday':
                    timeFilter += " timings.i" + daysAvailable[1] + "Start <= " + startTime + " and timings.i" + daysAvailable[1] + "End >=" + endTime + " "
                    break;
                case 'Wednesday':
                    timeFilter += " timings.i" + daysAvailable[2] + "Start <= " + startTime + " and timings.i" + daysAvailable[2] + "End >=" + endTime + " "
                    break;
                case 'Thursday':
                    timeFilter += " timings.i" + daysAvailable[3] + "Start <= " + startTime + " and timings.i" + daysAvailable[3] + "End >=" + endTime + " "
                    break;
                case 'Friday':
                    timeFilter += " timings.i" + daysAvailable[4] + "Start <= " + startTime + " and timings.i" + daysAvailable[4] + "End >=" + endTime + " "
                    break;
                case 'Saturday':
                    timeFilter += " timings.i" + daysAvailable[5] + "Start <= " + startTime + " and timings.i" + daysAvailable[5] + "End >=" + endTime + " "
                    break;
                case 'Sunday':
                    timeFilter += " timings.i" + daysAvailable[6] + "Start <= " + startTime + " and timings.i" + daysAvailable[6] + "End >=" + endTime + " "
                    break;
                default:
                    timeFilter += " timings.i" + daysAvailable[0] + "Start <= 10 and timings.i" + daysAvailable[0] + "End >= 15 "
                    break;
            }
            if (i != days.length - 1)
                timeFilter += " OR "
        }
    }
    var costFilter = [];
    for (var i = 0; i < fee.length; i++) {
        switch (fee[i]) {
            case 'slab1':
                costFilter += " clinic.iCost BETWEEN  0 and 100 "
                break;
            case 'slab2':
                costFilter += " clinic.iCost BETWEEN  100 and 250 "
                break;
            case 'slab3':
                costFilter += " clinic.iCost BETWEEN  250 and 500 "
                break;
            case 'slab4':
                costFilter += " clinic.iCost BETWEEN  500 and 1000 "
                break;
            case 'slab5':
                costFilter += " clinic.iCost BETWEEN  1000 and 1500 "
                break;
            case 'slab6':
                costFilter += " clinic.iCost BETWEEN  1500 and 2000 "
                break;
            case 'slab7':
                costFilter += " clinic.iCost BETWEEN  2000 and 2500 "
                break;

            default:
                costFilter = " clinic.iCost >= 0 "
                break;
        }
        if (i != fee.length - 1)
            costFilter += " AND "
    }

    var searchDays = [];
    nameFilter = "doctors.cName LIKE '%" + name + "%' "

    filterQuery += "(" + timeFilter + ") AND " + costFilter + " AND " + nameFilter
    // doctor_search.search(res, filterQuery)

    var userID
    try {
        var token = req.body.jwt
        var decoded = jwt.decode(token, JWTsecret);
        userID = decoded.userID
    }
    catch (err) {
        console.log(err);
        res.send({ 'response': '400','msg': 'Invalid entry' });
        return;
    }
    // console.log('check user')
    User.findOne({ _id: userID }, function (err, user) {
        if (err) throw err;
        if (user === null) {
            res.send({ 'response': '-1','msg': 'Invalid entry' });
            console.log('\n\Invalid')
        }
        else {
            doctor_search.search(res, filterQuery)
        }
    });

    // console.log('\n\ncompleted')
}


function getList2(req, res, next) {
    // console.log(req.rawHeaders)
    var name = '';
    var name = valueValidator(req.body.name);
    var fee = valueValidator(req.body.cost);
    var days = valueValidator(req.body.days);
    // var fee = 'slab2';
    // var days = 'Monday';
    var startTime, endTime;
    if (typeof req.body.time === 'undefined' || req.body.time.length == 0) {
        startTime = 9;
        endTime = 19;
    }
    else {
        var time = req.body.time.split(",");
        startTime = Math.ceil(time[0]);
        endTime = Math.ceil(time[1]);
    }

    var costRange = [];
    for (var i = 0; i < fee.length; i++) {
        switch (fee[i]) {
            case 'slab1':
                costRange.push({ "clinic.cost": { $gte: 0, $lt: 100 } })
                break;
            case 'slab2':
                costRange.push({ "clinic.cost": { $gte: 100, $lt: 250 } })
                break;
            case 'slab3':
                costRange.push({ "clinic.cost": { $gte: 250, $lt: 500 } })
                break;
            case 'slab4':
                costRange.push({ "clinic.cost": { $gte: 500, $lt: 1000 } })
                break;
            case 'slab5':
                costRange.push({ "clinic.cost": { $gte: 1000, $lt: 1500 } })
                break;
            case 'slab6':
                costRange.push({ "clinic.cost": { $gte: 1500, $lt: 2000 } })
                break;
            case 'slab7':
                costRange.push({ "clinic.cost": { $gte: 2000, $lt: 2500 } })
                break;

            default:
                costRange.push({ "clinic.cost": { $gte: 0 } })
                break;
        }
    }
    var searchDays = [];
    var daysAvailable = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for (i = 0; i < days.length; i++) {
        switch (days[i]) {
            case 'Monday':
                searchDays.push({ 'day': daysAvailable[0] });
                break;
            case 'Tuesday':
                searchDays.push({ 'day': daysAvailable[1] });
                break;
            case 'Wednesday':
                searchDays.push({ 'day': daysAvailable[2] });
                break;
            case 'Thursday':
                searchDays.push({ 'day': daysAvailable[3] });
                break;
            case 'Friday':
                searchDays.push({ 'day': daysAvailable[4] });
                break;
            case 'Saturday':
                searchDays.push({ 'day': daysAvailable[5] });
                break;
            case 'Sunday':
                searchDays.push({ 'day': daysAvailable[6] });
                break;
            default:
                searchDays.push({ 'day': { $in: daysAvailable } });
                break;
        }
    }
    var daySearch = [];

    Doctor.find({
        'name': { $regex: name, $options: "i" },
        'clinic.timing':
        {
            $elemMatch:
            {
                $and: [{ 'start': { $lte: startTime } }, { 'end': { $gte: endTime } },
                { $or: searchDays }]
            }
        },
        $or: costRange
    }, function (err, dr) {
        if (typeof dr === 'undefined' || dr === null) {
            // variable is undefined or null
            dr.length = 0;
        }
        if (dr.length < 1) {
            dr.push({ 'response': '-1' });
            dr.push({ 'msg': '&nbsp No results as per criteria.' });
            res.json(dr);
        }
        else {
            for (var count = 0; count < dr.length; count++) {
                for (var countClinic = 0; countClinic < 2; countClinic++) {
                    dr[count].clinic[countClinic].slot = new Array;
                    var k = 0;
                    var slot = [];
                    var startDay, endDay, time, nextDay;
                    var startTime, endTime;
                    for (i = 0; i < 6; i++) {
                        startDay = dr[count].clinic[countClinic].timing[i].day;
                        if (dr[count].clinic[countClinic].timing[i].start < 0) {
                            continue;
                        }
                        endDay = dr[count].clinic[countClinic].timing[i].day;
                        // Time manipulation
                        {
                            startTime = dr[count].clinic[countClinic].timing[i].start;
                            startTime = doctor_manipulation.getTime(startTime);
                            endTime = dr[count].clinic[countClinic].timing[i].end;
                            endTime = doctor_manipulation.getTime(endTime);
                        }
                        time = startTime + ' - ' + endTime;
                        var startDayArr = dr[count].clinic[countClinic].timing[i];
                        for (var j = i + 1; j < 5; j++) {
                            nextDay = dr[count].clinic[countClinic].timing[j];
                            if (nextDay.start == startDayArr.start && nextDay.end == startDayArr.end) {
                                endDay = dr[count].clinic[countClinic].timing[j].day;
                                i++;
                            }
                            else {
                                if (startDay == endDay)
                                    endDay = '';
                                dr[count].clinic[countClinic].slot.push({ start: startDay, end: endDay, time: time });
                                break;
                            }
                        }
                        if (j == 5) {
                            if (startDay == endDay)
                                endDay = '';
                            dr[count].clinic[countClinic].slot.push({ start: startDay, end: endDay, time: time });
                        }
                        startDay = dr[count].clinic[countClinic].timing[j].day;
                    }
                }
            }
            res.json(dr);
        }

    });
}

function valueValidator(value) {
    if (typeof value === 'undefined') {
        return ' ';
    }
    else
        return value.split(',');

}
module.exports = app;
