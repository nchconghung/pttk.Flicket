var express = require('express');
var thanhvienModel = require('../../model/thanhvien.model');
var khachhangModel = require('../../model/thongtinkhachhanggiaodich.model');
var giaodichModel = require('../../model/giaodich.model');
var bcrypt = require('bcrypt');
var router = express.Router()

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

router.get('/search',(req,res)=>{
    res.render('admin/vwThanhVien/search',{
        layout: 'admin',
        result: false
    })
})

router.post('/search',(req,res)=>{

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

router.get('/edit',(req,res)=>{
    res.render('admin/vwThanhVien/edit',{
        layout: 'admin',
        error: false
    });
})

router.get('/:id/edit',(req,res)=>{
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
    var idTV = req.body.IdThanhVien;
    var thetindung = {
        SoHieuThe: req.body.SoHieuThe,
        HoTen: req.body.TenChuThe,
        CSC: req.body.CSC,
        NgayHetHan: req.body.NgayHetHan
    };
    var khachhang = {
        HoTen: req.body.HoTen,
        Email: req.body.Email,
        SDT: req.body.SDT,
        IdThe: 0
    }
    thetindungModel.add(thetindung).then(id => {
        khachhang.IdThe = id;
        thongtinkhachhangModel.add(khachhang).then(idTT=>{
            thanhvienModel.updateInfor(idTV,idTT).then(rows=>{
                res.render('admin/vwKhachHang/add',{
                    layout: 'admin'
                });
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
})


router.post('/insert',(req,res)=>{
    var member = {
        TaiKhoan: req.body.TaiKhoan,
        MatKhau: req.body.MatKhau,
        DiemThuong: req.body.DiemThuong
    };
    console.log(member);
    thanhvienModel.add(member).then(id=>{
        var customer = {
            CMND: req.body.CMND,
            IdThanhVien: id
        };
        console.log(customer);
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
    thanhvienModel.delete(req.body.IdGiaoDich).then(n => {
      res.redirect('/admin/member');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

module.exports = router;