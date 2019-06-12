var express = require('express');
var chuyenbayModel = require('../../model/chuyenbay.model');

var router = express.Router();

router.get("/",(req,res) => {
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

router.get("/index",(req,res) => {
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

router.get("/search",(req,res) => {
    res.render('admin/vwChuyenBay/search',{
        layout:'admin',
        flat:false
    });
});

router.post("/index",(req,res) => {
    var ma = req.params.id.keyword;
    
    chuyenbayModel.searchByMaChuyenBay(ma).then(rows => {
        res.render('admin/vwChuyenBay/search',{
            layout:'admin',
            flat:true,
            list:rows
        });
    });
});

router.get('/detail/:id',(req,res)=>{
    var id = req.params.id;
    
    chuyenbayModel.single(id).then(rows => {
        if (rows.length >0){
            res.render('admin/vwChuyenBay/detail',{
                layout:'admin',
                error: false,
                chuyenbay: rows[0]
            });
        } else {
            res.render('admin/vwChuyenBay/detail',{
                layout:'admin',
                error: true
            });
        }
    })
});

module.exports = router;