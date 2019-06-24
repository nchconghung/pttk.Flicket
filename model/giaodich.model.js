var db = require("../utils/db-mysql");

module.exports = {
    listByIdUser: id => {
        return db.load(`SELECT gd.*
        FROM GiaoDich gd
        WHERE gd.KhachHangGiaoDich = ${id}`);
    },
    count: ()=>{
        return db.load(`select count(GiaoDich.IdGiaoDich) as TongSoGiaoDich from GiaoDich`);
    },
    singleDetailByIdGiaoDich: id => {
        return db.load(`select GiaoDich.*,ChuyenBay.*,ThongTinKhachHangGiaoDich.*,ChangBay.GioCatCanh,ddi.DiaDiem as DiaDiemDi,dden.DiaDiem as DiaDiemDen,HangHangKhong.HangHangKhong as HHK
        from GiaoDich
        inner join ChuyenBay
        on GiaoDich.ChuyenBay = ChuyenBay.IdChuyenBay
        inner join HangHangKhong 
        on ChuyenBay.HangHangKhong = HangHangKhong.idHangHangKhong
        inner join ThongTinKhachHangGiaoDich
        on ThongTinKhachHangGiaoDich.IdKhachHang = GiaoDich.KhachHangGiaoDich
        inner join LichTrinh
        on ChuyenBay.IdChuyenBay = LichTrinh.ChuyenBay and LichTrinh.ThuTu = 1
        inner join ChangBay
        on ChangBay.IdChangBay = LichTrinh.ChangBay
        inner join DiaDiem ddi
        on ddi.Id = ChuyenBay.DiemDi
        inner join DiaDiem dden
        on dden.Id = ChuyenBay.DiemDen
        where IdGiaoDich = ${id}`);
    },

    allHistoryById: id => {
        return db.load(`select GiaoDich.IdGiaoDich,GiaoDich.MaDatCho,ChuyenBay.MaChuyenBay,date_format(GiaoDich.ThoiDiemGiaoDich,'%H:%i:%s %d/%m/%Y') as ThoiDiemGiaoDich,date_format(ChangBay.GioCatCanh,'%H:%i:%s %d/%m/%Y') as NgayBay,ddi.DiaDiem as DiemKhoiHanh,dden.DiaDiem as DiemDen
        from GiaoDich
        inner join ChuyenBay
        on ChuyenBay = ChuyenBay.IdChuyenBay
        inner join LichTrinh
        on LichTrinh.ChuyenBay = ChuyenBay.IdChuyenBay and LichTrinh.ThuTu = 1
        inner join ChangBay
        on LichTrinh.ChangBay = ChangBay.IdChangBay
        inner join DiaDiem ddi
        on ddi.Id = ChuyenBay.DiemDi 
        inner join DiaDiem dden
        on dden.Id = ChuyenBay.DiemDen
        where GiaoDich.KhachHangGiaoDich = ${id}`);
    },

    detailForUser: id => {
        return db.load(`
        SELECT gd.*,date_format(gd.ThoiDiemGiaoDich,"%H:%i:%s %d-%m-%Y") as ThoiGianGiaoDich
        FROM GiaoDich gd
        INNER JOIN ChuyenBay cb
        ON cb.IdChuyenBay = gd.ChuyenBay
        INNER JOIN HangHangKhong hhk
        ON hhk.idHangHangKhong = cb.HangHangKhong
        INNER JOIN HanhKhach hk
        ON hk.GiaoDich = gd.IdGiaoDich
        INNER JOIN LichTrinh lt 
        ON lt.ChuyenBay = cb.IdChuyenBay  and lt.ThuTu = 1
        INNER JOIN ChangBay cab
        ON cab.IdChangBay = lt.ChangBay
        
         WHERE gd.KhachHangGiaoDich = ${id} `);
    },

    add: entity =>{
        return db.add(`GiaoDich`,entity);
    },

    update: entity =>{
        return db.update(`GiaoDich`,`IdGiaoDich`,entity);
    },

    delete: id => {
        return db.delete(`GiaoDich`,`IdGiaoDich`,id);
    },
    idGiaoDichByIdKhachHang: id => {
        return db.load(`select IdGiaoDich from GiaoDich where KhachHangGiaoDich = ${id}`);
    }
}