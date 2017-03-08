// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const jwt = require('jwt-simple');
const winston = require('winston');
const dotenv = require('dotenv').config()
const Sequelize = require('sequelize')

const mongoose = require("mongoose");
const Doctor = require("./data/doctor");
const Sequelize_Doctor = require("./data/sequelize-doc");
const bodyParser = require('body-parser');
const User = require("../server/data/users");
const doctor_manipulation = require("./functions/doctor-manipulation.js");
const doctor_search = require("./functions/doctor-search.js");
const login_user = require("./functions/login-user.js");


const app = express();

// Setup logger
// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(winston);
app.use(session({
    store: new MongoStore({
        url: 'mongodb://heroku_s949h9sb:qlac4fjj2d9rshc4b9hjqk9dlm@ds143449.mlab.com:43449/heroku_s949h9sb'
    }),
    secret: 'QWERTY123456789',
    resave: true,
    saveUninitialized: true
}));


const JWTsecret = 'QAZ!@#123';

app.use(express.static(path.join(__dirname, 'public')));
app.get('/search', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.get('/sql', getListORM);

/* POST Login form. */
app.post('/login', login_user.login);

app.get('/api/doctors', getList);
/* Middleware */
validSession = require("./middleware/validSession");
app.use(validSession);

app.post('/api/doctors', getList);
// Always return the main index.html, so react-router render the route in the client
app.post('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


//Getting list using ORM
function getListORM(req, res, next) {
    var sequelize = new Sequelize(process.env.DB_URI);
    var Doctor = sequelize.define('doctors',
        {
            id: {
                type: Sequelize.STRING,
                field: 'id',
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                field: 'cName' // field name in database
            },
            post: {
                type: Sequelize.STRING,
                field: 'cPost'
            },
            exp: {
                type: Sequelize.STRING,
                field: 'iExperience'
            },
            image: {
                type: Sequelize.STRING,
                field: 'cImage'
            }
        },
        {
            freezeTableName: true // Model tableName will be the same as the model name
        }
    );
    var DoctorsDegree = sequelize.define('doctors_degree',
        {
            id: {
                type: Sequelize.STRING,
                field: 'id',
                primaryKey: true
            },
            iDrId: {
                type: Sequelize.STRING,
                field: 'iDrId' // field name in database
            },
            iDegreeId: {
                type: Sequelize.STRING,
                field: 'iDegreeId'
            }
        },
        {
            freezeTableName: true // Model tableName will be the same as the model name
        }
    );
    var Degree = sequelize.define('degree',
        {
            id: {
                type: Sequelize.STRING,
                field: 'id',
                primaryKey: true
            },
            cDegree: {
                type: Sequelize.STRING,
                field: 'cDegree' // field name in database
            }
        },
        {
            freezeTableName: true // Model tableName will be the same as the model name
        }
    );
    var Clinic = sequelize.define('clinic',
        {
            id: {
                type: Sequelize.STRING,
                field: 'id',
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                field: 'cName'
            },
            cost: {
                type: Sequelize.STRING,
                field: 'iCost'
            },
            address: {
                type: Sequelize.STRING,
                field: 'cAddress'
            }
        },
        {
            freezeTableName: true // Model tableName will be the same as the model name
        }
    );
    var Timings = sequelize.define('timings',
        {
            id: {
                type: Sequelize.STRING,
                field: 'id',
                primaryKey: true
            },
            iDrId: {
                type: Sequelize.STRING,
                field: 'iDrId'
            },
            iClinicId: {
                type: Sequelize.STRING,
                field: 'iClinicId'
            },
            iMonStart: {
                type: Sequelize.STRING,
                field: 'iMonStart'
            },
            iMonEnd: {
                type: Sequelize.STRING,
                field: 'iMonEnd'
            },
            iTueStart: {
                type: Sequelize.STRING,
                field: 'iTueStart'
            },
            iTueEnd: {
                type: Sequelize.STRING,
                field: 'iTueEnd'
            },
            iWedStart: {
                type: Sequelize.STRING,
                field: 'iWedStart'
            },
            iWedEnd: {
                type: Sequelize.STRING,
                field: 'iWedEnd'
            },
            iThuStart: {
                type: Sequelize.STRING,
                field: 'iThuStart'
            },
            iThuEnd: {
                type: Sequelize.STRING,
                field: 'iThuEnd'
            },
            iFriStart: {
                type: Sequelize.STRING,
                field: 'iFriStart'
            },
            iFriEnd: {
                type: Sequelize.STRING,
                field: 'iFriEnd'
            },
            iSatStart: {
                type: Sequelize.STRING,
                field: 'iSatStart'
            },
            iSatEnd: {
                type: Sequelize.STRING,
                field: 'iSatEnd'
            },
            iSunStart: {
                type: Sequelize.STRING,
                field: 'iSunStart'
            },
            iSunEnd: {
                type: Sequelize.STRING,
                field: 'iSunEnd'
            }
        },
        {
            freezeTableName: true
        }
    );
    Doctor.hasMany(DoctorsDegree, { foreignKey: 'iDrId' })
    DoctorsDegree.belongsTo(Doctor, { foreignKey: 'iDrId' })

    Degree.hasMany(DoctorsDegree, { foreignKey: 'iDegreeId' })
    DoctorsDegree.belongsTo(Degree, { foreignKey: 'iDegreeId' })

    Clinic.hasMany(Timings, { foreignKey: 'iClinicId' })
    Timings.belongsTo(Clinic, { foreignKey: 'iClinicId' })

    Doctor.hasMany(Timings, { foreignKey: 'iDrId' })
    Timings.belongsTo(Doctor, { foreignKey: 'iDrId' })

    Doctor.belongsToMany(Clinic, { through: 'timings', foreignKey: 'iDrId' });
    Clinic.belongsToMany(Doctor, { through: 'timings', foreignKey: 'iClinicId' });

    Doctor.findAll({
        attributes: ['name', 'post', 'exp', 'image'],
        where: { id: [2] },
        include: [
            {
                model: DoctorsDegree,
                attributes: ['iDrId'],
                include: [
                    {
                        model: Degree,
                        attributes: [
                            [sequelize.fn('GROUP_CONCAT', Sequelize.literal("DISTINCT cDegree SEPARATOR ', '")), 'education']
                        ]
                    }
                ]
            },
            {

                model: Clinic,
                attributes: [
                    'name', 'address', 'cost'
                ]
                // ,
                // include: [
                //     {
                //         model: Timings,
                //         attributes: [
                //             'iMonStart', 'iMonEnd', 'iTueStart', 'iTueEnd', 'iWedStart', 'iWedEnd', 'iThuStart', 'iThuStart', 'iFriStart', 'iFriEnd', 'iSatStart', 'iSatEnd', 'iSunStart', 'iSunEnd'
                //         ]
                //     }
                // ]

            }
        ],
        group: ['doctors.id', [Clinic, 'cName']]
    }).then(function (user) {
        var jsonObj = JSON.parse(JSON.stringify(user))
        var arr = Object.values(jsonObj);
        console.log(arr[0]['doctors_degrees'][0]['degree']['education'])
        res.json(user);
    });
}
//Getting list from MySQL
function getList(req, res, next) {
    winston.level = process.env.LOG_LEVEL
    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)({ filename: 'logfile.log' })
        ]
    });
    logger.log('info', 'Getting list from MySQL database');

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
            costFilter += " OR "
    }

    var searchDays = [];
    nameFilter = "doctors.cName LIKE '%" + name + "%' "

    filterQuery += "(" + timeFilter + ") AND " + costFilter + " AND " + nameFilter
    doctor_search.search(res, filterQuery)

}

//Getting list from mongoDB
function getList2(req, res, next) {
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
