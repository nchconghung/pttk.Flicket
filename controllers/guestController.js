var bcrypt = require('bcrypt');
var thanhvienModel = require('../model/thanhvien.model');
var khachhangModel = require('../model/thongtinkhachhanggiaodich.model');
var passport = require('passport');
var domtoimage = require('dom-to-image');
var moment = require('moment');
var thetindungModel = require('../model/thetindung.model');
var chuyenBayModel = require('../model/chuyenbay.model');
var lichTrinhModel = require('../model/lichtrinh.model');
var giaodichModel = require('../model/giaodich.model');
var veModel = require('../model/ve.model');
var hanhkhachModel = require('../model/hanhkhach.model');
var banggiaveModel = require('../model/banggiave.model');

function randomString() {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < 10; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
exports.index = function (req, res, next) {
	res.render('guest/home', { title: 'Flicket' });
}

exports.index_post = function (req, res, next) {
	var adult = req.body.txtAdult;
	var kid = req.body.txtKid;
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
		if (listEntity.length == 0) {
			isEmpty = true;
		} else {
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
exports.pick_post = function (req, res, next) {
	var id = req.body.txtIdChuyenBay;
	//Updating session here
	req.session.userdata.IdChuyenBay = parseInt(id);
	//
	var cb = parseInt(req.session.userdata.IdChuyenBay);
	var hg = parseInt(req.session.userdata.HangGhe);
	banggiaveModel.listByChuyenBayHangGhe(cb, hg).then(rows => {
		var banggia = {
			NguoiLon: rows[0].NguoiLon,
			TreEm: rows[0].TreEm,
			EmBe: rows[0].EmBe
		};
		req.session.bgv = banggia;
		console.log("bgv");
		console.log(req.session);
		console.log('redirect');
		res.redirect("/guest/info");
	}).catch(err => {
		console.log(err);
		res.end("error occured.")
	});


}

exports.info = function (req, res, next) {

	var id = req.session.userdata.IdChuyenBay;
	var adult = req.session.userdata.NguoiLon;
	var kid = req.session.userdata.TreEm;
	var baby = req.session.userdata.EmBe;
	var classs = req.session.userdata.HangGhe;
	Promise.all([chuyenBayModel.singleWithDetailById(id, classs), lichTrinhModel.singleWithDetailByIdChuyenBay(id)]).then(([chuyenbay, lichtrinh]) => {
		req.session.userdata.IdChuyenBay = parseInt(id);
		console.log(req.session);
		res.render('guest/check_info', {
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
	var name, phone, email;
	if (req.session.passport) {
		name = req.session.passport.user.ThongTin.HoTen;
		phone = req.session.passport.user.ThongTin.SDT;
		email = req.session.passport.user.ThongTin.Email;
	}
	Promise.all([chuyenBayModel.singleWithDetailById(id, classs), lichTrinhModel.singleWithDetailByIdChuyenBay(id)]).then(([chuyenbay, lichtrinh]) => {
		res.render('guest/passenger_info', {
			chuyenBay: chuyenbay[0],
			lichTrinh: lichtrinh,
			adult: adult,
			kid: kid,
			baby: baby,
			class: classs,
			name: name,
			phone: phone,
			email: email
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
	req.session.bookingID = randomString();
	if (Array.isArray(req.body.txtAdultName)) {
		req.session.adultName = req.body.txtAdultName;
		req.session.adultBirth = req.body.txtAdultBirth;
		req.session.adultLuggage = req.body.txtAdultLuggage;
	} else {
		if (typeof req.body.txtAdultName == 'undefined') {
			req.session.adultName = [];
			req.session.adultBirth = [];
			req.session.adultLuggage = [];
		} else {
			req.session.adultName = [req.body.txtAdultName];
			req.session.adultBirth = [req.body.txtAdultBirth];
			req.session.adultLuggage = [req.body.txtAdultLuggage];
		}
	}
	if (Array.isArray(req.body.txtKidName)) {
		req.session.kidName = req.body.txtKidName;
		req.session.kidBirth = req.body.txtKidBirth;
		req.session.kidLuggage = req.body.txtKidLuggage;
	} else {
		if (typeof req.body.txtKidName == 'undefined') {
			req.session.kidName = [];
			req.session.kidBirth = [];
			req.session.kidLuggage = [];
		} else {
			req.session.kidName = [req.body.txtKidName];
			req.session.kidBirth = [req.body.txtKidBirth];
			req.session.kidLuggage = [req.body.txtKidLuggage];
		}
	}

	if (Array.isArray(req.body.txtBabyName)) {
		req.session.babyName = req.body.txtBabyName;
		req.session.babyBirth = req.body.txtBabyBirth;
		req.session.babyLuggage = req.body.txtBabyLuggage;
	} else {
		if (typeof req.body.txtBabyName == 'undefined') {
			req.session.babyName = [];
			req.session.babyBirth = [];
			req.session.babyLuggage = [];
		} else {
			req.session.babyName = [req.body.txtBabyName];
			req.session.babyBirth = [req.body.txtBabyBirth];
			req.session.babyLuggage = [req.body.txtBabyLuggage];
		}
	}
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

	var bookingID = req.session.bookingID;
	var IdCard, ExpDate, CVV, CardName;
	if (req.session.passport) {
		IdCard = req.session.passport.user.TheTinDung.SoHieuThe;
		ExpDate = req.session.passport.user.TheTinDung.NgayHetHan;
		CVV = req.session.passport.user.TheTinDung.CSC;
		CardName = req.session.passport.user.TheTinDung.HoTen;
	}
	IdCard = "4199148323555334";
	ExpDate = "05/2023";
	CVV = "122";
	CardName = "Huy Hoang";

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
			babyLuggage: babyLuggage,
			bookingID: bookingID,
			point: 0,
			IdCard: IdCard,
			ExpDate: ExpDate,
			CVV: CVV,
			CardName: CardName
		});
	});
}

exports.payment_post = function (req, res, next) {
	//Updating session here
	var card = {
		SoHieuThe: req.body.txtCardID,
		NgayHetHan: req.body.txtExpiryDate,
		CSC: req.body.txtCardCVC,
		HoTen: req.body.txtCardHolderName
	}
	req.session.card = card;
	req.session.totalAmount = req.body.txtTotalAmount;
	req.session.voucher = req.body.txtVoucher;

	res.redirect("/guest/processing")
}

exports.processing = function (req, res, next) {

	if (true) {
		var date = '01/' + req.session.card.NgayHetHan;
		var expDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
		console.log(expDate);
		var card = {
			SoHieuThe: req.session.card.SoHieuThe,
			HoTen: req.session.card.HoTen,
			CSC: req.session.card.CSC,
			NgayHetHan: expDate
		};
		thetindungModel.add(card).then(ttdid => {
			var infor = {
				HoTen: req.session.contact.name,
				Email: req.session.contact.email,
				SDT: req.session.contact.phone,
				TheTinDung: ttdid
			}
			khachhangModel.add(infor).then(idkh => {
				var now = new Date();
				var date = moment(now).format('YYYY-MM-DD hh:mm:ss');
				var giaodich = {
					KhachHangGiaoDich: idkh,
					ChuyenBay: parseInt(req.session.userdata.IdChuyenBay),
					TongGiaTri: parseFloat(req.session.totalAmount),
					DiemThuongSuDung: 0,
					ThoiDiemGiaoDich: date,
					MaDatCho: req.session.bookingID
				}
				giaodichModel.add(giaodich).then(idgd => {

					var kids = parseInt(req.session.userdata.TreEm);
					var babies = parseInt(req.session.userdata.EmBe);
					var adults = parseInt(req.session.userdata.NguoiLon);
					var machuyenbay = parseInt(req.session.userdata.IdChuyenBay);
					var hangghe = parseInt(req.session.userdata.HangGhe);

					if (adults > 0) {
						var adultLuggage = req.session.adultLuggage;
						var adultBirth = req.session.adultBirth;
						var adultName = req.session.adultName;

						for (var i = 0; i < adults; i++) {
							var ve = {
								MaVe: '21354453',
								ChuyenBay: machuyenbay,
								HangGhe: hangghe,
								LoaiHanhKhach: 3,
								GiaTien: parseFloat(req.session.bgv.NguoiLon),
								ChoNgoi: 'A324',
								HanhLy: parseInt(adultLuggage[i])
							};
							var adbd = moment(adultBirth[i], "DD/MM/YYYY").format("YYYY-MM-DD");
							var hanhkhach = {
								GiaoDich: idgd,
								HoTen: adultName[i],
								NgaySinh: adbd,
								Ve: 0
							};
							veModel.add(ve).then(idve => {

								hanhkhach.Ve = idve;

								hanhkhachModel.add(hanhkhach).catch(err => {
									console.log(err);
									res.end("error occured.")
								});
							}).catch(err => {
								console.log(err);
								res.end("error occured.")
							});
						}
					}

					if (kids > 0) {
						var kidLuggage = req.session.kidLuggage;
						var kidBirth = req.session.kidBirth;
						var kidName = req.session.kidName;
						for (var i = 0; i < kids; i++) {
							var ve = {
								MaVe: '21354453',
								ChuyenBay: machuyenbay,
								HangGhe: hangghe,
								LoaiHanhKhach: 2,
								GiaTien: parseFloat(req.session.bgv.TreEm),
								ChoNgoi: 'A324',
								HanhLy: parseInt(kidLuggage[i])
							};
							var kbd = moment(kidBirth[i], "DD/MM/YYYY").format("YYYY-MM-DD");
							var hanhkhach = {
								GiaoDich: idgd,
								HoTen: kidName[i],
								NgaySinh: kbd,
								Ve: 0
							};
							veModel.add(ve).then(idve => {
								hanhkhach.Ve = idve;
								hanhkhachModel.add(hanhkhach).catch(err => {
									console.log(err);
									res.end("error occured.")
								});
							}).catch(err => {
								console.log(err);
								res.end("error occured.")
							});
						}
					}

					if (babies > 0) {
						var babyLuggage = req.session.babyLuggage;
						var babyBirth = req.session.babyBirth;
						var babyName = req.session.babyName;
						for (var i = 0; i < babies; i++) {
							var ve = {
								MaVe: '21354453',
								ChuyenBay: machuyenbay,
								HangGhe: hangghe,
								LoaiHanhKhach: 1,
								GiaTien: req.session.bgv.EmBe,
								ChoNgoi: 'A324',
								HanhLy: parseInt(babyLuggage[i])
							};
							var bbbd = moment(babyBirth[i], "DD/MM/YYYY").format("YYYY-MM-DD");
							var hanhkhach = {
								GiaoDich: idgd,
								HoTen: babyName[i],
								NgaySinh: bbbd,
								Ve: 0
							};
							veModel.add(ve).then(idve => {
								hanhkhach.Ve = idve;
								hanhkhachModel.add(hanhkhach).catch(err => {
									console.log(err);
									res.end("error occured.")
								});
							}).catch(err => {
								console.log(err);
								res.end("error occured.")
							});
						}
					}
				}).catch(err => {
					console.log(err);
					res.end("error occured.")
				});
			}).catch(err => {
				console.log(err);
				res.end("error occured.")
			});
		}).catch(err => {
			console.log(err);
			res.end("error occured.")
		});
	}
	res.render('guest/processing');
}
exports.signup = function (req, res, next) {
	console.log('signup');
	res.render('guest/sign_up');
}
exports.signup_post = function (req, res, next) {
	var saltRounds = 10;
	bcrypt.hash(req.body.MatKhau, saltRounds, function (err, hash) {
		var member = {
			TaiKhoan: req.body.TaiKhoan,
			MatKhau: hash
		}
		thanhvienModel.add(member).then(id => {
			res.redirect('/guest/user');

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
exports.availabe_username = function (req, res, next) {
	var tk = req.query.TaiKhoan;
	thanhvienModel.singleByTaiKhoan(tk).then(rows => {
		if (rows.length > 0) {
			return res.json(false);
		} else {
			return res.json(true);
		}
	});
}
exports.dtsignin = function (req, res, next) {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
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
			if (err) {
				// return next(err);
				res.end('error occured.');
			}
			var redirectTo = "/processing/payment";
			return res.redirect(redirectTo);
		});
	})(req, res, next);
}
exports.signin_post = function (req, res, next) {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
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
			if (err) {
				// return next(err);
				res.end('error occured.');
			}
			var redirectTo = "/guest/";
			return res.redirect(redirectTo);
		});
	})(req, res, next);
}
exports.signout_post = function (req, res, next) {
	console.log("logout");
	req.logOut();
	res.redirect('/guest/');
}
exports.user = function (req, res, next) {
	console.log(req.session);
	res.render('guest/user');
}
exports.user_post = function (req, res, next) {
	res.send(req.body);
}
exports.ticket = function (req, res, next) {
	res.render('guest/ticket');
}
