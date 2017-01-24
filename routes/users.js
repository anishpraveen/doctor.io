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
  Doctor.find({'name': {$regex: name, $options: "i"}, $or:costRange} ,function(err, dr){
    if (typeof dr === 'undefined' || dr === null) {
        // variable is undefined or null
        dr.length = 0;
    }
    // console.log(dr.length);
    if(dr.length<1)
     res.send('&nbsp No results as per criteria');
    else{
       dr[0].clinic[0].asd = 'aaaaa';
      // delete dr.clinic[1].timing;
      console.log(dr[0].clinic[0]);
      res.render('doctors-list', { doctors:dr });
    }
      
  });
});

module.exports = router;
