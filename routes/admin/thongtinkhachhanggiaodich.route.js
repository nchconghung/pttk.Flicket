var express = require('express');
var thongtinkhachhangModel = require('../../model/thongtinkhachhanggiaodich.model');

var router = express.Router()

router.get("/",(req,res) => {
    thongtinkhachhangModel.all()
        .then(rows => {
            res.render('admin/vwKhachHang/index',{
                list: rows
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
})

router.get('detail/:cmnd',(req,res)=>{
    var cmnd = req.params.cmnd;
    
    thongtinkhachhangModel.single(cmnd).then(rows => {
        if (rows.length >0){
            res.render('admin/vwKhachHang/detail',{
                error: false,
                khachhang: rows[0]
            });
        } else {
            res.render('admin/vwKhachHang/detail',{
                error: true
            });
        }
    })
})

router.get('edit/:cmnd',(req,res)=>{
    var id = req.params.cmnd;

    thongtinkhachhangModel.single(cmnd).then(rows => {
        if (rows.length >0){
            res.render('admin/vwKhachHang/edit',{
                error: false,
                khachhang: rows[0]
            });
        } else {
            res.render('admin/vwKhachHang/edit',{
                error: true
            });
        }
    })
})

router.get('/add',(req,res) => {
    res.render('/admin/vwKhachHang/add');
})

router.post('/add',(req,res)=>{
    thongtinkhachhangModel.add(req.body).then(id=>{
        res.render('/admin/vwKhachHang/add');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('admins/update',(req,res) => {
    thongtinkhachhangModel.update(req.body).then(n => {
        res.redirect('/admin/khachhang');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('/delete', (req, res) => {
    thongtinkhachhangModel.delete(req.body.CMND).then(n => {
      res.redirect('/admin/khachhang');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

module.exports = router;