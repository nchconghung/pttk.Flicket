var express = require('express');
var thanhvienModel = require('../../model/thanhvien.model');
var khachhangModel = require('../../model/thongtinkhachhanggiaodich.model');
var giaodichModel = require('../../model/giaodich.model');
var thetindungModel = require('../../model/thetindung.model');
var bcrypt = require('bcrypt');
var router = express.Router();
var moment= require('moment');

router.get("/",(req,res) => {
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

router.get("/index",(req,res) => {
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

router.get('/:id/detail',(req,res)=>{
    var id = parseInt(req.params.id);
    thanhvienModel.detailUserById(id).then(rows => {
            var bd = moment(rows[0].NgaySinh,'YYYY-MM-DD').format('YYYY-MM-DD');
            rows[0].NgaySinh = bd;
            var expD = moment(rows[0].NgayHetHan,'YYYY-MM-DD').format('YYYY-MM-DD');
            rows[0].NgayHetHan = expD;
        giaodichModel.allHistoryById(rows[0].IdKhachHang).then(list => {
            res.render('admin/vwThanhVien/detail',{
                thanhvien: rows[0],
                history: list,
                layout: 'admin',
            });
        })
        
    })
    
})

router.get('/search/',(req,res)=>{
    res.render('admin/vwThanhVien/search',{
        layout: 'admin',
        result: false
    })
})

router.post('/search/',(req,res)=>{

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

router.post('/edit',(req,res)=>{
    console.log(req.body);
    var bd = moment(req.body.NgaySinh,'YYYY-MM-DD').format('YYYY-MM-DD');
    var DiemThuong = parseInt(req.body.DiemThuong);
    var exd = moment(req.body.NgayHetHan,'YYYY-MM-DD').format('YYYY-MM-DD');
    
    var thongtin = {
        IdKhachHang : parseInt(req.body.IdKhachHang),
        HoTen: req.body.HoTen,
        Email: req.body.Email,
        SDT: req.body.SDT,
        NgaySinh: bd,
        GioiTinh: parseInt(req.body.GioiTinh),
        TheTinDung: parseInt(req.body.TheTinDung)
    }
    
    var thetindung = {
        IdThe: parseInt(req.body.TheTinDung),
        SoHieuThe: req.body.SoHieuThe,
        HoTen: req.body.TenChuThe,
        CSC: req.body.CSC,
        NgayHetHan: exd
    }
    console.log(thongtin);
    console.log(thetindung);
    Promise.all([
        thanhvienModel.updatePoint(DiemThuong,parseInt(req.body.IdThanhVien)),
        khachhangModel.update(thongtin),
        thetindungModel.update(thetindung)
    ]).then(([i1,i2,i3])=> {
        res.redirect("/admin/member/" + parseInt(req.body.IdThanhVien)+"/edit");
    })
})

router.get('/:id/edit',(req,res)=>{
     var id = parseInt(req.params.id);
        thanhvienModel.detailUserById(id).then(rows => {
            var bd = moment(rows[0].NgaySinh,'YYYY-MM-DD').format('YYYY-MM-DD');
            rows[0].NgaySinh = bd;
            var expD = moment(rows[0].NgayHetHan,'YYYY-MM-DD').format('YYYY-MM-DD');
            rows[0].NgayHetHan = expD;
        giaodichModel.allHistoryById(rows[0].IdKhachHang).then(list => {
            res.render('admin/vwThanhVien/edit',{
                thanhvien: rows[0],
                history: list,
                layout: 'admin',
            });
        })
        
    })
})

router.post('/update',(req,res) => {
    thanhvienModel.update(req.body).then(n => {
        res.redirect('/admin/member');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.get('/add',(req,res) => {
    res.render('admin/vwThanhVien/add',{
        layout: 'admin',
        exists: false,
        search: true
    });
})

router.get('/add/:id/infor',(req,res)=>{
    var id = req.params.id;
    console.log("infor");
    res.render('admin/vwThanhVien/add_infor',{
        layout: 'admin',
        IdThanhVien: id
    });
})

router.post('/addinfor',(req,res)=>{
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
}),

router.post('/add',(req,res) => {
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
}),


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
}),

router.post('/delete', (req, res) => {
    thanhvienModel.delete(req.body.IdThanhVien).then(n => {
      res.redirect('/admin/member/index/');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

module.exports = router;