var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from LichTrinh`);
    },

    single: id => {
        return db.load(`select * form LichTrinh where IdLichTrinh=${id}`);
    },
}