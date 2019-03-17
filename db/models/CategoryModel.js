const db = require('../index');
const table_name = 'tpCategories';

class CategoryModel {
  constructor() {

  }

  static getAll(where = '1=1', limit, offset) {
    return new Promise((resolve, reject) => {

      let query = `SELECT * FROM ${table_name} where${where}LIMIT ${limit} OFFSET ${offset}`; 
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          db.query(`Select count(*) as totalCount from ${table_name} `, (countQueryerr, countQueryres) => {
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

  static get(id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table_name} where id = ?`, [id], (err, res) => {
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
      db.query(`INSERT INTO ${table_name} (name) VALUES (?)`,
        [data.name], (err, res) => {
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
      db.query(`UPDATE ${table_name} SET name = ? WHERE id = ?`,
        [data.name, data.id], (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }

}

module.exports = CategoryModel;