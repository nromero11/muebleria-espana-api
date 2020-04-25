const db = require('../index');
const table_name = 'tmCustomers';

class ClientModel {
  constructor() {

  }

  static getAll(where, orderBy, limit, offset) {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM ${table_name} where${where}${orderBy}`; 
      if(limit != ''){
        query +=  ` LIMIT ${limit}`;
      }
      if(offset != ''){
        query +=  ` OFFSET ${offset}`;
      }
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          db.query(`Select count(*) as totalCount from ${table_name} where${where}`, (countQueryerr, countQueryres) => {
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
      db.query(`SELECT * FROM ${table_name} where id = ?`,[id], (err, res) => {
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
      db.query(`INSERT INTO ${table_name} (firstname, lastname, location, cid, phone, celphone, store_id) VALUES (?,?,?,?,?,?,?)`,
                  [data.firstname, data.lastname, data.location, data.cid, data.phone, data.celphone, data.store_id], (err, res) => {
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
      db.query(`UPDATE ${table_name} SET firstname = ?, lastname = ?, location = ?, cid = ?, phone = ?, celphone = ?, store_id = ?, isActive = ?  WHERE id = ?`,
                  [data.firstname, data.lastname, data.location, data.cid, data.phone, data.celphone, data.store_id, data.isActive, data.id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

}

module.exports = ClientModel;