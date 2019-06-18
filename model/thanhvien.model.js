var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from ThanhVien`);
    },

    index: () =>{
        return db.load(`SELECT tv.IdThanhVien,tv.TaiKhoan,tv.DiemThuong,tv.ThongTin
                        FROM ThanhVien tv  `);
    },


    searchWithKey: keyword =>{
        return db.load(`SELECT tv.IdThanhVien,tv.TaiKhoan,tv.DiemThuong,tv.ThongTin
                        FROM	ThanhVien tv 
                        WHERE tv.TaiKhoan like '%${keyword}%'
                        `);
    },

    detailWithId: id => {
        return db.load(`SELECT tv.*,kh.*, IF (kh.GioiTinh < 1,'Nữ','Nam') as LoaiGioiTinh
                        FROM ThanhVien tv,ThongTinKhachHangGiaoDich kh
                        WHERE tv.IdThanhVien = kh.IdThanhVien and tv.IdThanhVien  = ${id}`);
    },

    single: id => {
        return db.load(`select * from ThanhVien where IdThanhVien=${id}`);
    },
    updateInfor: (id,idInfor) => {
        return db.load(`UPDATE ThanhVien
                        SET ThongTin = ${idInfor}
                        WHERE IdThanhVien =  ${id}`);
    },
    singleByTaiKhoan: tk => {
        return db.load(`select * from ThanhVien where TaiKhoan like '${tk}'`);
    },

    detailUserById: id => {
        return db.load(`SELECT tv.IdThanhVien,tv.TaiKhoan,tv.DiemThuong,ttkh.*,ttd.SoHieuThe,ttd.HoTen as HoTenChuThe,ttd.CSC,ttd.NgayHetHan
                        FROM ThanhVien tv,ThongTinKhachHangGiaoDich ttkh,TheTinDung ttd
                        WHERE tv.ThongTin = ttkh.IdKhachHang and ttkh.TheTinDung = ttd.IdThe and tv.IdThanhVien = ${id}`);
    },

    add: entity =>{
        return db.add(`ThanhVien`,entity);
    },

    update: entity =>{
        return db.update(`ThanhVien`,`IdThanhVien`,entity);
    },

    delete: cmnd => {
        return db.delete(`ThanhVien`,`IdThanhVien`,cmnd);
    },

    updatePoint: (point,id) => {
        return db.load(`UPDATE ThanhVien
                        SET DiemThuong = ${point}
                        WHERE IdThanhVien =  ${id}`);
    },
    updatePassword: (pass,id) => {
        return db.load(`UPDATE ThanhVien
                        SET MatKhau = '${pass}'
                        WHERE IdThanhVien =  ${id}`);
    }
}