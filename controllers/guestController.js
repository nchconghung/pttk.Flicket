var chuyenBayModel = require('../model/chuyenbay.model');
var lichTrinhModel = require('../model/lichtrinh.model');

exports.index = function(req,res,next){
    res.render('guest/home',{title: 'Flicket'});
}
exports.index_post = function(req,res,next){
    
}
exports.pick = function(req,res,next){
    var diemdi = req.body.txtDepart;
	var diemden = req.body.txtArrive;
	var ngaydi = req.body.txtDate;
	var hangghe = req.body.txtClass;
	var adult = req.body.txtAdult;
	var kid = req.body.txtKid;
	var baby = req.body.txtBaby;
    res.send(req.body);
    Promise.all([
		chuyenBayModel.listWithDetailByParams(diemdi,diemden,ngaydi,hangghe),
		lichTrinhModel.listWithDetailByParams(diemdi,diemden,ngaydi,hangghe),
	]).then(([cb_rows,lt_rows]) =>{
		var listEntity = [];

		for(var i = 0;i<cb_rows.length;i++){
			
			var listLichTrinh = [];
			for (var k = 0;k < lt_rows.length;k++){
				if (lt_rows[k].ChuyenBay === cb_rows[i].IdChuyenBay){
					listLichTrinh.push(lt_rows[k]);
				}
			}
			var e = {
				chuyenBay: cb_rows[i],
				lichTrinh: listLichTrinh,
			};
			listEntity.push(e);
		}
		console.log(listEntity[0].lichTrinh[0].GioCatCanh);
		res.render("guest/flight_picking",{
			list: listEntity,
			adult: adult,
			kid: kid,
			baby: baby,
			class: hangghe,			
		});
	}).catch(err =>{
		console.log(err);
	});
}
exports.pick_post = function(req,res,next){
    var diemdi = parseInt(req.body.txtDepart);
	var diemden = parseInt(req.body.txtArrive);
	var ngaydi = req.body.txtDate;
	var hangghe = parseInt(req.body.txtClass);
	var adult = parseInt(req.body.txtAdult);
	var kid = parseInt(req.body.txtKid);
	var baby = parseInt(req.body.txtBaby);
    Promise.all([
		chuyenBayModel.listWithDetailByParams(diemdi,diemden,ngaydi,hangghe),
		lichTrinhModel.listWithDetailByParams(diemdi,diemden,ngaydi,hangghe),
	]).then(([cb_rows,lt_rows]) =>{
		var listEntity = [];

		for(var i = 0;i<cb_rows.length;i++){
			
			var listLichTrinh = [];
			for (var k = 0;k < lt_rows.length;k++){
				if (lt_rows[k].ChuyenBay === cb_rows[i].IdChuyenBay){
					listLichTrinh.push(lt_rows[k]);
				}
			}
			var e = {
				chuyenBay: cb_rows[i],
				lichTrinh: listLichTrinh,
			};
			listEntity.push(e);
		}
		res.render("guest/flight_picking",{
			list: listEntity,
			adult: adult,
			kid: kid,
			baby: baby,
			class: hangghe,			
		});
	}).catch(err =>{
		console.log(err);
	});
}
exports.info = function(req,res,next){
	var id = req.query.id;
	var adult = req.query.adult;
	var kid = req.query.kid;
	var baby = req.query.baby;
	var classs = req.query.class;
	res.send("id: "+id+" - adult: "+adult+" - kid: "+kid+" - baby: "+baby+" - class: "+classs);
    //res.render('guest/check_info');
}
exports.passenger = function(req,res,next){
    res.render('guest/passenger_info');
}
exports.payment = function(req,res,next){
    res.render('guest/payment');
}
exports.processing = function(req,res,next){
    res.render('guest/processing');
}
exports.signup = function(req,res,next){
    res.render('guest/sign_up');
}
exports.user = function(req,res,next){
    res.render('guest/user');
}
exports.ticket = function(req,res,next){
    res.render('guest/ticket');
}