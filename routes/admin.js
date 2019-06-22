var express = require('express');
var chuyenBayModel = require('../model/chuyenbay.model');
var lichTrinhModel = require('../model/lichtrinh.model');
var router = express.Router();
var passport = require('passport');
/* GET Homepage Admin */
router.get('/',function(req,res,next){
	res.redirect('/admin/login');
});

router.get('/dashboard',function(req,res,next){
	res.render('admin/dashboard',{
		layout: 'admin'
	})
})

router.get('/login',function(req,res,next){
	res.render("admin/login",{
		layout:false
	});
});

router.post('/signin',function(req,res,next){
	
	passport.authenticate('fAdmin', (err, user, info) => {
		console.log(req.body);
        if (err)
        {
            res.end('error occured.')
        }
          
        if (!user) {
            return res.render('admin/login', {
				err_message: info.message
			  })
        }
    
        req.logIn(user, err => {
            if (err){
                // return next(err);
                res.end('error occured.');
			}
			var redirectTo = "/admin/dashboard/";
        	return res.redirect(redirectTo);
        });
      })(req, res, next);
});

router.get('/change-pass',(req,res) => {
    res.render('admin/change-pass',{
        layout: 'admin'
    });
})

router.get('/logout',(req,res) => {
	req.logOut();
    res.redirect('/admin/login',{
		layout:false
	});
})
module.exports = router;