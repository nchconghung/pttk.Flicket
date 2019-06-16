var bcrypt = require('bcrypt');
var thanhvienModel = require('../model/thanhvien.model');
var khachhangModel = require('../model/thongtinkhachhanggiaodich.model');
var passport = require('passport');

var chuyenBayModel = require('../model/chuyenbay.model');
var lichTrinhModel = require('../model/lichtrinh.model');

exports.index = function (req, res, next) {
	res.render('guest/home', { title: 'Flicket' });
}

exports.index_post = function(req, res, next){
	var adult= req.body.txtAdult;
	var kid= req.body.txtKid;
	var baby = req.body.txtBaby;
	var hangghe = req.body.txtClass;
	var date = req.body.txtDate;
	var depart = req.body.txtDepart;
	var arrive = req.body.txtArrive;
	//Updating session here
	var userdata = {
		IdChuyenBay: 0,
		HangGhe: hangghe,
		NguoiLon: adult,
		TreEm: kid,
		EmBe: baby	
	};
	req.session.userdata = userdata;
	req.session.date = date;
	req.session.depart = depart;
	req.session.arrive = arrive;
	console.log("Homepage session:");
	console.log(req.session);
	//
	res.redirect("/guest/pick");
}
exports.pick = function (req, res, next) {
	var diemdi = req.session.depart;
	var diemden = req.session.arrive;
	var ngaydi = req.session.date;
	var hangghe = req.session.userdata.HangGhe;
	var adult = req.session.userdata.NguoiLon;
	var kid = req.session.userdata.TreEm;
	var baby = req.session.userdata.EmBe;
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
exports.pick_post = function(req,res,next){
	var id = req.body.txtIdChuyenBay;
	//Updating session here
	req.session.userdata.IdChuyenBay = parseInt(id);
	console.log("Pick session:");
	console.log(req.session);
	//
	res.redirect("/guest/info");
}

exports.info = function (req, res, next) {
	console.log(req.session);
	var id = req.session.userdata.IdChuyenBay;
	var adult = req.session.userdata.NguoiLon;
	var kid = req.session.userdata.TreEm;
	var baby = req.session.userdata.EmBe;
	var classs = req.session.userdata.HangGhe;
	Promise.all([chuyenBayModel.singleWithDetailById(id,classs),lichTrinhModel.singleWithDetailByIdChuyenBay(id)]).then(([chuyenbay,lichtrinh])=>{
		req.session.userdata.IdChuyenBay = parseInt(id);
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
	var id = req.session.userdata.IdChuyenBay;
	var adult = req.session.userdata.NguoiLon;
	var kid = req.session.userdata.TreEm;
	var baby = req.session.userdata.EmBe;
	var classs = req.session.userdata.HangGhe;

	Promise.all([chuyenBayModel.singleWithDetailById(id, classs), lichTrinhModel.singleWithDetailByIdChuyenBay(id)]).then(([chuyenbay, lichtrinh]) => {
		res.render('guest/passenger_info', {
			chuyenBay: chuyenbay[0],
			lichTrinh: lichtrinh,
			adult: adult,
			kid: kid,
			baby: baby,
			class: classs
		});
	});
}
exports.passenger_post = function (req, res, next) {
	//upload to session here
	var contact = {
		name: req.body.txtNameContact,
		phone: req.body.txtPhoneNum,
		email: req.body.txtEmail
	}
	req.session.contact = contact;
	if(Array.isArray(req.body.txtAdultName)){
		req.session.adultName = req.body.txtAdultName;
		req.session.adultBirth = req.body.txtAdultBirth;
		req.session.adultLuggage = req.body.txtAdultLuggage;
	}else{
		if(typeof req.body.txtAdultName == 'undefined'){
			req.session.adultName = [];
			req.session.adultBirth = [];
			req.session.adultLuggage = [];
		}else{
		req.session.adultName = [req.body.txtAdultName];
		req.session.adultBirth = [req.body.txtAdultBirth];
		req.session.adultLuggage = [req.body.txtAdultLuggage];
		}
	}
	if(Array.isArray(req.body.txtKidName)){
		req.session.kidName = req.body.txtKidName;
		req.session.kidBirth = req.body.txtKidBirth;
		req.session.kidLuggage = req.body.txtKidLuggage;
	}else{
		if(typeof req.body.txtKidName == 'undefined'){
			req.session.kidName = [];
			req.session.kidBirth = [];
			req.session.kidLuggage = [];
		}else{
		req.session.kidName = [req.body.txtKidName];
		req.session.kidBirth = [req.body.txtKidBirth];
		req.session.kidLuggage = [req.body.txtKidLuggage];
		}
	}

	if(Array.isArray(req.body.txtBabyName)){
		req.session.babyName = req.body.txtBabyName;
		req.session.babyBirth = req.body.txtBabyBirth;
		req.session.babyLuggage = req.body.txtBabyLuggage;
	}else{
		if(typeof req.body.txtBabyName == 'undefined'){
			req.session.babyName = [];
			req.session.babyBirth = [];
			req.session.babyLuggage = [];
		}else{
		req.session.babyName = [req.body.txtBabyName];
		req.session.babyBirth = [req.body.txtBabyBirth];
		req.session.babyLuggage = [req.body.txtBabyLuggage];
		}
	}
	
	req.session.totalAmount = req.body.txtTotalAmount;
	console.log("Passenger session:");
	console.log(req.session);
	//
	res.redirect('/guest/payment');
}


exports.payment = function (req, res, next) {
	var id = req.session.userdata.IdChuyenBay;
	var adult = req.session.userdata.NguoiLon;
	var kid = req.session.userdata.TreEm;
	var baby = req.session.userdata.EmBe;
	var classs = req.session.userdata.HangGhe;
	var adultName = req.session.adultName;
	var kidName = req.session.kidName;
	var babyName = req.session.babyName;
	var contactName = req.session.contact.name;
	var phone = req.session.contact.phone;
	var email = req.session.contact.email;
	var adultLuggage = req.session.adultLuggage;
	var kidLuggage = req.session.kidLuggage;
	var babyLuggage = req.session.babyLuggage;
	console.log(adultName+" "+kidName+" "+babyName+" "+contactName+" "+phone+" "+email+" "+adultLuggage+" "+kidLuggage+" "+babyLuggage+" ");

	Promise.all([chuyenBayModel.singleWithDetailById(id, classs), lichTrinhModel.singleWithDetailByIdChuyenBay(id)]).then(([chuyenbay, lichtrinh]) => {
		res.render('guest/payment', {
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

exports.payment_post = function (req, res, next) {
	//Updating session here
	var card = {
		id: req.body.txtCardID,
		expDate: req.body.txtExpiryDate,
		cvc: req.body.txtCVC,
		name: req.body.txtCardHolderName
	}
	req.session.card = card;
	console.log("Payment session:");
	console.log(req.session);
	//
	res.redirect("/guest/processing")
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
