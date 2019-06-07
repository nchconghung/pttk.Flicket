var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from Admin`);
    },

    single: id => {
        return db.load(`select * form Admin where Id=${id}`);
    },

    add: entity =>{
        return db.add(`Admin`,entity);
    },

    update: entity =>{
        return db.update(`Admin`,`Id`,entity);
    },

    delete: id => {
        return db.delete(`Admin`,`Id`,id);
    }
}