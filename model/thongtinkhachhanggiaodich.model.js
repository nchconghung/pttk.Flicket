var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from ThongTinKhachHangGiaoDich`);
    },

    single: cmnd => {
        return db.load(`select e.* form ThongTinKhachHangGiaoDich e where e.CMND like ${cmnd}`);
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