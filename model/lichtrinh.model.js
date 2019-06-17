var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from LichTrinh`);
    },

    lichTrinhByChuyenBay: id =>{
        var query = `SELECT lt.ThuTu,ddi.DiaDiem as DiemKhoiHanh,DATE_FORMAT(cb.GioCatCanh,'%H:%m:%s %d-%c-%Y') as GioCatCanh,dden.DiaDiem as DiemDen,DATE_FORMAT(cb.GioHaCanh,'%H:%m:%s %d-%c-%Y') as GioHaCanh,TIMEDIFF(cb.GioHaCanh,cb.GioCatCanh) as ThoiGianBay
                    FROM LichTrinh lt
                    INNER JOIN ChangBay cb
                    ON cb.IdChangBay = lt.ChangBay
                    INNER JOIN DiaDiem ddi
                    ON cb.DiemKhoiHanh = ddi.Id
                    INNER JOIN DiaDiem dden
                    ON cb.DiemDen = dden.Id
                    WHERE lt.ChuyenBay = ${id}`;
        return db.load(query);
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
    }

    
}