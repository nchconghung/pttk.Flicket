var express = require('express');
var adminModel = require('../../model/admin.model');
var bcrypt = require('bcrypt');
var router = express.Router();
var moment = require('moment');

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
    console.log("add");
    res.render('admin/vwAdmin/add',{
        layout: 'admin'
    });
})

router.post('/add',(req,res)=>{
    // var now = new Date();
    // var date = moment(now).format('YYYY-MM-DD HH:mm:ss');
    console.log(date);
    var saltRounds = 10;
    bcrypt.hash(req.body.MatKhau, saltRounds, function(err, hash) {
        var member = {
            TaiKhoan: req.body.TaiKhoan,
            MatKhau: hash
            // LanDangNhapCuoi: date
        }
        adminModel.add(member).then(id =>{
			res.redirect('/admin/admin/index/');
            
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
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

router.get('/is-available-username',(req,res) => {
    var tk = req.query.TaiKhoan;
    adminModel.singleByTaiKhoan(tk).then(rows => {
        if (rows.length > 0){
            return res.json(false);
        } else {
            return res.json(true);
        }
    });
})
  
module.exports = router;