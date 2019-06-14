var express = require('express');
var adminModel = require('../../model/admin.model');

var router = express.Router()

router.get("/",(req,res) => {
    adminModel.all()
        .then(rows => {
            res.render('admin/vwAdmin/index',{
                layout:'admin',
                list: rows
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
})

router.get("/index",(req,res) => {
    adminModel.all()
        .then(rows => {
            res.render('admin/vwAdmin/index',{
                layout:'admin',
                list: rows
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
})

router.get('edit/:id',(req,res)=>{
    var id = req.params.id;
    if (isNaN(id)){
        res.render('admin/vwAdmin/edit',{
            layout:'admin',
            error: true
        });
    }

    adminModel.single(id).then(rows => {
        if (rows.length >0){
            res.render('admin/vwAdmin/edit',{
                layout:'admin',
                error: false,
                item: rows[0]
            });
        } else {
            res.render('admin/vwAdmin/edit',{
                layout:'admin',
                error: true
            });
        }
    })
})

router.get('/add',(req,res) => {
    res.render('admin/vwAdmin/add',{
        layout: 'admin'
    });
})

router.post('/add',(req,res)=>{
    adminModel.add(req.body).then(id=>{
        res.redirect('admin/admin/index');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('admin/update',(req,res) => {
    var id = req.params.id;
    adminModel.update(req.body).then(n => {
        res.redirect('/admin/admin/' + id + '/detail');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})
  
module.exports = router;