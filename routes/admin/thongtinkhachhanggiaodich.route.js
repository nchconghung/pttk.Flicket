var express = require('express');
var thongtinkhachhangModel = require('../../model/thongtinkhachhanggiaodich.model');

var router = express.Router()

router.get("/",(req,res) => {
    thongtinkhachhangModel.all()
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

router.get("/index",(req,res) => {
    thongtinkhachhangModel.all()
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

router.get('/:cmnd/detail',(req,res)=>{
    var cmnd = req.params.cmnd;
    
    thongtinkhachhangModel.single(cmnd).then(rows => {
        if (rows.length >0){
            res.render('admin/vwKhachHang/detail',{
                layout: 'admin',
                error: false,
                khachhang: rows[0]
            });
        } else {
            res.render('admin/vwKhachHang/detail',{
                layout: 'admin',
                error: true
            });
        }
    })
})

router.get('/:cmnd/edit',(req,res)=>{
    var id = req.params.cmnd;

    thongtinkhachhangModel.single(cmnd).then(rows => {
        if (rows.length >0){
            res.render('admin/vwKhachHang/edit',{
                layout: 'admin',
                error: false,
                khachhang: rows[0]
            });
        } else {
            res.render('admin/vwKhachHang/edit',{
                layout: 'admin',
                error: true
            });
        }
    })
})

router.get('/add',(req,res) => {
    res.render('admin/vwKhachHang/add',{
        layout: 'admin'
    });
})

router.post('/add',(req,res)=>{
    thongtinkhachhangModel.add(req.body).then(id=>{
        res.render('admin/vwKhachHang/add',{
            layout: 'admin'
        });
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('admins/update',(req,res) => {
    thongtinkhachhangModel.update(req.body).then(n => {
        res.redirect('/admin/member');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('/delete', (req, res) => {
    thongtinkhachhangModel.delete(req.body.CMND).then(n => {
      res.redirect('/admin/member');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

module.exports = router;