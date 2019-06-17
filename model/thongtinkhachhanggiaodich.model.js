var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select *,IF (GioiTinh < 1,'Nữ','Nam') as LoaiGioiTinh from ThongTinKhachHangGiaoDich`);
    },

    single: id => {
        return db.load(`select e.*, IF (e.GioiTinh < 1,'Nữ','Nam') as LoaiGioiTinh from ThongTinKhachHangGiaoDich e where e.IdKhachHang=${id}`);
    },

    singleForPP: id => {
        return db.load(`select * from ThongTinKhachHangGiaoDich where IdKhachHang=${id}`);
    },

    add: entity =>{
        return db.add(`ThongTinKhachHangGiaoDich`,entity);
    },

    update: entity =>{
        return db.update(`ThongTinKhachHangGiaoDich`,`IdKhachHang`,entity);
    },

    delete: id => {
        return db.delete(`ThongTinKhachHangGiaoDich`,`IdKhachHang`,id);
    }
}