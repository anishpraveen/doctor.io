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
  var clinics = [];
  for (var i = 0; i < days.length; i++){
    timings.push({day: days[i], start: 9, end: 20 }) ;
  }
  {    
    // dr.clinic.push({ name: 'Parkway Dental Care', address: '5250 Taylor Street, San Diego', timing: timings, cost: 1800 })
    // dr.clinic.push({ name: 'Matilda DentalCare Centre', address: '3290 Nunc. Avenue, Washington DC', timing: timings, cost: 1600 });
    // dr.name = 'Michael Faradai';
    // dr.title = "Dr"
    // dr.image = 'images/profile/profile_pic4.png'
    // dr.exp = 45;
    // dr.post = 'Dental Implant Surgeon';
    // dr.education = ['BDS', 'DDS', 'DMD', 'MS' ];
    // dr.save();

    // dr.clinic.push({ name: 'Aspenwood Dental Associates', address: '2900 S. Peoria Street, Aurora, CO 80014', timing: timings, cost: 900 })
    // dr.clinic.push({ name: 'Smile Brands Dental Inc', address: '201 E. Sandpointe, Santa Ana, CA 92707', timing: timings, cost: 450 });
    // dr.title = "Dr"
    // dr.name = 'Caroline Barton';
    // dr.image = 'images/profile/profile_pic3.png'
    // dr.exp = 29;
    // dr.post = 'Dental Assistant';
    // dr.education = ['BDS', 'DDS', 'FICOI' ];
    // dr.save();
    
    // dr.clinic.push({ name: 'Colorado Dental Implant Center', address: '100 Florida Avenue, New Orleans, LA 70119', timing: timings, cost: 800 })
    // dr.clinic.push({ name: 'Astoria Dental Group', address: '3633 Omega Road, Dallas, TX 75244', timing: timings, cost: 600 });
    // dr.title = "Dr"
    // dr.name = 'Melissa Franklin';
    // dr.image = 'images/profile/profile_pic2.png'
    // dr.exp = 30;
    // dr.post = 'Dental Implant Surgeon';
    // dr.education = ['BDS', 'DDS', 'FICOI' ];
    // dr.save();
    
    // dr.clinic.push({ name: 'Sherman Oaks Dentistry', address: '4955 Van Nuys Blvd, Sherman Oaks, CA 91403', timing: timings, cost: 200 })
    // dr.clinic.push({ name: 'Roberts & De Marsche', address: '399 East 72nd Street, New York, NY 10021', timing: timings, cost: 200 });
    // dr.title = "Dr"
    // dr.name = 'Richard Phillips';
    // dr.image = 'images/profile/profile_pic1.png'
    // dr.exp = 18;
    // dr.post = 'Cheif Consultant ';
    // dr.education = ['BDS', 'DDS'];
    // dr.save();
    
    // dr.clinic.push({ name: 'Sherman Oaks Dentistry', address: '4955 Van Nuys Blvd, Sherman Oaks, CA 91403', timing: timings, cost: 200 })
    // dr.clinic.push({ name: 'Roberts & De Marsche', address: '399 East 72nd Street, New York, NY 10021', timing: timings, cost: 200 });
    // dr.title = "Dr"
    // dr.name = 'Johannes Kepler';
    // dr.image = 'images/profile/profile_pic.png'
    // dr.exp = 18;
    // dr.post = 'Cheif Consultant ';
    // dr.education = ['BDS', 'DDS'];
    // dr.save();
  }
  // Doctor.findOne({'name': {'$regex': 'Barton'}})
  Doctor.find({'name': {'$regex': 'lli'}},function(err, dr){
    // console.log(dr)
    res.send(dr);
  });
  // res.send(dr);
});



module.exports = router;
