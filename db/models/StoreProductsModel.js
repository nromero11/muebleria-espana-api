const db = require('../index');
const table_name = 'tpStoreProducts';

class StoreProductsModel {
  constructor() {

  }

  static get(store_id, product_id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table_name} where store_id = ? and product_id = ?`,[store_id, product_id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static save(data) {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${table_name} (store_id, product_id, quantity) VALUES (?, ?, ?)`,
                  [data.store_id, data.product_id, data.quantity], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static update(data) {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${table_name} SET quantity = ? WHERE product_id = ? and store_id = ?`,
                  [data.quantity, data.product_id, data.store_id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

}

module.exports = StoreProductsModel;