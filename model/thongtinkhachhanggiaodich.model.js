var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select *,IF (GioiTinh < 1,'Nữ','Nam') as LoaiGioiTinh from ThongTinKhachHangGiaoDich`);
    },
    allForAdminIndex: () => {
        return db.load(`select IdKhachHang,HoTen,Email,SDT,GiaoDich.IdGiaoDich,ThanhVien.IdThanhVien,ThanhVien.TaiKhoan,date_format(GiaoDich.ThoiDiemGiaoDich,"%H:%i:%s %d-%c-%Y") as ThoiDiemGiaoDich
            from ThongTinKhachHangGiaoDich
            left join GiaoDich on IdKhachHang = GiaoDich.KhachHangGiaoDich
            left join ThanhVien on IdKhachHang = ThanhVien.ThongTin`);
    },
    searchById: id => {
        return db.load(`select IdKhachHang,HoTen,Email,SDT,GiaoDich.IdGiaoDich,GiaoDich.ThoiDiemGiaoDich,ThanhVien.IdThanhVien,ThanhVien.TaiKhoan,date_format(GiaoDich.ThoiDiemGiaoDich,"%H:%i:%s %d-%c-%Y") as ThoiDiemGiaoDich
            from ThongTinKhachHangGiaoDich
            inner join GiaoDich on IdKhachHang = GiaoDich.KhachHangGiaoDich
            left join ThanhVien on IdKhachHang = ThanhVien.ThongTin 
            where IdKhachHang like "%${id}%"`);
    },
    singleForAdmin: id => {
        return db.load(`select * from ThongTinKhachHangGiaoDich where IdKhachHang=${id}`);
    },
    singleForUser: id => {
        return db.load(`select IdKhachHang,ThongTinKhachHangGiaoDich.HoTen,Email,SDT,TheTinDung.IdThe,TheTinDung.HoTen as TenChuThe,TheTinDung.SoHieuThe,date_format(TheTinDung.NgayHetHan,"%m-%Y") as NgayHetHan,TheTinDung.CSC
            from ThongTinKhachHangGiaoDich 
            inner join TheTinDung on TheTinDung.IdThe = TheTinDung
            inner join ThanhVien on ThanhVien.ThongTin = IdKhachHang and ThanhVien.IdThanhVien = ${id}
            `);
    },
    single: id => {
        return db.load(`select e.*, IF (e.GioiTinh < 1,'Nữ','Nam') as LoaiGioiTinh from ThongTinKhachHangGiaoDich e where e.IdKhachHang=${id}`);
    },

    singleForPP: id => {
        return db.load(`select * from ThongTinKhachHangGiaoDich where IdKhachHang=${id}`);
    },

    add: entity =>{
        return db.add(`ThongTinKhachHangGiaoDich`,entity);
    },

    update: entity =>{
        return db.update(`ThongTinKhachHangGiaoDich`,`IdKhachHang`,entity);
    },

    delete: id => {
        return db.delete(`ThongTinKhachHangGiaoDich`,`IdKhachHang`,id);
    },
    count: ()=>{
        return db.load(`select count(ThongTinKhachHangGiaoDich.IdKhachHang) as TongSoKhachHang from ThongTinKhachHangGiaoDich`);
    }
}