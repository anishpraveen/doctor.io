var express  = require('express');
var router   = express.Router();
var User     = require("../model/users");
var sess;

/* GET form. */
router.get('/', function(req, res) {
  User.find(function(err, user){
    res.render('login', { title: 'Express' });
  });
});

/* POST form. */
router.post('/', function(req, res) {
    User.findOne({ username: req.body.username }, function(err, user, password = req.body.password) {
        if (err) throw err;
        if(user === null || password === null) {
            res.redirect('login'); 
        } 
        else{
            // test a matching password
             email = user.email;
             user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch){
                    session=req.session;	
                    console.log('email '+email);
                    req.session.email=email;
                    req.session.user=user;
                    delete req.session.user.password;
                    res.redirect('/users/search'); 
                } 
                else res.send('Invalid entry');           
             });
        }        
    });
});

module.exports = router;