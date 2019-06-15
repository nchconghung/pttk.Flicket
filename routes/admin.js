var express = require('express');
var chuyenBayModel = require('../model/chuyenbay.model');
var lichTrinhModel = require('../model/lichtrinh.model');
var router = express.Router();

/* GET Homepage Admin */

router.get('/',function(req,res,next){
	var diemdi = 1;
	var diemden = 2;
	var ngaydi = '2019-06-18';
	var hangghe = 3;
	var list = [];
	console.log('start');

	// chuyenBayModel.listWithDetailByParams(diemdi,diemden,ngaydi,hangghe).then(cb_rows =>{
	// 	lichTrinhModel.listWithDetailByParams(diemdi,diemden,ngaydi,hangghe).then(lt_rows =>{
	// 		console.log(cb_rows);
	// 	});
	// });

	var a = [1,2,3];
	var b = [3]

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
		console.log(listEntity[0]);
		res.render("admin/vwAdmin/add",{layout:'admin',
			listItem: listEntity,
		});
	}).catch(err =>{
		console.log(err);
	});
	
});

module.exports = router;