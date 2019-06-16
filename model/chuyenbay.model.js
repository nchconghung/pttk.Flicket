var db = require("../utils/db-mysql");

module.exports = {
 all: () =>{
        return db.load(`SELECT cb.*,cab.GioCatCanh,ddi.DiaDiem as DiaDiemDi,dden.DiaDiem as DiaDiemDen
                        FROM ChuyenBay cb
                        INNER JOIN LichTrinh lt
                        ON cb.IdChuyenBay = lt.ChuyenBay and lt.ThuTu = 1
                        INNER JOIN ChangBay cab
                        ON cab.IdChangBay = lt.ChangBay
                        INNER JOIN DiaDiem ddi
                        ON ddi.Id = cb.DiemDi
                        INNER JOIN DiaDiem dden
                        ON dden.Id = cb.DiemDen
                        ORDER BY cab.GioCatCanh DESC,cb.IdChuyenBay ASC
                        LIMIT 1000`);
    },

allByHHK: (id) =>{
    return db.load(`SELECT cb.*,cab.GioCatCanh,ddi.DiaDiem as DiaDiemDi,dden.DiaDiem as DiaDiemDen
                    FROM ChuyenBay cb
                    INNER JOIN LichTrinh lt
                    ON cb.IdChuyenBay = lt.ChuyenBay and lt.ThuTu = 1
                    INNER JOIN ChangBay cab
                    ON cab.IdChangBay = lt.ChangBay
                    INNER JOIN DiaDiem ddi
                    ON ddi.Id = cb.DiemDi
                    INNER JOIN DiaDiem dden
                    ON dden.Id = cb.DiemDen
                    WHERE cb.HangHangKhong = ${id}
                    ORDER BY cab.GioCatCanh DESC,cb.IdChuyenBay ASC
                    LIMIT 1000`);
},

searchByMaChuyenBay: ma => {
    return db.load(`SELECT cb.*,cab.GioCatCanh,ddi.DiaDiem as DiaDiemDi,dden.DiaDiem as DiaDiemDen
    FROM ChuyenBay cb
    INNER JOIN LichTrinh lt
    ON cb.IdChuyenBay = lt.ChuyenBay and lt.ThuTu = 1
    INNER JOIN ChangBay cab
    ON cab.IdChangBay = lt.ChangBay
    INNER JOIN DiaDiem ddi
    ON ddi.Id = cb.DiemDi
    INNER JOIN DiaDiem dden
    ON dden.Id = cb.DiemDen
    WHERE cb.MaChuyenBay like  '%${ma}%'
    ORDER BY cab.GioCatCanh DESC,cb.IdChuyenBay ASC
    LIMIT 1000`);
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

singleWithDetailById: (id,hangghe) => {
    return db.load(`SELECT cb.IdChuyenBay,cb.MaChuyenBay,hhk.HangHangKhong,cb.LoaiMayBay,hhk.Logo,
    COUNT(lt.IdLichTrinh) as SoChangBay,SEC_TO_TIME(SUM(TIME_TO_SEC(cab.ThoiGianBay))) as TongGioBay,bgv.NguoiLon,bgv.TreEm,bgv.EmBe
    FROM ChuyenBay cb
    
    INNER JOIN HangHangKhong hhk
    ON hhk.idHangHangKhong = cb.HangHangKhong
    
    INNER JOIN BangGiaVe bgv
    ON bgv.ChuyenBay=cb.IdChuyenBay AND bgv.HangGhe=${hangghe}
    
    INNER JOIN LichTrinh lt 
    ON lt.ChuyenBay = cb.IdChuyenBay 
    
    INNER JOIN ChangBay cab
    ON lt.ChangBay = cab.IdChangBay 
    
    WHERE cb.IdChuyenBay = ${id}
    GROUP BY cb.IdChuyenBay,bgv.Id,hhk.idHangHangKhong`);
},

single: id => {
    return db.load(`SELECT cb.IdChuyenBay,cb.MaChuyenBay,hhk.HangHangKhong as HHK,cb.LoaiMayBay,ddi.DiaDiem as DiemKhoiHanh,dden.DiaDiem as DiemDen
    FROM ChuyenBay cb,HangHangKhong hhk,DiaDiem ddi,DiaDiem dden
    WHERE cb.IdChuyenBay=${id} and hhk.idHangHangKhong = cb.HangHangKhong and cb.DiemDi = ddi.Id and cb.DiemDen = dden.Id`);
},
}
