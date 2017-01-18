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
      sess=req.session;	
      console.log("session\n"+sess);
    res.render('login', { title: 'Express' });
    // res.send(users);
  });
});

/* POST form. */
router.post('/', function(req, res) {
    User.findOne({ username: req.body.username }, function(err, user, password = req.body.password) {
        if (err) throw err;
        console.log(user);
        ;
        email = user.email;
        console.log(password);
        if(user === null || password === null) {
            res.redirect('login'); 
        } 
        else{
            // test a matching password
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                console.log(password, isMatch); 
                if (isMatch){
                    session=req.session;	
                    console.log('email = '+email);
                    req.session.email=email;
                    res.redirect('adduser'); 
                } 
                else res.send('Invalid entry');           
            });
        }        
    });
});

module.exports = router;