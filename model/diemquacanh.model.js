var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from DiemQuaCanh`);
    },

    single: id => {
        return db.load(`select * form DiemQuaCanh where IdDiemQuaCanh=${id}`);
    },

}