var express = require('express');
var router = express.Router();
var sess;
router.use(function(req, res, next) {
    sess=req.session;	
    console.log('session checking');
    console.log(req.session)
    // res.redirect('/login');       
    if(typeof sess !== 'undefined' ){
        if(typeof sess.email !== 'undefined' ){
            console.log('Valid session');
            next();
        }        
    }
    else{
        console.log('no session')
        res.redirect('/login');         
    }
});

module.exports = router;