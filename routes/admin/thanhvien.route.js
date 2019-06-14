var express = require('express');
var thanhvienModel = require('../../model/thanhvien.model');

var router = express.Router()

router.get("/",(req,res) => {
    thanhvienModel.all()
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
    
    thanhvienModel.single(id).then(rows => {
        if (rows.length >0){
            res.render('admin/vwThanhVien/detail',{
                error: false,
                layout: 'admin',
                thanhvien: rows[0]
            });
        } else {
            res.render('admin/vwThanhVien/detail',{
                error: true
            });
        }
    })
})

router.get('/search',(req,res)=>{
    res.render('admin/vwThanhVien/search',{
        layout: 'admin',
        flat: false
    })
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

router.get('/add',(req,res) => {
    res.render('/admin/vwThanhVien/add',{
        layout: 'admin'
    });
})

router.post('/add',(req,res)=>{
    thanhvienModel.add(req.body).then(id=>{
        res.redirect('admin/member/'+id+'/detail');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('/update',(req,res) => {
    thanhvienModel.update(req.body).then(n => {
        res.redirect('/admin/member');
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