var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from ChuyenBay`);
    },

    single: id => {
        return db.load(`select * form ChuyenBay where IdChuyenBay=${id}`);
    },
}