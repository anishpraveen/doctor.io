var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var User = mongoose.model('usercollection');
var User = require("../model/users");

/* GET form. */
router.get('/', function(req, res) {
  User.find(function(err, user){
    // console.log("Users list\n"+user);
    res.render('login', { title: 'Express' });
    // res.send(users);
  });
});

/* POST form. */
router.post('/', function(req, res) {
//   new User({username : req.body.username, password: req.body.password})
//   .save(function(err, user) {
//     console.log(user)
//     res.redirect('adduser');
//   });
    User.findOne({ username: req.body.username }, function(err, user, password = req.body.password) {
        if (err) throw err;
        console.log(user);
        console.log(password);
        if(user === null || password === null) {
            res.redirect('login'); 
        } 
        else{
            // test a matching password
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                console.log(password, isMatch); // -> Password123: true
                if (isMatch) res.redirect('adduser'); 
                else res.send('Invalid entry');           
            });
        }        
    });
});

module.exports = router;