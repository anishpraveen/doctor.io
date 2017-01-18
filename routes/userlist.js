var express = require('express');
var session		=	require('express-session');
var router = express.Router();
var mongoose = require('mongoose');
// var User = mongoose.model('usercollection');
var User = require("../model/users");
var sess;

/* GET form. */
router.get('/', function(req, res) {
  User.find(function(err, user){
    // console.log("Users list\n"+user);
    sess=req.session;	
    email = sess.email;
    // email = 'sd';
    console.log("session\n"+sess.email);
    for (var i = 0, len = sess.length; i < len; i++) {
      console.log(sess[i]);
    }
    res.render(
      'userlist',
      {title : 'My funky form', users : user, email: email}
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