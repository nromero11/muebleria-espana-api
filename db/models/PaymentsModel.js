const db = require('../index');
const table_name = 'tfinPayments';

class PaymentsModel {
  constructor() {

  }

  static get(order_id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table_name} where order_id = ?`,[order_id], (err, res) => {
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
      db.query(`INSERT INTO ${table_name} (order_id, amount, finantial_number) VALUES (?, ?, ?)`,
                  [data.order_id, data.amount, data.finantial_number], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

}

module.exports = PaymentsModel;