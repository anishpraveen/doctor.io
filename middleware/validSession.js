var express = require('express');
var router = express.Router();
var sess;
router.use(function(req, res, next) {
    sess=req.session;	
    // if(sess.email){
        // console.log('Valid session');
        next();
    // }        
    // else
    //     res.redirect('/login'); 
});

module.exports = router;