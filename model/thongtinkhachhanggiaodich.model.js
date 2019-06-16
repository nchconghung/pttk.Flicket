var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select *,IF (GioiTinh < 1,'Nữ','Nam') as LoaiGioiTinh from ThongTinKhachHangGiaoDich`);
    },

    single: id => {
        return db.load(`select e.*, IF (e.GioiTinh < 1,'Nữ','Nam') as LoaiGioiTinh from ThongTinKhachHangGiaoDich e where e.CMND like '${cmnd}'`);
    },

    add: entity =>{
        return db.add(`ThongTinKhachHangGiaoDich`,entity);
    },

    update: entity =>{
        return db.update(`ThongTinKhachHangGiaoDich`,`CMND`,entity);
    },

    delete: id => {
        return db.delete(`ThongTinKhachHangGiaoDich`,`CMND`,id);
    }
}