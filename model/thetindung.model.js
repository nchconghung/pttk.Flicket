var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from TheTinDung`);
    },

    single: id => {
        return db.load(`select * form TheTinDung where IdThe=${id}`);
    },

    add: entity =>{
        return db.add(`TheTinDung`,entity);
    },

    update: entity =>{
        return db.update(`TheTinDung`,`IdThe`,entity);
    },

    delete: id => {
        return db.delete(`TheTinDung`,`IdThe`,id);
    }
}