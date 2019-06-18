var express = require('express');
var thongtinkhachhangModel = require('../../model/thongtinkhachhanggiaodich.model');

var router = express.Router()

router.get("/",(req,res) => {
    res.redirect("/admin/flight/index");
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
        layout: 'admin'
    });
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
    var id = req.params.id;
    res.render('admin/vwKhachHang/edit',{
        layout: 'admin',
    });
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
    thongtinkhachhangModel.add(req.body).then(id=>{
        res.render('admin/vwKhachHang/add',{
            layout: 'admin'
        });
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('/update',(req,res) => {
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