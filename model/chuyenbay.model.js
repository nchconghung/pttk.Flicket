var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from ChuyenBay`);
    },

    listWithDetailByParams: (diemdi,diemden,ngaydi,hangghe) => {
        return db.load(`SELECT cb.IdChuyenBay,cb.MaChuyenBay,hhk.HangHangKhong,cb.LoaiMayBay,hhk.Logo,
        COUNT(lt1.IdLichTrinh) as SoChangBay,SEC_TO_TIME(SUM(TIME_TO_SEC(cab1.ThoiGianBay))) as TongGioBay,bgv.NguoiLon,bgv.TreEm,bgv.EmBe
        FROM ChuyenBay cb
        
        INNER JOIN HangHangKhong hhk
        ON hhk.idHangHangKhong = cb.HangHangKhong
        
        INNER JOIN BangGiaVe bgv
        ON bgv.ChuyenBay=cb.IdChuyenBay AND bgv.HangGhe=${hangghe}
        
        INNER JOIN LichTrinh lt 
        ON lt.ChuyenBay = cb.IdChuyenBay AND lt.ThuTu = 1
        
        INNER JOIN LichTrinh lt1 
        ON lt1.ChuyenBay = cb.IdChuyenBay 
        
        INNER JOIN ChangBay cab
        ON cab.IdChangBay = lt.ChangBay AND cab.GioCatCanh LIKE "${ngaydi}%"
        
        INNER JOIN ChangBay cab1
        ON lt1.ChangBay = cab1.IdChangBay 
        
        WHERE cb.DiemDi = ${diemdi} AND cb.DiemDen = ${diemden} AND cb.CacHangGhe LIKE "%${hangghe}%"
        GROUP BY cb.IdChuyenBay,bgv.Id,hhk.idHangHangKhong`);
    },


    single: id => {
        return db.load(`select * form ChuyenBay where IdChuyenBay=${id}`);
    },
}