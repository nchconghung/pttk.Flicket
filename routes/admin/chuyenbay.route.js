var express = require('express');
var chuyenbayModel = require('../../model/chuyenbay.model');
var lichtrinhModel = require('../../model/lichtrinh.model');
var bgvModel = require('../../model/banggiave.model');
var moment = require('moment');
var router = express.Router();
var auth = require('../../middlewares/auth-admin');

router.get("/",auth,(req,res) => {
    chuyenbayModel.all()
        .then(rows => {
            res.render('admin/vwChuyenBay/index',{
                layout:'admin',
                list: rows
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
});

router.get("/index",auth,(req,res) => {
    chuyenbayModel.all()
        .then(rows => {
            for (var i =0;i< rows.length;i++){
                rows[i].GioCatCanh = moment(rows[i].GioCatCanh).format('MM Do YYYY, hh:mm:ss');
            }
            res.render('admin/vwChuyenBay/index',{
                layout:'admin',
                list: rows
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
});

router.get("/search",auth,(req,res) => {
    res.render('admin/vwChuyenBay/search',{
        layout:'admin',
        flat:false
    });
});

router.post("/index",auth,(req,res) => {
    var ma = req.params.id.keyword;
    
    chuyenbayModel.searchByMaChuyenBay(ma).then(rows => {
        res.render('admin/vwChuyenBay/search',{
            layout:'admin',
            flat:true,
            list:rows
        });
    });
});

router.get('/:id/detail',auth,(req,res)=>{
    var id = req.params.id;
    
    Promise.all([
        chuyenbayModel.single(id),
        lichtrinhModel.lichTrinhByChuyenBay(id),
        bgvModel.listByChuyenBay(id)
    ]).then(([cb,lt,bgv])=>{
        
        res.render('admin/vwChuyenBay/detail',{
            layout:'admin',
            error: false,
            chuyenbay: cb[0],
            lichtrinh: lt,
            bgv: bgv,
            TongGioBay: 0
        });
    }).catch(err => {
        console.log(err);
        res.end("error occured.")
    });
});

module.exports = router;