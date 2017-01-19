var express = require('express');
var router = express.Router();
var User = require("../model/users");
var sess;

/* Middleware */
validSession = require("../middleware/validSession");
router.use(validSession);

/* GET form. */
router.get('/', function(req, res) {
  User.find(function(err, user){
    sess=req.session;	
    email = sess.email;
    console.log("session email:"+sess.email);
    res.render(
      'userlist',
      {title : 'My funky form', users : user, email: email}
    );
  });
});

/* POST form. */
router.post('/', function(req, res) {
  new User({username : req.body.username, email: req.body.email, password: req.body.password})
  .save(function(err, user) {
    res.redirect('adduser');
  });
});

module.exports = router;