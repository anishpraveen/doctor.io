var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var User = mongoose.model('usercollection');
var User = require("../model/users");

/* GET form. */
router.get('/', function(req, res) {
  User.find(function(err, user){
    // console.log("Users list\n"+user);
    res.render(
      'userlist',
      {title : 'My funky form', users : user}
    );
    // res.send(users);
  });
});

/* POST form. */
router.post('/', function(req, res) {
  new User({username : req.body.username, email: req.body.email, password: req.body.password})
  .save(function(err, user) {
    console.log(user)
    res.redirect('adduser');
  });
});

module.exports = router;