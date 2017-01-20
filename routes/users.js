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
  Doctor.find({'name': {$regex: name, $options: "i"}},function(err, dr){
    console.log(dr.length);
    if(dr.length<1)
     res.send('&nbsp No results as per criteria');
    else
      res.render('doctors-list', { doctors:dr });
  });
});

module.exports = router;
