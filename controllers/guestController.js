
var bcrypt = require('bcrypt');
var thanhvienModel = require('../model/thanhvien.model');
var khachhangModel = require('../model/thongtinkhachhanggiaodich.model');
var passport = require('passport');
	
var chuyenBayModel = require('../model/chuyenbay.model');
var lichTrinhModel = require('../model/lichtrinh.model');

exports.index = function (req, res, next) {
	res.render('guest/home', { title: 'Flicket' });
}
<<<<<<< HEAD
exports.index_post = function (req, res, next) {

}
exports.pick = function (req, res, next) {
	var diemdi = req.body.txtDepart;
	var diemden = req.body.txtArrive;
	var ngaydi = req.body.txtDate;
	var hangghe = req.body.txtClass;
	var adult = req.body.txtAdult;
	var kid = req.body.txtKid;
	var baby = req.body.txtBaby;
	res.send(req.body);
	Promise.all([
		chuyenBayModel.listWithDetailByParams(diemdi, diemden, ngaydi, hangghe),
		lichTrinhModel.listWithDetailByParams(diemdi, diemden, ngaydi, hangghe),
	]).then(([cb_rows, lt_rows]) => {
		var listEntity = [];

		for (var i = 0; i < cb_rows.length; i++) {

			var listLichTrinh = [];
			for (var k = 0; k < lt_rows.length; k++) {
				if (lt_rows[k].ChuyenBay === cb_rows[i].IdChuyenBay) {
					listLichTrinh.push(lt_rows[k]);
				}
			}
			var e = {
				chuyenBay: cb_rows[i],
				lichTrinh: listLichTrinh,
			};
			listEntity.push(e);
		}
		// console.log(listEntity[0].lichTrinh[0].GioCatCanh);
		res.render("guest/flight_picking", {
			list: listEntity,
			adult: adult,
			kid: kid,
			baby: baby,
			class: hangghe,
		});
	}).catch(err => {
		console.log(err);
		res.render("guest/flight_picking", {
			list: null,
			adult: adult,
			kid: kid,
			baby: baby,
			class: hangghe,
		});
	});
}
=======
>>>>>>> 14e0550b01ea500c04c4a254e825b139cb58eb23
exports.pick_post = function (req, res, next) {
	var diemdi = parseInt(req.body.txtDepart);
	var diemden = parseInt(req.body.txtArrive);
	var ngaydi = req.body.txtDate;
	var hangghe = parseInt(req.body.txtClass);
	var adult = parseInt(req.body.txtAdult);
	var kid = parseInt(req.body.txtKid);
	var baby = parseInt(req.body.txtBaby);

	Promise.all([
		chuyenBayModel.listWithDetailByParams(diemdi, diemden, ngaydi, hangghe),
		lichTrinhModel.listWithDetailByParams(diemdi, diemden, ngaydi, hangghe),
	]).then(([cb_rows, lt_rows]) => {
		var listEntity = [];

		for (var i = 0; i < cb_rows.length; i++) {

			var listLichTrinh = [];
			for (var k = 0; k < lt_rows.length; k++) {
				if (lt_rows[k].ChuyenBay === cb_rows[i].IdChuyenBay) {
					listLichTrinh.push(lt_rows[k]);
				}
			}
			var e = {
				chuyenBay: cb_rows[i],
				lichTrinh: listLichTrinh,
			};
			listEntity.push(e);
		}
		var isEmpty;
		if(listEntity.length==0){
			isEmpty = true;
		}else{
			isEmpty = false;
		}
		var userdata = {
			IdChuyenBay: 0,
			HangGhe: hangghe,
			NguoiLon: adult,
			TreEm: kid,
			EmBe: baby	
		};
		req.session.userdata = userdata;
		console.log(req.session);
		res.render("guest/flight_picking", {
			isEmpty: isEmpty,
			list: listEntity,
			adult: adult,
			kid: kid,
			baby: baby,
			class: hangghe,
		});
	}).catch(err => {
		console.log(err);
	});
}
exports.info = function (req, res, next) {
	var id = req.query.id;

	var adult = req.query.adult;
	var kid = req.query.kid;
	var baby = req.query.baby;
	var classs = req.query.class;
	Promise.all([chuyenBayModel.singleWithDetailById(id,classs),lichTrinhModel.singleWithDetailByIdChuyenBay(id)]).then(([chuyenbay,lichtrinh])=>{
<<<<<<< HEAD
		req.session.userdata.IdChuyenBay = parseInt(id);
=======
>>>>>>> 14e0550b01ea500c04c4a254e825b139cb58eb23
		res.render('guest/check_info',{
			chuyenBay: chuyenbay[0],
			lichTrinh: lichtrinh,
			adult: adult,
			kid: kid,
			baby: baby,
			class: classs
		});
	});
}
exports.passenger = function (req, res, next) {
	var id = 1;
	var adult = 2;
	var kid = 0;
	var baby = 0;
	var classs = 1;
	
	Promise.all([chuyenBayModel.singleWithDetailById(id,classs),lichTrinhModel.singleWithDetailByIdChuyenBay(id)]).then(([chuyenbay,lichtrinh])=>{
		res.render('guest/passenger_info',{
			chuyenBay: chuyenbay[0],
			lichTrinh: lichtrinh,
			adult: adult,
			kid: kid,
			baby: baby,
			class: classs
		});
	});
}
exports.passenger_post = function (req, res, next){
	// upload to session here
	
	// //redirect
	//res.redirect('/guest/payment');
	res.send(req.body);
}


exports.payment = function (req, res, next) {
	var id = 1;
	var adult = 2;
	var kid = 1;
	var baby = 1;
	var classs = 1;
	var adultName = ["Nguyen Van A","Tran Van B"];
	var kidName = [];
	var babyName = [];
	var contactName = "Nguyen Thi Ngoc Anh";
	var phone = "123123123";
	var email = "example@email.com";
	var adultLuggage = ["0","168000"];
	var kidLuggage = [];
	var babyLuggage = [];

	Promise.all([chuyenBayModel.singleWithDetailById(id,classs),lichTrinhModel.singleWithDetailByIdChuyenBay(id)]).then(([chuyenbay,lichtrinh])=>{
		res.render('guest/payment',{
			chuyenBay: chuyenbay[0],
			lichTrinh: lichtrinh,
			adult: adult,
			kid: kid,
			baby: baby,
			class: classs,
			adultName: adultName,
			kidName: kidName,
			babyName: babyName,
			contactName: contactName,
			phone: phone,
			email: email,
			adultLuggage: adultLuggage,
			kidLuggage: kidLuggage,
			babyLuggage: babyLuggage
		});
	});
}
exports.processing = function (req, res, next) {
	res.render('guest/processing');
}
exports.signup = function (req, res, next) {
	console.log('signup');
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
			res.redirect('/guest/'+id+'/edit');
            
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
    });
}
// exports.availabe_cmnd = function(req,res,next){
//     var cmnd = req.query.CMND;
//     khachhangModel.single(cmnd).then(rows => {
//         if (rows.length > 0){
//             return res.json(false);
//         } else {
//             return res.json(true);
//         }
//     });
// }
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
	console.log(req.session);
	res.render('guest/user');
}
exports.ticket = function (req, res, next) {
	res.render('guest/ticket');
}