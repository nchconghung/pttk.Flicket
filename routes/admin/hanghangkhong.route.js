var express = require('express');
var chuyenbayModel = require('../../model/chuyenbay.model');
var hhkModel = require('../../model/hanghangkhong.model');
var auth = require('../../middlewares/auth-admin');
var router = express.Router()

router.get("/",auth,(req,res) => {
    hhkModel.all()
        .then(rows => {
            res.render('admin/vwHangHangKhong/index',{
                layout:'admin',
                list: rows
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
});

router.get('/list/:id',auth,(req,res)=>{ 
    var id = req.params.id;
    
    chuyenbayModel.allByHHK(id).then(rows => {
        if (rows.length >0){
            res.render('admin/vwHangHangKhong/flight-index',{
                layout:'admin',
                list: rows
            });
        } else {
            res.render('admin/vwHangHangKhong/flight-index',{
                layout:'admin'
            });
        }
    })
});

module.exports = router;