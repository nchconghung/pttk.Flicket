var express = require('express');
var thanhvienModel = require('../../model/thanhvien.model');

var router = express.Router()

router.get("/",(req,res) => {
    thanhvienModel.all()
        .then(rows => {
            res.render('admin/vwThanhVien/index',{
                list: rows
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
})

router.get('detail/:id',(req,res)=>{
    var id = req.params.id;
    
    thanhvienModel.single(id).then(rows => {
        if (rows.length >0){
            res.render('admin/vwThanhVien/detail',{
                error: false,
                thanhvien: rows[0]
            });
        } else {
            res.render('admin/vwThanhVien/detail',{
                error: true
            });
        }
    })
})

router.get('edit/:id',(req,res)=>{
    var id = req.params.id;
    if (isNaN(id)){
        res.render('admin/vwThanhVien/edit',{
            error: true
        });
    }

    thanhvienModel.single(id).then(rows => {
        if (rows.length >0){
            res.render('admin/vwThanhVien/edit',{
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

router.get('/add',(req,res) => {
    res.render('/admin/vwThanhVien/add');
})

router.post('/add',(req,res)=>{
    thanhvienModel.add(req.body).then(id=>{
        res.render('/admin/vwThanhVien/add');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('admins/update',(req,res) => {
    thanhvienModel.update(req.body).then(n => {
        res.redirect('/admin/thanhvien');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('/delete', (req, res) => {
    thanhvienModel.delete(req.body.IdGiaoDich).then(n => {
      res.redirect('/admin/thanhvien');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

module.exports = router;