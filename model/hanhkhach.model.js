var db = require("../utils/db-mysql");

module.exports = {

    listHanhKhachByIdGiaoDich: id => {
        return db.load(`
        select HanhKhach.*,Ve.*
        from HanhKhach
        inner join Ve 
        on Ve.IdVe = HanhKhach.Ve
        inner join HangGhe
        on Ve.HangGhe = HangGhe.idHangGhe
        where HanhKhach.GiaoDich = ${id}`);
    },

    add: entity =>{
        return db.add(`HanhKhach`,entity);
    },

    update: entity =>{
        return db.update(`HanhKhach`,`IdHanhKhach`,entity);
    },

    delete: id => {
        return db.delete(`HanhKhach`,`IdHanhKhach`,id);
    },
    listHKVeByIdGiaoDich: id => {
        return db.load(`select HanhKhach.IdHanhKhach,Ve.IdVe
                        from HanhKhach
                        inner join Ve
                        on Ve.IdVe = HanhKhach.Ve
                        where HanhKhach.GiaoDich = ${id}`);
    }
}