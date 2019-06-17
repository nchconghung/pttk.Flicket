var db = require("../utils/db-mysql");

module.exports = {
    all: () =>{
        return db.load(`select * from Ve`);
    },

    single: id => {
        return db.load(`select * from Ve where IdVe=${id}`);
    },

    add: entity =>{
        return db.add(`Ve`,entity);
    },

    update: entity =>{
        return db.update(`Ve`,`IdVe`,entity);
    },

    delete: id => {
        return db.delete(`Ve`,`IdVe`,id);
    }
}