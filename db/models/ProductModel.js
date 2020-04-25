const db = require('../index');
const table_name = 'tpProducts';
const table_categoty_name = 'tpCategories';

class ProductModel {
  constructor() {

  }

  static getAll(where, orderBy, limit, offset) {
    return new Promise((resolve, reject) => {

      let query = `SELECT p.*, c.name as category_name FROM ${table_name} as p, ${table_categoty_name} as c where${where}${orderBy} LIMIT ${limit} OFFSET ${offset}`; 
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else { 
          db.query(`Select count(*) as totalCount from ${table_name} as p, ${table_categoty_name} as c where${where}`, (countQueryerr, countQueryres) => {
            if (countQueryerr) {
              reject(countQueryerr);
            } else {
              let data = {
                'data': res,
                'total': countQueryres[0].totalCount
              };
              resolve(data);
            }
          });
        }
      });
    });
  }

  static getallProducts() {
    return new Promise((resolve, reject) => {
      let query = `SELECT p.*, c.name as category_name FROM ${table_name} as p, ${table_categoty_name} as c where p.category_id = c.id `; 
      db.query(query, (err, res) => {
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