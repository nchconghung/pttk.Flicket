var chuyenBayModel = require('../model/chuyenbay.model');
var lichTrinhModel = require('../model/lichtrinh.model');

exports.index = function (req, res, next) {
	res.render('guest/home', { title: 'Flicket' });
}
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
	res.render('guest/sign_up');
}
exports.user = function (req, res, next) {
	res.render('guest/user');
}
exports.ticket = function (req, res, next) {
	res.render('guest/ticket');
}