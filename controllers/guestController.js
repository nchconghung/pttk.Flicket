var bcrypt = require('bcrypt');
var thanhvienModel = require('../model/thanhvien.model');
var khachhangModel = require('../model/thongtinkhachhanggiaodich.model');
var passport = require('passport');

exports.index = function(req,res,next){
    console.log(req.session);
    res.render('guest/home',{title: 'Flicket'});
}
exports.pick = function(req,res,next){
    console.log(req.session);
    res.render('guest/flight_picking');
}
exports.pick_post = function(req,res,next){
    console.log(req.session);
    res.send(req.body);
}
exports.info = function(req,res,next){
    console.log(req.session);
    res.render('guest/check_info');
}
exports.passenger = function(req,res,next){
    res.render('guest/passenger_info');
}
exports.payment = function(req,res,next){
    console.log(req.originalUrl);
    res.render('guest/payment');
}
exports.processing = function(req,res,next){
    res.render('guest/processing');
}
exports.signup = function(req,res,next){
    res.render('guest/sign_up');
}
exports.signup_post = function(req,res,next){
    var saltRounds = 10;
    bcrypt.hash(req.body.MatKhau, saltRounds, function(err, hash) {
        var member = {
            TaiKhoan: req.body.TaiKhoan,
            MatKhau: hash
        }
        thanhvienModel.add(member).then(id =>{
            var customer = {
                CMND: req.body.CMND,
                IdThanhVien: id
            };
            khachhangModel.add(customer).then(id => {
                res.redirect('/guest/:'+id+'/edit');
            }).catch(err => {
                console.log(err);
                res.end("error occured.")
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
    });
}
exports.availabe_cmnd = function(req,res,next){
    var cmnd = req.query.CMND;
    khachhangModel.single(cmnd).then(rows => {
        if (rows.length > 0){
            return res.json(false);
        } else {
            return res.json(true);
        }
    });
}
exports.availabe_username = function(req,res,next){
    var tk = req.query.TaiKhoan;
    thanhvienModel.singleByTaiKhoan(tk).then(rows => {
        if (rows.length > 0){
            return res.json(false);
        } else {
            return res.json(true);
        }
    });
}
exports.signin_post = function(req,res,next){
    passport.authenticate('local', (err, user, info) => {
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
            req.session.username=user.TaiKhoan;
            req.session.pass = user.MatKhau;
          return res.redirect('/guest/info');
        });
      })(req, res, next);
}

exports.signout_post = function(req,res,next){
    console.log("logout");
    req.logOut();
    res.redirect('/guest/');
}

exports.user = function(req,res,next){
    res.render('guest/user');
}
exports.ticket = function(req,res,next){
    res.render('guest/ticket');
}