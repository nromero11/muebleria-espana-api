const db = require('../index');
const table_name = 'tpProducts';

class ProductModel {
  constructor() {

  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table_name}`, (err, res) => {
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
      db.query(`SELECT * FROM ${table_name} where id_producto = ?`,[id], (err, res) => {
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
      db.query(`INSERT INTO ${table_name} (name, category_id, comments, price) VALUES (?,?,?,?)`,
                  [data.name, data.category_id, data.comments, data.price], (err, res) => {
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
      db.query(`UPDATE ${table_name} SET name = ?, category_id = ?, comments = ?,	price = ?, isActive = ?	WHERE id = ?`,
                  [data.name, data.category_id, data.comments, data.price, data.isActive, data.id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

}

module.exports = ProductModel;