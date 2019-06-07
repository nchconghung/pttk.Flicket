var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from ThanhVien`);
    },

    // allWithDetail: () => {
    //     return db.load(`select t.*,count(l.IdGiaoDich) as soLanGiaoDich from ThanhVien t left join LichSuGiaoDich l on c.IdThanhVien=p.IdThanhVien group by `);
    // },

    single: id => {
        return db.load(`select * form ThanhVien where id=${id}`);
    },

    add: entity =>{
        return db.add(`ThanhVien`,entity);
    },

    update: entity =>{
        return db.update(`ThanhVien`,`CMND`,entity);
    },

    delete: cmnd => {
        return db.delete(`ThanhVien`,`CMND`,cmnd);
    }
}