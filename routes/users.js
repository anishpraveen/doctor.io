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

/* POST search page. */
router.post('/drlist', function(req, res, next) {
  var name = '';
  var name = req.body.name;
  var fee = req.body.cost.split(",");
  var days = req.body.days.split(",");
  console.log(req.body);
  console.log(fee.length);
  console.log(days.length);
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
  var daySearch =[];
  // daySearch.push({'day': 'mon'});
  daySearch.push({'day': 'tue'});
  // daySearch.push({'day': 'wed'});
  daySearch.push({'start': {$gte : 7 , $lt : 9}});
console.log(daySearch);
  Doctor.find({'name': {$regex: name, $options: "i"},
                'clinic.timing':{$elemMatch:{$and:daySearch}}, 
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
                if(dr[count].clinic[countClinic].timing[i].start>12){
                startTime = dr[0].clinic[countClinic].timing[i].start-12;
                startTime = '0'+startTime+':00 PM';
              }
              else{
                startTime = dr[count].clinic[countClinic].timing[i].start;
                startTime = '0'+startTime+':00 AM';
              }
              if(dr[count].clinic[countClinic].timing[i].end>12){
                endTime = dr[count].clinic[countClinic].timing[i].end-12;
                endTime = '0'+endTime+':00 PM';
              }
              else{
                endTime = dr[count].clinic[countClinic].timing[i].end;
                endTime = '0'+endTime+':00 AM';
              }
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
      // delete dr.clinic[1].timing;
      console.log(dr[0].clinic[0].slot);
      res.render('doctors-list', { doctors:dr });
    }
      
  });
});

module.exports = router;
