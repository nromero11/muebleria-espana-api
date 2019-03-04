const db = require('../index');
const table_name = 'tfinOrderItems';

class OrderItemsModel {
  constructor() {

  }

  static get(order_id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table_name} where order_id = ?`, [order_id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static save(order_id, data) {
    var arrayItems = this.getItemsAsArray(order_id, data);
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${table_name} (order_id, product_id, quantity) VALUES ?`,
        [arrayItems], (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  static getItemsAsArray(order_id, products){
    var arrayItems = [];
    for (var i = 0; i < products.length; i++) {
      var arrayItem = [order_id, products[i].product_id, products[i].quantity];
      arrayItems.push(arrayItem);
    }
    return arrayItems;
  }

}

module.exports = OrderItemsModel;