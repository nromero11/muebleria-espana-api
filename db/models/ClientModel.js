const db = require('../index');
const table_name = 'tmCustomers';

class ClientModel {
  constructor() {

  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM  ${table_name} `, (err, res) => {
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