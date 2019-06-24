var db = require("../utils/db-mysql");

module.exports = {
	all: () =>{
        return db.load(`SELECT hhk.*,COUNT(cb.IdChuyenBay) as TongChuyenBay 
                        FROM HangHangKhong hhk
                        left JOIN ChuyenBay cb
                        ON cb.HangHangKhong = hhk.idHangHangKhong
                        GROUP BY hhk.idHangHangKhong`);
    },

    single: id => {
        return db.load(`select * form ChangBay where IdChangBay=${id}`);
    },
    count: ()=>{
        return db.load(`select count(HangHangKhong.IdHangHangKhong) as TongSoHHK from HangHangKhong`);
    }
}
