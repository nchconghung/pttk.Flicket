var db = require("../utils/db-mysql");

module.exports = {
    listByIdUser: id => {
        return db.load(`SELECT gd.*
        FROM GiaoDich gd
        WHERE gd.KhachHangGiaoDich = ${id}`);
    },

    detailForUser: id => {
        return db.load(`
        SELECT gd.*
        FROM GiaoDich gd
        INNER JOIN ChuyenBay cb
        ON cb.IdChuyenBay = gd.ChuyenBay
        INNER JOIN HangHangKhong hhk
        ON hhk.idHangHangKhong = cb.HangHangKhong
        INNER JOIN HanhKhach hk
        ON hk.GiaoDich = gd.IdGiaoDich
        INNER JOIN LichTrinh lt 
        ON lt.ChuyenBay = cb.IdChuyenBay  and lt.ThuTu = 1
        INNER JOIN ChangBay cab
        ON cab.IdChangBay = lt.ChangBay
        
         WHERE gd.KhachHangGiaoDich = ${id} `);
    },

    add: entity =>{
        return db.add(`GiaoDich`,entity);
    },

    update: entity =>{
        return db.update(`GiaoDich`,`IdGiaoDich`,entity);
    },

    delete: id => {
        return db.delete(`GiaoDich`,`IdGiaoDich`,id);
    }


}