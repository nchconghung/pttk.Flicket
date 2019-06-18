var express = require('express');
var thanhvienModel = require('../../model/thanhvien.model');
var khachhangModel = require('../../model/thongtinkhachhanggiaodich.model');
var giaodichModel = require('../../model/giaodich.model');
var thetindungModel = require('../../model/thetindung.model');
var bcrypt = require('bcrypt');
var router = express.Router();
var auth = require('../../middlewares/auth-admin');

router.get("/",auth,(req,res) => {
    thanhvienModel.index()
        .then(rows => {
            res.render('admin/vwThanhVien/index',{
                layout: 'admin',
                list: rows
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
})

router.get("/index",auth,(req,res) => {
    thanhvienModel.index()
        .then(rows => {
            res.render('admin/vwThanhVien/index',{
                layout: 'admin',
                list: rows
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
})

router.get('/:id/detail',auth,(req,res)=>{
    var id = req.params.id;
    res.render('admin/vwThanhVien/detail',{
        layout: 'admin',
    });
    // Promise.all([
    //     thanhvienModel.detailWithId(id),
    //     lichsugiaodichModel.listWithDetailByIdThanhVien(id)
    // ]).then(([detail,rows])=>{
    //     if (detail.length > 0) {
    //         for (var i =0;i< rows.length;i++){
    //             rows[i].ThoiDiemGiaoDich = moment(rows[i].ThoiDiemGiaoDich).format('MM Do YYYY, hh:mm:ss');
    //             rows[i].GioCatCanh = moment(rows[i].GioCatCanh).format('MM Do YYYY, hh:mm:ss');
    //         }
    //         res.render('admin/vwThanhVien/detail',{
    //             result: true,
    //             layout: 'admin',
    //             thanhvien: detail[0],
    //             history: rows
    //         });
    //     } else {
    //         res.render('admin/vwThanhVien/detail',{
    //             layout: 'admin',
    //             result: false
    //         });
    //     }
    // }).catch(err => {
    //   console.log(err);
    //   res.end('error occured.')
    // });
})

router.get('/search',auth,(req,res)=>{
    res.render('admin/vwThanhVien/search',{
        layout: 'admin',
        result: false
    })
})

router.post('/search',auth,(req,res)=>{

    thanhvienModel.searchWithKey(req.body.Keyword).then(rows=>{
        if (rows.length > 0) {
            res.render('admin/vwThanhVien/search',{
                layout: 'admin',
                result: true,
                list: rows
            })
        } else {
            res.render('admin/vwThanhVien/search',{
                layout: 'admin',
                result: false,
                empty: true
            })
        }
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.get('/edit',auth,(req,res)=>{
    res.render('admin/vwThanhVien/edit',{
        layout: 'admin',
        error: false
    });
})

router.get('/:id/edit',auth,(req,res)=>{
    var id = req.params.id;
    if (isNaN(id)){
        res.render('admin/vwThanhVien/edit',{
            layout: 'admin',
            error: true
        });
    }

    thanhvienModel.single(id).then(rows => {
        if (rows.length >0){
            res.render('admin/vwThanhVien/edit',{
                layout: 'admin',
                error: false,
                thanhvien: rows[0]
            });
        } else {
            res.render('admin/vwThanhVien/edit',{
                error: true
            });
        }
    })
})

router.post('/update',auth,(req,res) => {
    thanhvienModel.update(req.body).then(n => {
        res.redirect('/admin/member');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.get('/add',auth,(req,res) => {
    res.render('admin/vwThanhVien/add',{
        layout: 'admin',
        exists: false,
        search: true
    });
})

router.get('/add/:id/infor',auth,(req,res)=>{
    var id = req.params.id;
    console.log("infor");
    res.render('admin/vwThanhVien/add_infor',{
        layout: 'admin',
        IdThanhVien: id
    });
})

router.post('/addinfor',auth,(req,res)=>{
    console.log("add infor");
    var expDate = req.body.NgayHetHan;
	var thongtin = {
        HoTen: req.body.HoTen,
        Email: req.body.Email,
        SDT: req.body.SDT,
        TheTinDung: 0
	};
	var thetindung = {
		SoHieuThe: req.body.SoHieuThe,
        HoTen: req.body.TenChuThe,
        CSC: req.body.CSC,
        NgayHetHan: expDate
	};
    var IdThanhVien = parseInt(req.body.IdThanhVien);
	//update to db here
	thetindungModel.add(thetindung).then(id => {
        thongtin.TheTinDung = id;
        console.log(thongtin);
        khachhangModel.add(thongtin).then(idTT=>{
            console.log(idTT);
            thanhvienModel.updateInfor(IdThanhVien,idTT).then(rows=>{
                res.redirect('/admin/member/index/');
            })
        }).catch(err => {
            console.log(err),
            res.end('error occured.')
        });
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('/add',auth,(req,res) => {
    var saltRounds = 10;
    bcrypt.hash(req.body.MatKhau, saltRounds, function(err, hash) {
        var member = {
            TaiKhoan: req.body.TaiKhoan,
            MatKhau: hash,
            DiemThuong: req.body.DiemThuong
        }
        thanhvienModel.add(member).then(id =>{
            res.redirect('/admin/member/add/'+ id + '/infor/');
            
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
    });
})


router.post('/insert',(req,res)=>{
    var member = {
        TaiKhoan: req.body.TaiKhoan,
        MatKhau: req.body.MatKhau,
        DiemThuong: req.body.DiemThuong
    };
    thanhvienModel.add(member).then(id=>{
        var customer = {
            CMND: req.body.CMND,
            IdThanhVien: id
        };
        khachhangModel.update(customer).catch(err => {
            console.log(err),
            res.end('error occured.')
        });
        // res.render('admin/vwThanhVien/add',{
        //     layout: 'admin',
        //     exists: false
        // });
        res.redirect('admin/member/index/');
        // res.redirect('admin/member/'+id+'/detail');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('/delete', (req, res) => {
    thanhvienModel.delete(req.body.IdThanhVien).then(n => {
      res.redirect('/admin/member/index/');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

module.exports = router;