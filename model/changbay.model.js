var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from ChangBay`);
    },

    single: id => {
        return db.load(`select * form ChangBay where IdChangBay=${id}`);
    },
}