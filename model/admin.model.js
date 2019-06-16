var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select Id,TaiKhoan from Admin`);
    },
    // DATE_FORMAT(LanDangNhapCuoi,"%H:%m:%s %d-%c-%Y") as LanDangNhapCuoi
    single: id => {
        return db.load(`select * from Admin where Id=${id}`);
    },
    singleByTaiKhoan: tk => {
        return db.load(`select * from Admin where TaiKhoan like '${tk}'`);
    },
    add: entity =>{
        return db.add(`Admin`,entity);
    },

    update: entity =>{
        return db.update(`Admin`,`Id`,entity);
    },

    delete: id => {
        return db.delete(`Admin`,`Id`,id);
    }
}