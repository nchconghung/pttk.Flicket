var express = require('express');
var giaodichModel = require('../../model/giaodich.model');
var hanhkhachModel = require('../../model/hanhkhach.model');
var moment = require('moment');
var router = express.Router();

router.get('/:id/detail',(req,res) => {
    var id = parseInt(req.params.id);
    Promise.all([
        giaodichModel.singleDetailByIdGiaoDich(id),
        hanhkhachModel.listHanhKhachByIdGiaoDich(id)
    ]).then(([gdr,hkr])=> {
        gdr[0].ThoiDiemGiaoDich = moment(gdr[0].ThoiDiemGiaoDich,'YYYY-MM-DD hh:mm:ss').format('hh:mm:ss DD-MM-YYYY');
        gdr[0].GioCatCanh = moment(gdr[0].GioCatCanh,'YYYY-MM-DD').format('YYYY-MM-DD');
        for (var i=0;i<hkr.length;i++)
        {
            hkr[i].NgaySinh = moment(hkr[i].NgaySinh,'YYYY-MM-DD').format('hh:mm:ss DD-MM-YYYY');
        }
        
        res.render('admin/vwGiaoDich/detail',{
            layout: 'admin',
            giaodich: gdr[0],
            listve: hkr
        });
    }).catch(err => {
        console.log(err);
    })
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