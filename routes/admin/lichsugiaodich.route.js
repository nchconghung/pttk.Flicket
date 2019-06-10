var express = require('express');
var lichSuGiaoDichModel = require('../../model/lichsugiaodich.model');

var router = express.Router()

router.get("/",(req,res) => {
    lichSuGiaoDichModel.all()
        .then(rows => {
            res.render('admin/vwLichSuGiaoDich/index.handlebars',{
                list: rows
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
})

router.get('/add',(req,res) => {
    res.render('/admin/vwLichSuGiaoDich/add');
})

router.post('/add',(req,res)=>{
    lichSuGiaoDichModel.add(req.body).then(id=>{
        res.render('/admin/vwLichSuGiaoDich/add');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('admins/update',(req,res) => {
    lichSuGiaoDichModel.update(req.body).then(n => {
        res.redirect('/admin/lichsugiaodich');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('/delete', (req, res) => {
    lichSuGiaoDichModel.delete(req.body.IdGiaoDich).then(n => {
      res.redirect('/admin/lichsugiaodich');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

module.exports = router;