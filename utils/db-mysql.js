var mysql = require('mysql');

var createConnection = () => {
  return mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'maudoden',
    database: 'flicket-database'
  });
}

module.exports={
    load: sql => {
       return new Promise((resolve,reject) =>{
            var conn = createConnection();
            conn.connect();
            con.query(sql,(error,result,fields)=>{
                if (error){
                    reject(error);
                } else{
                    resolve(result);
                }
            });
            con.end();
       });
    },
    add: (tableName, entity) => {
        return new Promise((resolve, reject) => {
          var sql = `insert into ${tableName} set ?`;
          var connection = createConnection();
          connection.connect();
          connection.query(sql, entity, (error, value) => {
            if (error) {
              reject(error);
            } else {
              resolve(value.insertId);
            }
            connection.end();
          });
        });
      },
    
      update: (tableName, idField, entity) => {
        return new Promise((resolve, reject) => {
          var id = entity[idField];
          delete entity[idField];
    
          var sql = `update ${tableName} set ? where ${idField} = ?`;
          var connection = createConnection();
          connection.connect();
          connection.query(sql, [entity, id], (error, value) => {
            if (error) {
              reject(error);
            } else {
              resolve(value.changedRows);
            }
            connection.end();
          });
        });
      },
    
      updateWithVarcharID: (tableName, idField, entity) => {
        return new Promise((resolve, reject) => {
          var id = entity[idField];
          delete entity[idField];
    
          var sql = `update ${tableName} set ? where ${idField} like ?`;
          var connection = createConnection();
          connection.connect();
          connection.query(sql, [entity, id], (error, value) => {
            if (error) {
              reject(error);
            } else {
              resolve(value.changedRows);
            }
            connection.end();
          });
        });
      },

      delete: (tableName, idField, id) => {
        return new Promise((resolve, reject) => {
          var sql = `delete from ${tableName} where ${idField} = ?`;
          var connection = createConnection();
          connection.connect();
          connection.query(sql, id, (error, value) => {
            if (error) {
              reject(error);
            } else {
              resolve(value.affectedRows);
            }
            connection.end();
          });
        });
      },

      deleteWithVarcharID: (tableName, idField, id) => {
        return new Promise((resolve, reject) => {
          var sql = `delete from ${tableName} where ${idField} like ?`;
          var connection = createConnection();
          connection.connect();
          connection.query(sql, id, (error, value) => {
            if (error) {
              reject(error);
            } else {
              resolve(value.affectedRows);
            }
            connection.end();
          });
        });
      },
}