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
app.post('/sql', getListORM);

/* POST Login form. */
app.post('/login', login_user.login);

app.get('/api/doctors', getList);
/* Middleware */
validSession = require("./middleware/validSession");
app.use(validSession);

app.post('/api/doctors', getListORM);
// Always return the main index.html, so react-router render the route in the client
app.post('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


//Getting list using ORM
function getListORM(req, res, next) {
    var sequelize = new Sequelize(process.env.DB_URI);
    // var Doctor = require('./data/sequelize-doc')
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
    // Timings.belongsTo(Clinic, { foreignKey: 'iClinicId' })

    // Doctor.hasMany(Timings, { foreignKey: 'iDrId' })
    // Timings.belongsTo(Doctor, { foreignKey: 'iDrId' })

    Doctor.belongsToMany(Clinic, { through: 'timings', foreignKey: 'iDrId' });
    Clinic.belongsToMany(Doctor, { through: 'timings', foreignKey: 'iClinicId' });

    var timeFilter = [], dayFilter = [], nameFilter = []
    var costFilter = [];
    var startTime = ['0', '0', '0', '0', '0', '0', '0'], endTime = ['0', '0', '0', '0', '0', '0', '0'];
    /* All doctors assumed to work in time 12 to 15 hrs  */
    startTime.fill('12');
    endTime.fill('15');
    winston.level = process.env.LOG_LEVEL
    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)({ filename: 'logfile.log' })
        ]
    });
    logger.log('info', 'Getting list from MySQL database using sequelize');

    var name = '';
    var name = valueValidator(req.body.name);
    var fee = valueValidator(req.body.cost);
    var days = valueValidator(req.body.days);

    var startTimeSearch, endTimeSearch;
    if (typeof req.body.time === 'undefined' || req.body.time.length == 0) {
        startTimeSearch = 9;
        endTimeSearch = 19;
    }
    else {
        var time = req.body.time.split(",");
        startTimeSearch = Math.ceil(time[0]);
        endTimeSearch = Math.ceil(time[1]);
    }
    if (days.length) {
        for (i = 0; i < days.length; i++) {
            switch (days[i]) {
                case 'Monday':
                    startTime[0] = startTimeSearch;
                    endTime[0] = endTimeSearch;
                    break;
                case 'Tuesday':
                    startTime[1] = startTimeSearch;
                    endTime[1] = endTimeSearch;
                    break;
                case 'Wednesday':
                    startTime[2] = startTimeSearch;
                    endTime[2] = endTimeSearch;
                    break;
                case 'Thursday':
                    startTime[3] = startTimeSearch;
                    endTime[3] = endTimeSearch;
                    break;
                case 'Friday':
                    startTime[4] = startTimeSearch;
                    endTime[4] = endTimeSearch;
                    break;
                case 'Saturday':
                    startTime[5] = startTimeSearch;
                    endTime[5] = endTimeSearch;
                    break;
                case 'Sunday':
                    startTime[6] = startTimeSearch;
                    endTime[6] = endTimeSearch;
                    break;
                default:
                    break;
            }
            if (i != days.length - 1)
                timeFilter += " OR "
        }
    }
    var daysAvailable = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    nameFilter.push({ name: { $like: '%' + name + '%' } })
    var costFilter = [];
    for (var i = 0; i < fee.length; i++) {
        switch (fee[i]) {
            case 'slab1':
                costFilter.push({ cost: { gte: 0, $lte: 100 } })
                break;
            case 'slab2':
                costFilter.push({ cost: { gt: 100, $lte: 250 } })
                break;
            case 'slab3':
                costFilter.push({ cost: { gt: 250, $lte: 500 } })
                break;
            case 'slab4':
                costFilter.push({ cost: { gt: 500, $lt: 1000 } })
                break;
            case 'slab5':
                costFilter.push({ cost: { gte: 1000, $lt: 1500 } })
                break;
            case 'slab6':
                costFilter.push({ cost: { gte: 1500, $lt: 2000 } })
                break;
            case 'slab7':
                costFilter.push({ cost: { gte: 2000, $lt: 2500 } })
                break;
            default:
                costFilter.push({ cost: { gt: 0 } })
                break;
        }
    }
    Doctor.findAll({
        attributes: ['id', 'name', 'post', 'exp', 'image'],
        where: {
            $and: [
                { $or: nameFilter },
                {
                    $and: [
                        sequelize.literal('i' + daysAvailable[0] + 'Start' + '<= ' + startTime[0]),
                        sequelize.literal('i' + daysAvailable[0] + 'End' + '>= ' + endTime[0]),
                        sequelize.literal('i' + daysAvailable[1] + 'Start' + '<= ' + startTime[1]),
                        sequelize.literal('i' + daysAvailable[1] + 'End' + '>= ' + endTime[1]),
                        sequelize.literal('i' + daysAvailable[2] + 'Start' + '<= ' + startTime[2]),
                        sequelize.literal('i' + daysAvailable[2] + 'End' + '>= ' + endTime[2]),
                        sequelize.literal('i' + daysAvailable[3] + 'Start' + '<= ' + startTime[3]),
                        sequelize.literal('i' + daysAvailable[3] + 'End' + '>= ' + endTime[3]),
                        sequelize.literal('i' + daysAvailable[4] + 'Start' + '<= ' + startTime[4]),
                        sequelize.literal('i' + daysAvailable[4] + 'End' + '>= ' + endTime[4]),
                        sequelize.literal('i' + daysAvailable[5] + 'Start' + '<= ' + startTime[5]),
                        sequelize.literal('i' + daysAvailable[5] + 'End' + '>= ' + endTime[5]),
                        sequelize.literal('i' + daysAvailable[6] + 'Start' + '<= ' + startTime[6]),
                        sequelize.literal('i' + daysAvailable[6] + 'End' + '>= ' + endTime[6]),
                    ]
                }
            ]
        },
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
                ],
                where: { $or: costFilter }
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
    }).then(function (ids) {
        var id = []
        for (var i = 0; i < ids.length; i++)
            id.push(ids[i]['id'])
        Doctor.findAll({
            attributes: ['id', 'name', 'post', 'exp', 'image'],
            where: { id: id },
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
                }
            ],
            group: ['doctors.id', [Clinic, 'cName']]
        }).then(function (rows) {

            if (rows != []) {
                // var jsonObj = JSON.parse(JSON.stringify(user))
                // var arr = Object.values(jsonObj);
                // console.log(arr[0]['doctors_degrees'][0]['degree']['education'])
                var objs = [];
                var dr = rows;
                var timings = []
                var clinic1Timing = []
                var clinic2Timing = []
                for (var i = 0; i < rows.length; i++) {
                    var educationRaw = rows[i]['doctors_degrees'][0]['degree']
                    var jsonObj = JSON.parse(JSON.stringify(educationRaw))
                    var education = (jsonObj['education']);

                    var clinicsRaw = rows[i]['clinics']
                    var jsonObj = JSON.parse(JSON.stringify(clinicsRaw))
                    var clinics = Object.values(jsonObj);
                    var clinic = []
                    var clinic1 = []
                    var clinic2 = []
                    var timings = []
                    var NoClinic2 = true
                    var NumberOfClinic = 1
                    if (typeof clinics[1] !== 'undefined') {
                        NoClinic2 = false
                        NumberOfClinic = 2
                    }
                    for (var j = 0; j < NumberOfClinic; j++) {
                        timings.push({ "day": "Monday", start: clinics[j].timings.iMonStart, end: clinics[j].timings.iMonEnd })
                        timings.push({ "day": "Tuesday", start: clinics[j].timings.iTueStart, end: clinics[j].timings.iTueEnd })
                        timings.push({ "day": "Wednesday", start: clinics[j].timings.iWedStart, end: clinics[j].timings.iWedEnd })
                        timings.push({ "day": "Thursday", start: clinics[j].timings.iThuStart, end: clinics[j].timings.iThuEnd })
                        timings.push({ "day": "Friday", start: clinics[j].timings.iFriStart, end: clinics[j].timings.iFriEnd })
                        timings.push({ "day": "Saturday", start: clinics[j].timings.iSatStart, end: clinics[j].timings.iSatEnd })
                        timings.push({ "day": "Sunday", start: clinics[j].timings.iSunStart, end: clinics[j].timings.iSunEnd })
                        if (j == 0)
                            clinic1Timing = timings
                        else
                            clinic2Timing = timings
                        timings = [];
                    }
                    clinic1.push({ name: clinics[0].name, address: clinics[0].address, timing: clinic1Timing, cost: clinics[0].cost })
                    clinic.push(clinic1)
                    if (!NoClinic2) {
                        clinic2.push({ name: clinics[1].name, address: clinics[1].address, timing: clinic2Timing, cost: clinics[1].cost })
                        clinic.push(clinic2)
                    }
                    objs.push({
                        name: rows[i]['name'], post: rows[i]['post'], exp: rows[i]['exp'],
                        image: rows[i]['image'], education: education,
                        clinic: [
                            // {clinic1,clinic2}
                            { name: clinics[0].name, address: clinics[0].address, timing: clinic1Timing, cost: clinics[0].cost },
                            { name: clinics[1].name, address: clinics[1].address, timing: clinic2Timing, cost: clinics[1].cost }
                        ]
                    });
                }
                if (objs)
                    res.json(objs);
                else
                    res.json({ 'response': '-1', 'msg': '&nbsp No results as per criteria.' })
            }
            else {
                res.json({ 'response': '-1', 'msg': '&nbsp No results as per criteria.' })
            }
        });
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
