const db = require('../index');
const table_name = 'tmStores';

class StoreModel {
  constructor() {

  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table_name}` , (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static get(id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table_name} where id = ?`,[id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = StoreModel;