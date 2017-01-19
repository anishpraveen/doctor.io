var express = require('express');
var router = express.Router();
var Doctor = require('../model/doctors-model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    res.redirect('/');
  }
  });
  
});

/* GET doctors list. */
router.get('/add-DR', function(req, res, next) {
  var dr = new Doctor();
  var days = ['mon', 'tue', 'wed', 'thr', 'fri', 'sat', 'sun'];
  var timings = [];
  for (var i = 0; i < days.length; i++){
    timings.push({day: days[i], start: 9, end: 20 }) ;
  }
  // console.log(timings);
  dr.clinic1.push({ name: 'Parkway Dental Care', address: '5250 Taylor Street, San Diego', timing: timings, cost: 1800 });
  dr.clinic2.push({ name: 'Matilda DentalCare Centre', address: '3290 Nunc. Avenue, Washington DC', timing: timings, cost: 1600 });
  dr.name = 'Michael Faradai';
  dr.image = 'images/profile/profile_pic4.png'
  dr.exp = 45;
  dr.post = 'Dental Implant Surgeon';
  dr.education = ['BDS', 'DDS', 'DMD', 'MS' ];
  // console.log(dr);
  dr.save();
  res.send(dr);
});



module.exports = router;
