var express = require('express');
var giaodichModel = require('../../model/giaodich.model');

var router = express.Router()

router.get('/add',(req,res) => {
    res.render('admin/vwLichSuGiaoDich/add',{
        layout: 'admin'
    });
})

router.post('/add',(req,res)=>{
    giaodichModel.add(req.body).then(id=>{
        res.render('admin/vwLichSuGiaoDich/add',{
            layout: 'admin'
        });
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('/update',(req,res) => {
    giaodichModel.update(req.body).then(n => {
        res.redirect('admin/member/'+req.body.IdThanhVien+'/history');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('/delete', (req, res) => {
    var id = req.body.IdGiaoDich;
    giaodichModel.delete(req.body.IdGiaoDich).then(n => {
      res.redirect('admin/member/'+id+'/edit');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

module.exports = router;