var express = require('express');
var chuyenBayModel = require('../model/chuyenbay.model');
var lichTrinhModel = require('../model/lichtrinh.model');
var router = express.Router();

/* GET Homepage Admin */

router.get('/',function(req,res,next){
	res.render("admin/login",{
		layout:false
	});
});

module.exports = router;