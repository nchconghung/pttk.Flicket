var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from BangGiaVe`);
    },

    listByChuyenBay: id =>{
        var query = `SELECT bgv.*,hg.HangGhe as LoaiHangGhe
                    FROM BangGiaVe bgv,HangGhe hg
                    WHERE bgv.ChuyenBay = ${id} and hg.idHangGhe = bgv.HangGhe
                    ORDER BY bgv.HangGhe ASC`;
        return db.load(query);
    }
}

