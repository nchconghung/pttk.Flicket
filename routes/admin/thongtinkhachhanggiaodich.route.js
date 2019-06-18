var express = require('express');
var thongtinkhachhangModel = require('../../model/thongtinkhachhanggiaodich.model');
var thetindungModel = require('../../model/thetindung.model');

var router = express.Router()

router.get("/",(req,res) => {
    res.redirect("/admin/customer/index");
})

router.get("/index",(req,res) => {
    thongtinkhachhangModel.allForAdminIndex()
        .then(rows => {
            res.render('admin/vwKhachHang/index',{
                layout: 'admin',
                list: rows
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
})

router.get("/search",(req,res) => {
    res.render('admin/vwKhachHang/search',{
        layout: 'admin',
        result: false
    });
})

router.post("/search/",(req,res) => {
    console.log(req.body.IdKhachHang);
    thongtinkhachhangModel.searchById(req.body.IdKhachHang).then(rows => {
        res.render('admin/vwKhachHang/search',{
            layout: 'admin',
            list: rows,
            result: true
        });
    })

})

router.get('/:id/detail',(req,res)=>{
    var id = req.params.id;
    
    res.render('admin/vwKhachHang/detail',{
        layout: 'admin',
    });

    // thongtinkhachhangModel.single(id).then(rows => {
    //     if (rows.length >0){
    //         res.render('admin/vwKhachHang/detail',{
    //             layout: 'admin',
    //             error: false,
    //             khachhang: rows[0]
    //         });
    //     } else {
    //         res.render('admin/vwKhachHang/detail',{
    //             layout: 'admin',
    //             error: true
    //         });
    //     }
    // })
})



router.get('/:id/edit',(req,res)=>{
    var id = parseInt(req.params.id);
    console.log(id);
    thongtinkhachhangModel.singleForAdmin(id).then(rows=>{
        res.render('admin/vwKhachHang/edit',{
            layout: 'admin',
            infor: rows[0]
        });
    }).catch(err => {
        console.log(err);
        res.end("error");
    })

    // thongtinkhachhangModel.single(id).then(rows => {
    //     if (rows.length >0){
    //         res.render('admin/vwKhachHang/edit',{
    //             layout: 'admin',
    //             error: false,
    //             khachhang: rows[0]
    //         });
    //     } else {
    //         res.render('admin/vwKhachHang/edit',{
    //             layout: 'admin',
    //             error: true
    //         });
    //     }
    // })
})

router.get('/add',(req,res) => {
    res.render('admin/vwKhachHang/add',{
        layout: 'admin'
    });
})

router.get('/add',(req,res) => {
    res.render('admin/vwKhachHang/add',{
        layout: 'admin'
    });
})

router.post('/add',(req,res)=>{
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
        thongtinkhachhangModel.add(khachhang).then(id=>{
            res.render('admin/vwKhachHang/add',{
                layout: 'admin'
            });
        }).catch(err => {
            console.log(err),
            res.end('error occured.')
        });
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
    
})

router.post('/update',(req,res) => {
    console.log(req.body);
    thongtinkhachhangModel.update(req.body).then(n => {
        res.redirect('/admin/customer');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('/delete', (req, res) => {
    thongtinkhachhangModel.delete(req.body.IdKhachHang).then(n => {
      res.redirect('/admin/customer');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });

})

module.exports = router;