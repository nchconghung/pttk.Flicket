var bcrypt = require('bcrypt');
var thanhvienModel = require('../model/thanhvien.model');
var khachhangModel = require('../model/thongtinkhachhanggiaodich.model');
var passport = require('passport');
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
	console.log(req.session);
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
		if(listEntity.length == 0){
			isEmpty = true;
		}
		else{
			isEmpty = false;
		}
		console.log("isEmpty: "+isEmpty);
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
	//
	var cb = parseInt(req.session.userdata.IdChuyenBay);
	var hg = parseInt(req.session.userdata.HangGhe);
	banggiaveModel.listByChuyenBayHangGhe(cb,hg).then(rows => {
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
	Promise.all([chuyenBayModel.singleWithDetailById(id,classs),lichTrinhModel.singleWithDetailByIdChuyenBay(id)]).then(([chuyenbay,lichtrinh])=>{
		req.session.userdata.IdChuyenBay = parseInt(id);
		console.log(req.session);
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
	req.session.bookingID = randomString();
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
			point: 0
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
	//console.log(req.session);
	var promise1;
	var date = '01/'+req.session.card.NgayHetHan;
	var expDate = moment(date,'DD/MM/YYYY').format('YYYY-MM-DD');
	

	if (!req.user){
		var card = {
			SoHieuThe: req.session.card.SoHieuThe,
			HoTen: req.session.card.HoTen,
			CSC: req.session.card.CSC,
			NgayHetHan: expDate
		};
		promise1 = new Promise(function(resolve, reject) {
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
					};
					resolve(giaodich);
				}).catch(err => {
					console.log(err);
					res.end("error occured.")
				});
			}).catch(err => {
				console.log(err);
				res.end("error occured.")
			});
			
		});
	} else {
		var card = {
			IdThe: parseInt(req.session.passport.user.TheTinDung.IdThe),
			SoHieuThe: req.session.card.SoHieuThe,
			HoTen: req.session.card.HoTen,
			CSC: req.session.card.CSC,
			NgayHetHan: expDate
		};
		promise1 = new Promise(function(resolve, reject) {
			thetindungModel.update(card).then(ttdid => {
				var infor = {
					IdKhachHang: parseInt(req.session.passport.user.ThongTin.IdKhachHang),
					HoTen: req.session.contact.name,
					Email: req.session.contact.email,
					SDT: req.session.contact.phone,
					TheTinDung: req.session.passport.user.ThongTin.TheTinDung
				}

				req.session.passport.user.TheTinDung.SoHieuThe = req.session.card.CSC.SoHieuThe;
				req.session.passport.user.TheTinDung.HoTen = req.session.card.HoTen;
				req.session.passport.user.TheTinDung.CSC = req.session.card.CSC;
				req.session.passport.user.TheTinDung.NgayHetHan = expDate;

				khachhangModel.update(infor).then(idkh => {
					var point =0;
					
					// if (req.session.voucher === '0'){
					// 	point = 0;
					// } else {
					// 	if (req.session.voucher === '1')
					// 	{
					// 		point = 200;
					// 	} else {
					// 		point = 450;
					// 	}
					// 	req.session.passport.user.DiemThuong = parseInt(req.session.passport.user.DiemThuong) - point;
					// 	var point = parseInt(req.session.passport.user.DiemThuong);
					// 	thanhvienModel.updatePoint(point,req.session.passport.user.TaiKhoan.IdThanhVien).catch(err => {
					// 		console.log(err);
					// 		res.end("error occured.")
					// 	});
					// }

					req.session.passport.user.ThongTin.HoTen = req.session.contact.name;
					req.session.passport.user.Email = req.session.contact.email;
					req.session.passport.user.SDT = req.session.contact.phone;
					

					var now = new Date();
					var date = moment(now).format('YYYY-MM-DD hh:mm:ss');
					var giaodich = {
						KhachHangGiaoDich: parseInt(req.session.passport.user.ThongTin.IdKhachHang),
						ChuyenBay: parseInt(req.session.userdata.IdChuyenBay),
						TongGiaTri: parseFloat(req.session.totalAmount),
						DiemThuongSuDung: point,
						ThoiDiemGiaoDich: date,
						MaDatCho: req.session.bookingID
					};
					resolve(giaodich);
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
	
	promise1.then(function(value) {
		console.log(value);
		giaodichModel.add(value).then(idgd => {
					
			var kids = parseInt(req.session.userdata.TreEm);
			var babies = parseInt(req.session.userdata.EmBe);
			var adults = parseInt(req.session.userdata.NguoiLon);
			var machuyenbay = parseInt(req.session.userdata.IdChuyenBay);
			var hangghe = parseInt(req.session.userdata.HangGhe);
	
			if (adults > 0) {
				var adultLuggage = req.session.adultLuggage;
				var adultBirth  = req.session.adultBirth;
				var adultName = req.session.adultName;
	
				for (var i = 0;i<adults;i++){
					var ve = {
						MaVe: '21354453',
						ChuyenBay: machuyenbay,
						HangGhe: hangghe,
						LoaiHanhKhach: 3,
						GiaTien: parseFloat(req.session.bgv.NguoiLon),
						ChoNgoi: 'A324',
						HanhLy: parseInt(adultLuggage[i])
					};
					var adbd = moment(adultBirth[i],"DD/MM/YYYY").format("YYYY-MM-DD");
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
				for (var i = 0;i<kids;i++){
					var ve = {
						MaVe: '21354453',
						ChuyenBay: machuyenbay,
						HangGhe: hangghe,
						LoaiHanhKhach: 2,
						GiaTien: parseFloat(req.session.bgv.TreEm),
						ChoNgoi: 'A324',
						HanhLy: parseInt(kidLuggage[i])
					};
					var kbd = moment(kidBirth[i],"DD/MM/YYYY").format("YYYY-MM-DD");
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
				for (var i = 0;i<babies;i++){
					var ve = {
						MaVe: '21354453',
						ChuyenBay: machuyenbay,
						HangGhe: hangghe,
						LoaiHanhKhach: 1,
						GiaTien: req.session.bgv.EmBe,
						ChoNgoi: 'A324',
						HanhLy: parseInt(babyLuggage[i])
					};
					var bbbd = moment(babyBirth[i],"DD/MM/YYYY").format("YYYY-MM-DD");
					var hanhkhach = {
						GiaoDich: idgd,
						HoTen: babyName[i],
						NgaySinh: bbbd,
						Ve: 0
					};
					veModel.add(ve).then(idve => {
						hanhkhach.Ve=idve;
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
	  });
	res.render('guest/processing');
}

// exports.processing = function (req, res, next) {
// 	console.log(req.session);
// 	if (true){
// 		var date = '01/'+req.session.card.NgayHetHan;
// 		var expDate = moment(date,'DD/MM/YYYY').format('YYYY-MM-DD');
		
// 		var card = {
// 			SoHieuThe: req.session.card.SoHieuThe,
// 			HoTen: req.session.card.HoTen,
// 			CSC: req.session.card.CSC,
// 			NgayHetHan: expDate
// 		};
// 		thetindungModel.add(card).then(ttdid => {
// 			var infor = {
// 				HoTen: req.session.contact.name,
// 				Email: req.session.contact.email,
// 				SDT: req.session.contact.phone,
// 				TheTinDung: ttdid
// 			}
// 			khachhangModel.add(infor).then(idkh => {
// 				var now = new Date();
//   				var date = moment(now).format('YYYY-MM-DD hh:mm:ss');
// 				var giaodich = {
// 					KhachHangGiaoDich: idkh,
// 					ChuyenBay: parseInt(req.session.userdata.IdChuyenBay),
// 					TongGiaTri: parseFloat(req.session.totalAmount),
// 					DiemThuongSuDung: 0,
// 					ThoiDiemGiaoDich: date,
// 					MaDatCho: req.session.bookingID
// 				}
// 				giaodichModel.add(giaodich).then(idgd => {
					
// 					var kids = parseInt(req.session.userdata.TreEm);
// 					var babies = parseInt(req.session.userdata.EmBe);
// 					var adults = parseInt(req.session.userdata.NguoiLon);
// 					var machuyenbay = parseInt(req.session.userdata.IdChuyenBay);
// 					var hangghe = parseInt(req.session.userdata.HangGhe);

// 					if (adults > 0) {
// 						var adultLuggage = req.session.adultLuggage;
// 						var adultBirth  = req.session.adultBirth;
// 						var adultName = req.session.adultName;

// 						for (var i = 0;i<adults;i++){
// 							var ve = {
// 								MaVe: '21354453',
// 								ChuyenBay: machuyenbay,
// 								HangGhe: hangghe,
// 								LoaiHanhKhach: 3,
// 								GiaTien: parseFloat(req.session.bgv.NguoiLon),
// 								ChoNgoi: 'A324',
// 								HanhLy: parseInt(adultLuggage[i])
// 							};
// 							var adbd = moment(adultBirth[i],"DD/MM/YYYY").format("YYYY-MM-DD");
// 							var hanhkhach = {
// 								GiaoDich: idgd,
// 								HoTen: adultName[i],
// 								NgaySinh: adbd,
// 								Ve: 0
// 							};
// 							veModel.add(ve).then(idve => {
								
// 								hanhkhach.Ve = idve;
								
// 								hanhkhachModel.add(hanhkhach).catch(err => {
// 									console.log(err);
// 									res.end("error occured.")
// 								});
// 							}).catch(err => {
// 								console.log(err);
// 								res.end("error occured.")
// 							});
// 						}
// 					}

// 					if (kids > 0) {
// 						var kidLuggage = req.session.kidLuggage;
// 						var kidBirth = req.session.kidBirth;
// 						var kidName = req.session.kidName;
// 						for (var i = 0;i<kids;i++){
// 							var ve = {
// 								MaVe: '21354453',
// 								ChuyenBay: machuyenbay,
// 								HangGhe: hangghe,
// 								LoaiHanhKhach: 2,
// 								GiaTien: parseFloat(req.session.bgv.TreEm),
// 								ChoNgoi: 'A324',
// 								HanhLy: parseInt(kidLuggage[i])
// 							};
// 							var kbd = moment(kidBirth[i],"DD/MM/YYYY").format("YYYY-MM-DD");
// 							var hanhkhach = {
// 								GiaoDich: idgd,
// 								HoTen: kidName[i],
// 								NgaySinh: kbd,
// 								Ve: 0
// 							};
// 							veModel.add(ve).then(idve => {
// 								hanhkhach.Ve = idve;
// 								hanhkhachModel.add(hanhkhach).catch(err => {
// 									console.log(err);
// 									res.end("error occured.")
// 								});
// 							}).catch(err => {
// 								console.log(err);
// 								res.end("error occured.")
// 							});
// 						}
// 					}

// 					if (babies > 0) {
// 						var babyLuggage = req.session.babyLuggage;
// 						var babyBirth = req.session.babyBirth;
// 						var babyName = req.session.babyName;
// 						for (var i = 0;i<babies;i++){
// 							var ve = {
// 								MaVe: '21354453',
// 								ChuyenBay: machuyenbay,
// 								HangGhe: hangghe,
// 								LoaiHanhKhach: 1,
// 								GiaTien: req.session.bgv.EmBe,
// 								ChoNgoi: 'A324',
// 								HanhLy: parseInt(babyLuggage[i])
// 							};
// 							var bbbd = moment(babyBirth[i],"DD/MM/YYYY").format("YYYY-MM-DD");
// 							var hanhkhach = {
// 								GiaoDich: idgd,
// 								HoTen: babyName[i],
// 								NgaySinh: bbbd,
// 								Ve: 0
// 							};
// 							veModel.add(ve).then(idve => {
// 								hanhkhach.Ve=idve;
// 								hanhkhachModel.add(hanhkhach).catch(err => {
// 									console.log(err);
// 									res.end("error occured.")
// 								});
// 							}).catch(err => {
// 								console.log(err);
// 								res.end("error occured.")
// 							});
// 						}
// 					}
// 				}).catch(err => {
// 					console.log(err);
// 					res.end("error occured.")
// 				});
// 			}).catch(err => {
// 				console.log(err);
// 				res.end("error occured.")
// 			});
// 		}).catch(err => {
// 			console.log(err);
// 			res.end("error occured.")
// 		});
// 	}
// 	res.render('guest/processing');
// }
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
			res.redirect('/guest/'+id+'/profile');
            
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
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
exports.dtsignin = function(req,res,next) {
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
			var redirectTo = "/processing/payment";
        	return res.redirect(redirectTo);
        });
      })(req, res, next);
}
exports.signin_post = function(req,res,next){
    passport.authenticate('local', (err, user, info) => {
        if (err)
        {
            res.end('error occured.')
        }
          
        if (!user) {
            return res.render('guest/sign_in', {
				err_message: info.message
			  })
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
			var redirectTo = "/guest/";
        	return res.redirect(redirectTo);
        });
      })(req, res, next);
}
exports.signin = function(req,res,next){
	res.render('guest/sign_in');
}
exports.signout_post = function(req,res,next){
    console.log("logout");
    req.logOut();
    res.redirect('/guest/');
}
exports.user = function(req,res,next){
	var idThanhVien = parseInt(req.session.passport.user.TaiKhoan.IdThanhVien);
	var idThongTin = parseInt(req.session.passport.user.TaiKhoan.ThongTin);
	Promise.all([
		khachhangModel.singleForUser(idThanhVien),
		giaodichModel.detailForUser(idThongTin)
	]).then(([tt,gd])=>{
		console.log(tt[0]);
		console.log(gd)
		res.render("guest/user",{
			thongTin: tt[0],
			giaodich: gd
		})
	}).catch(err=>{
		console.log(err);
		res.end("error");
	});

	// var tt = {
	// 	IdKhachHang: 26,
	// 	HoTen: 'Nguyen Cong Hung',
	// 	Email: 'nchconghung@gmail.com',
	// 	SDT: '901234567',
	// 	IdThe: 28,
	// 	TenChuThe: 'Nguyen Van C',
	// 	SoHieuThe: '4177570960373208',
	// 	NgayHetHan: '12-2024',
	// 	CSC: '681' };
	// var gd = [{
	// 	IdGiaoDich: 25,
	// 	KhachHangGiaoDich: 26,
	// 	ChuyenBay: 91,
	// 	TongGiaTri: 1439000,
	// 	DiemThuongSuDung: 0,
	// 	ThoiDiemGiaoDich: '2019-06-16T23:21:22.000Z',
	// 	MaDatCho: 'CSJABFPFP6',
	// 	ThoiGianGiaoDich: '06:21:22 17-6-2019' }]
	// res.render("guest/user",{
	// 		thongTin: tt,
	// 		giaodich: gd
	// 	})
}
//Hàm post trang user
exports.user_post = function(req,res,next){
	//Cap nhat thong tin
	var HoTen = req.body.txtName;
	var Email = req.body.txtEmail;
	var SDT = req.body.txtPhone;
	var SoHieuThe = req.body.txtCardID;
	var NgayHetHan = req.body.txtExpiryDate;
	var CSC = req.body.txtCVV;
	var TenChuThe = req.body.txtCardHolderName;
	//Cap nhat mat khau
	var MatKhauCu = req.body.txtFormerPassword;
	var MatKhauMoi = req.body.txtNewPassword;
	//update to db here
	if(typeof MatKhauCu !="undefine"){
		//Luồng cập nhật mật khẩu


		//Render như sau khi mật khẩu cũ sai
		var idThanhVien = parseInt(req.session.passport.user.TaiKhoan.IdThanhVien);
		var idThongTin = parseInt(req.session.passport.user.TaiKhoan.ThongTin);
		Promise.all([
			khachhangModel.singleForUser(idThanhVien),
			giaodichModel.detailForUser(idThongTin)
		]).then(([tt,gd])=>{
			console.log(tt[0]);
			console.log(gd)
			res.render("guest/user",{
				thongTin: tt[0],
				giaodich: gd,
				passError:true
			})
		}).catch(err=>{
			console.log(err);
			res.end("error");
		});

	}else{
		//Luồng cập nhật thông tin
		
	}
	
}
exports.ticket = function (req, res, next) {
	var bookingID = req.session.bookingID;
	var id = req.session.userdata.IdChuyenBay;
	var adultName = req.session.adultName;
	var kidName = req.session.kidName;
	var babyName = req.session.babyName;
	var adultBirth = req.session.adultBirth;
	var kidBirth = req.session.kidBirth;
	var babyBirth = req.session.babyBirth;
	var totalAmount = req.session.totalAmount;
	var classs = req.session.userdata.HangGhe;
	var contact = req.session.contact;

	//remove session here
	delete req.session['userdata'];
	delete req.session['date'];
	delete req.session['depart'];
	delete req.session['arrive'];
	delete req.session['bgv'];
	delete req.session['contact'];
	delete req.session['bookingID'];
	delete req.session['adultName'];
	delete req.session['adultBirth'];
	delete req.session['adultLuggage'];
	delete req.session['kidName'];
	delete req.session['kidBirth'];
	delete req.session['kidLuggage'];
	delete req.session['babyName'];
	delete req.session['babyBirth'];
	delete req.session['babyLuggage'];
	delete req.session['card'];
	delete req.session['totalMount'];

	//sample data

	// var bookingID = "ABGHDEUJ";
	// var id = 1;
	// var adultName = ["Nguyen Van A","Nguyen Thi B"];
	// var kidName = ["Nguyen Thi C"];
	// var babyName = [];
	// var adultBirth = ["12/05/1990","30/08/1985"];
	// var kidBirth = ["01/01/2004"];
	// var babyBirth = [];
	// var totalAmount = 3500000;
	// var classs = 1;
	// var contact = {
	// 	name: "Tran Thi Hong Gam",
	// 	phone: 321321321,
	// 	email: "gamvn@gmail.com"
	// }
	
	Promise.all([chuyenBayModel.singleWithDetailById(id, classs), lichTrinhModel.singleWithDetailByIdChuyenBay(id)]).then(([chuyenbay, lichtrinh]) => {
		res.render('guest/ticket', {
			chuyenBay: chuyenbay[0],
			lichTrinh: lichtrinh,
			class: classs,
			adultName: adultName,
			kidName: kidName,
			babyName: babyName,
			contact: contact,
			adultBirth: adultBirth,
			kidBirth: kidBirth,
			babyBirth: babyBirth,
			bookingID: bookingID,
			totalAmount: totalAmount
		});
	});
}

exports.profile = function(req, res, next){
	var id = req.params.id;
	res.render('guest/profile',{
		IdThanhVien: id
	});
}
//Hàm post trang profile sau đăng ký
exports.profile_post = function(req, res, next){
	var HoTen = req.body.name;
	var Email = req.body.email;
	var SDT = req.body.phone;
	var SoHieuThe = req.body.cardID;
	var NgayHetHan = req.body.expDate;
	var CSC = req.body.cvv;
	var TenChuThe = req.body.cardName;

	var date = '01/'+ NgayHetHan;
	var expDate = moment(date,'DD/MM/YYYY').format('YYYY-MM-DD');
	var thongtin ={
		HoTen: HoTen,
		Email: Email,
		SDT: SDT,
		TheTinDung: 0
	};

	var thetindung = {
		SoHieuThe: SoHieuThe,
		NgayHetHan: expDate,
		CSC: CSC,
		HoTen: TenChuThe
	};

	var IdThanhVien = parseInt(req.body.IdThanhVien);
	console.log(IdThanhVien);
	//update to db here
	thetindungModel.add(thetindung).then(id => {
        thongtin.TheTinDung = id;
        khachhangModel.add(thongtin).then(idTT=>{
            thanhvienModel.updateInfor(IdThanhVien,idTT).then(rows=>{
                res.redirect('/guest/signin');
            })
        }).catch(err => {
            console.log(err),
            res.end('error occured.')
        });
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });

}
