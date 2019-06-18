var express = require('express');
var chuyenBayModel = require('../model/chuyenbay.model');
var lichTrinhModel = require('../model/lichtrinh.model');
var router = express.Router();
var passport = require('passport');
/* GET Homepage Admin */
router.get('/',function(req,res,next){
	res.redirect('/admin/login');
});

router.get('/login',function(req,res,next){
	res.render("admin/login",{
		layout:false
	});
});

router.post('/login',function(req,res,next){
	passport.authenticate('admin', (err, user, info) => {
        if (err)
        {
            res.end('error occured.')
        }
          
    
        if (!user) {
            res.end(info.message)
            // return res.render('/guest/');
        //   return res.render('vwAccount/login', {
        //     layout: false,
        //     err_message: info.message
        //   })
        }
    
        req.logIn(user, err => {
            if (err){
                // return next(err);
                res.end('error occured.');
			}
			var redirectTo = "/admin/admin/index/";
        	return res.redirect(redirectTo);
        });
      })(req, res, next);
	// passport.authenticate('admin', (err, user, info) => {
	// 	if (err)
	// 	  return next(err);
	
	// 	if (!user) {
	// 	  return res.render('admin/login', {
	// 		layout: false,
	// 		err_message: info.message
	// 	  })
	// 	}
	
	// 	req.logIn(user, err => {
	// 	  if (err)
	// 		return next(err);
	// 	  return res.redirect("/admin/admin/index/");
	// 	});
	//   })(req, res, next);
});
module.exports = router;