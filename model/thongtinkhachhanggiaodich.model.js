var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select *,IF (GioiTinh < 1,'Nữ','Nam') as LoaiGioiTinh from ThongTinKhachHangGiaoDich`);
    },

    single: cmnd => {
        return db.load(`select e.*, IF (e.GioiTinh < 1,'Nữ','Nam') as LoaiGioiTinh from ThongTinKhachHangGiaoDich e where e.CMND like '${cmnd}'`);
    },

    add: entity =>{
        return db.add(`ThongTinKhachHangGiaoDich`,entity);
    },

    update: entity =>{
        return db.updateWithVarcharID(`ThongTinKhachHangGiaoDich`,`CMND`,entity);
    },

    delete: cmnd => {
        return db.deleteWithVarcharID(`ThongTinKhachHangGiaoDich`,`CMND`,cmnd);
    }
}