var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from LichSuGiaoDich`);
    },


    single: id => {
        return db.load(`select * form LichSuGiaoDich where IdGiaoDich=${id}`);
    },

    listWithDetailByIdThanhVien: id => {
        return db.load(`SELECT ls.IdGiaoDich,v.MaVe,cb.MaChuyenBay,ls.ThoiDiemGiaoDich,cab.GioCatCanh,cb.DiemDi,cb.DiemDen
                        FROM LichSuGiaoDich ls
                        INNER JOIN Ve v
                        ON v.IdVe = ls.IdVe
                        INNER JOIN ChuyenBay cb
                        ON v.ChuyenBay = cb.IdChuyenBay
                        INNER JOIN LichTrinh lt 
                        ON lt.ChuyenBay = cb.IdChuyenBay and lt.ThuTu = 1
                        INNER JOIN ChangBay cab
                        ON cab.IdChangBay = lt.ChangBay
                        WHERE ls.IdThanhVien  = ${id}`);
    },

    add: entity =>{
        return db.add(`LichSuGiaoDich`,entity);
    },

    update: entity =>{
        return db.update(`LichSuGiaoDich`,`IdGiaoDich`,entity);
    },

    delete: id => {
        return db.delete(`LichSuGiaoDich`,`IdGiaoDich`,id);
    }
}