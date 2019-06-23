var express = require('express');
var chuyenBayModel = require('../model/chuyenbay.model');
var lichTrinhModel = require('../model/lichtrinh.model');
var veModel = require('../model/ve.model');
var hhkModel = require('../model/hanghangkhong.model');
var giaodichModel = require('../model/giaodich.model');
var thanhvienModel = require('../model/thanhvien.model');
var khachhangModel = require('../model/thongtinkhachhanggiaodich.model');
var adminModel = require('../model/admin.model');
var auth = require('../middlewares/auth-admin');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt');
/* GET Homepage Admin */
router.get('/',function(req,res,next){
	res.redirect('/admin/login');
});

router.get('/dashboard',auth,function(req,res,next){
    Promise.all([
        hhkModel.count(),
        chuyenBayModel.count(),
        khachhangModel.count(),
        thanhvienModel.count(),
        giaodichModel.count(),
        veModel.count()
    ]).then(([hhk,cb,hk,tv,gd,ve])=>{
        res.render('admin/dashboard',{
            layout: 'admin',
            hhk: hhk[0].TongSoHHK,
            chuyenbay: cb[0].TongSoChuyenBay,
            khachhang: hk[0].TongSoKhachHang,
            thanhvien: tv[0].TongSoThanhVien,
            giaodich: gd[0].TongSoGiaoDich,
            ve: ve[0].TongSoVe
        })
    })
	
})

router.get('/login',function(req,res,next){
	res.render("admin/login",{
		layout:false
	});
});

router.post('/signin',function(req,res,next){
	
	passport.authenticate('admin', (err, user, info) => {
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
            console.log("success");
			var redirectTo = "/admin/dashboard/";
        	return res.redirect(redirectTo);
        });
      })(req, res, next);
});

router.get('/change-pass',auth,(req,res) => {
    res.render('admin/change-pass',{
        layout: 'admin'
    });
})

router.post('/change-pass',auth,(req,res) => {
    var ret = bcrypt.compareSync(req.body.MatKhauCu, req.session.passport.user.user.MatKhau);
    if (ret){
        var saltRounds = 10;
        var id = parseInt(req.session.passport.user.user.Id);
        bcrypt.hash(req.body.MatKhauMoi, saltRounds, function(err, hash) {
            adminModel.updatePass(id,hash).then(id => {
                res.render('admin/change-pass',{
                    layout: 'admin'
                });
            })
        })
        
    } else {
        res.render('admin/change-pass',{
            layout: 'admin',
            message: 'Vui lòng nhập đúng mật khẩu để đổi.',
            hasMess: true
        });
    }
    
})

router.get('/logout',auth,(req,res) => {
    console.log('logout');
	req.logOut();
    res.redirect('/admin/login');
})
module.exports = router;