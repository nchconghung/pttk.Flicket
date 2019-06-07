var express = require('express');
var router = express.Router();

/* GET Homepage Admin */

router.get('/',function(req,res,next){
	res.render("admin/vwChuyenBay/search",{layout:'admin'});
});

module.exports = router;

