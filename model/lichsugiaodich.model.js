var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from LichSuGiaoDich`);
    },

    single: id => {
        return db.load(`select * form LichSuGiaoDich where IdGiaoDich=${id}`);
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