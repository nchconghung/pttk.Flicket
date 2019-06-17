var db = require("../utils/db-mysql");

module.exports = {

    add: entity =>{
        return db.add(`HanhKhach`,entity);
    },

    update: entity =>{
        return db.update(`HanhKhach`,`IdHanhKhach`,entity);
    },

    delete: id => {
        return db.delete(`HanhKhach`,`IdHanhKhach`,id);
    }
}