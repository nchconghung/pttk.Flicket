var express = require('express');
var veModel = require('../../model/ve.model');

var router = express.Router()

router.get("/",auth,(req,res) => {
    veModel.all()
        .then(rows => {
            res.render('admin/vwVe/index',{
                list: rows
            });
        }).catch(err => {
            console.log(err);
            res.end("error occured.")
        });
})

router.get('/:id/detail',auth,(req,res)=>{
    var id = req.params.id;
    
    veModel.single(id).then(rows => {
        if (rows.length >0){
            res.render('admin/vwVe/detail',{
                error: false,
                chuyenbay: rows[0]
            });
        } else {
            res.render('admin/vwVe/detail',{
                error: true
            });
        }
    })
})



module.exports = router;
