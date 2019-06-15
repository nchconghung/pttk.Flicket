var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from LichTrinh`);
    },

    listWithDetailByParams: (diemdi,diemden,ngaydi,hangghe) =>{

        return db.load(`SELECT lt.*,cab.DiemKhoiHanh as IdDiemKhoiHanh,dd.DiaDiem as DiemKhoiHanh,dd.SanBay as SanBayKhoiHanh,cab.GioCatCanh,cab.DiemDen as IdDiemDen,dd1.DiaDiem as DiemDen,dd1.SanBay as SanBayHaCanh,cab.GioHaCanh,cab.ThoiGianBay
        FROM LichTrinh lt
        INNER JOIN ChangBay cab
        ON cab.IdChangBay = lt.ChangBay
        
        INNER JOIN DiaDiem dd
        ON dd.Id = cab.DiemKhoiHanh
        
        INNER JOIN DiaDiem dd1
        ON dd1.Id = cab.DiemDen
        
        WHERE lt.ChuyenBay in ( SELECT cb.IdChuyenBay
                                FROM ChuyenBay cb 
                                
                                INNER JOIN LichTrinh lt 
                                ON lt.ChuyenBay = cb.IdChuyenBay AND lt.ThuTu = 1

                                INNER JOIN ChangBay cab
                                ON cab.IdChangBay = lt.ChangBay AND cab.GioCatCanh LIKE "${ngaydi}%"
                                
                                WHERE cb.DiemDi = ${diemdi} and cb.DiemDen = ${diemden} and cb.CacHangGhe like '%${hangghe}%')
        GROUP BY lt.IdLichTrinh,lt.ChuyenBay`);


        // return db.load(`SELECT lt.*,cab.DiemKhoiHanh as IdDiemKhoiHanh,dd.DiaDiem as DiemKhoiHanh,dd.SanBay as SanBayKhoiHanh,cab.GioCatCanh,cab.DiemDen as IdDiemDen,dd1.DiaDiem as DiemDen,dd1.SanBay as SanBayHaCanh,cab.GioHaCanh,cab.ThoiGianBay
        // FROM LichTrinh lt
        // INNER JOIN ChangBay cab
        // ON cab.IdChangBay = lt.ChangBay
        
        // INNER JOIN DiaDiem dd
        // ON dd.Id = cab.DiemKhoiHanh
        
        // INNER JOIN DiaDiem dd1
        // ON dd1.Id = cab.DiemDen
        
        // WHERE lt.ChuyenBay = ${chuyenbay}`);  
      },
    
    singleWithDetailByIdChuyenBay: (id) =>{

    return db.load(`SELECT lt.*,cab.DiemKhoiHanh as IdDiemKhoiHanh,dd.DiaDiem as DiemKhoiHanh,dd.SanBay as SanBayKhoiHanh,cab.GioCatCanh,cab.DiemDen as IdDiemDen,dd1.DiaDiem as DiemDen,dd1.SanBay as SanBayHaCanh,cab.GioHaCanh,cab.ThoiGianBay
    FROM LichTrinh lt
    INNER JOIN ChangBay cab
    ON cab.IdChangBay = lt.ChangBay
    
    INNER JOIN DiaDiem dd
    ON dd.Id = cab.DiemKhoiHanh
    
    INNER JOIN DiaDiem dd1
    ON dd1.Id = cab.DiemDen
    
    WHERE lt.ChuyenBay = ${id}`);
    },
    single: id => {
        return db.load(`select * form LichTrinh where IdLichTrinh=${id}`);
    },
}