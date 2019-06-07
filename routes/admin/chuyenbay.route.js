var express = require('express');
var chuyenbayModel = require('../../model/chuyenbay.model');

var router = express.Router()

router.get("/",(req,res) => {
    chuyenbayModel.all()
        .then(rows => {
            res.render('admin/vwChuyenBay/index',{
                list: rows
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
})

router.get('detail/:id',(req,res)=>{
    var id = req.params.id;
    
    chuyenbayModel.single(id).then(rows => {
        if (rows.length >0){
            res.render('admin/vwChuyenBay/detail',{
                error: false,
                chuyenbay: rows[0]
            });
        } else {
            res.render('admin/vwChuyenBay/detail',{
                error: true
            });
        }
    })
})

module.exports = router;