var express = require('express');
var router = express.Router();
var Doctor = require('../model/doctors-model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Middleware */
validSession = require("../middleware/validSession");
router.use(validSession);

/* GET search page. */
router.get('/search', function(req, res, next) {
  Doctor.find({'name': {$regex: '', $options: "i"}},function(err, dr){
    // console.log(dr)
    res.render('search', { title: 'Search', doctors:dr });
  });
});
var doctor_manipulation = require("../functions/doctor-manipulation.js");
/* POST search page. */
router.post('/drlist', getList);

function getList(req, res, next) {
  var name = '';
  var name = req.body.name;
  var fee = req.body.cost.split(",");
  var days = req.body.days.split(",");
  var time = req.body.time.split(",");
  // console.log(name);
  // console.log(fee.length);
  var startTime = Math.ceil(time[0]);
  var endTime = Math.ceil(time[1]);
  // console.log("start"+ startTime);
  // console.log( endTime);
  var costRange = [];
  for (var i = 0; i < fee.length; i++) {
    switch (fee[i]) {
      case 'slab1':
        costRange.push({"clinic.cost": {$gte : 0 , $lt : 100}})
        break;
      case 'slab2':
        costRange.push({"clinic.cost": {$gte : 100 , $lt : 250}})
        break;
      case 'slab3':
        costRange.push({"clinic.cost": {$gte : 250 , $lt : 500}})
        break;
      case 'slab4':
        costRange.push({"clinic.cost": {$gte : 500 , $lt : 1000}})
        break;
      case 'slab5':
        costRange.push({"clinic.cost": {$gte : 1000 , $lt : 1500}})
        break;
      case 'slab6':
        costRange.push({"clinic.cost": {$gte : 1500 , $lt : 2000}})
        break;
      case 'slab7':
        costRange.push({"clinic.cost": {$gte : 2000 , $lt : 2500}})
        break;
    
      default:
        costRange.push({"clinic.cost": {$gte : 0 }})
        break;
    }    
  }
  var searchDays = [];
  var daysAvailable = ['mon', 'tue', 'wed', 'thr', 'fri', 'sat', 'sun'];
  for(i=0; i<days.length;i++){
    switch (days[i]) {
      case 'Monday':
          searchDays.push({'day':daysAvailable[0]});
        break;
      case 'Tuesday':
          searchDays.push({'day':daysAvailable[1]});
        break;
      case 'Wednesday':
          searchDays.push({'day':daysAvailable[2]});
        break;
      case 'Thursday':
          searchDays.push({'day':daysAvailable[3]});
        break;
      case 'Friday':
          searchDays.push({'day':daysAvailable[4]});
        break;
      case 'Saturday':
          searchDays.push({'day':daysAvailable[5]});
        break;
      case 'Sunday':
          searchDays.push({'day':daysAvailable[6]});
        break;
      default:
          searchDays.push({'day':{$in:daysAvailable}});
        break;
    }
  }
  var daySearch =[];
  console.log(searchDays);
  Doctor.find({'name': {$regex: name, $options: "i"},
                'clinic.timing':
                {$elemMatch:
                  {$and:[{'start': {$lte : startTime }},{'end': {$gte : endTime }},
                  {$or:searchDays}]}}, 
                $or:costRange} ,function(err, dr){
    if (typeof dr === 'undefined' || dr === null) {
        // variable is undefined or null
        dr.length = 0;
    }
    // console.log(dr.length);
    if(dr.length<1)
     res.send('&nbsp No results as per criteria');
    else{
      for(var count = 0; count<dr.length; count++){
        for(var countClinic = 0; countClinic<2;countClinic++){
          dr[count].clinic[countClinic].slot = [];
          var k=0;
          var slot = [];
          var startDay, endDay, time, nextDay;
          var startTime, endTime;
          for(i=0;i<6;i++){
            startDay = dr[count].clinic[countClinic].timing[i].day;
            if(dr[count].clinic[countClinic].timing[i].start<0){
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
            time = startTime+' - '+endTime;
            var startDayArr = dr[count].clinic[countClinic].timing[i];
            for(var j=i+1;j<5;j++){
              nextDay = dr[count].clinic[countClinic].timing[j];
              if(nextDay.start == startDayArr.start && nextDay.end == startDayArr.end){
                endDay = dr[count].clinic[countClinic].timing[j].day;
                i++;
              }              
              else{      
                // if(startDay==endDay)
                //   endDay = '';      
                dr[count].clinic[countClinic].slot.push({start:startDay,end:endDay,time:time});
                break;
              }              
            }
            if(j==5){
              // if(startDay==endDay)
              //     endDay = '';
              dr[count].clinic[countClinic].slot.push({start:startDay,end:endDay,time:time});           
            }
            startDay = dr[count].clinic[countClinic].timing[j].day;
          }
        }
      }
      res.render('doctors-list', { doctors:dr });
    }
      
  });
}

module.exports = router;
