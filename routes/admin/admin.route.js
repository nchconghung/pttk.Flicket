var express = require('express');
var adminModel = require('../../model/admin.model');

var router = express.Router()

router.get("/",(req,res) => {
    adminModel.all()
        .then(rows => {
            res.render('admin/vwAdmin/index.handlebars',{
                admins: rows
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
})

router.get('edit/:id',(req,res)=>{
    var id = req.params.id;
    if (isNaN(id)){
        res.render('admin/vwAdmin/edit.handlebars',{
            error: true
        });
    }

    adminModel.single(id).then(rows => {
        if (rows.length >0){
            res.render('admin/vwAdmin/edit',{
                error: false,
                admin: rows[0]
            });
        } else {
            res.render('admin/vwAdmin/edit',{
                error: true
            });
        }
    })
})

router.get('/add',(req,res) => {
    res.render('/admin/vwAdmin/add');
})

router.post('/add',(req,res)=>{
    adminModel.add(req.body).then(id=>{
        res.render('/admin/vwAdmin/add');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})

router.post('admin/update',(req,res) => {
    adminModel.update(req.body).then(n => {
        res.redirect('/admin/admin');
    }).catch(err => {
        console.log(err),
        res.end('error occured.')
    });
})
  
module.exports = router;