const db = require('../index');
const table_name = 'tfinOrders';

const OrderItemsModel = require('./OrderItemsModel');

class OrderModel {
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
          if(res.length > 0){
            OrderItemsModel.get(res[0].id).then((result) => {
              if(result.length > 0 ){
                res[0]['items']=result;
              }else{
                res[0]['items']=[];
              }
              resolve(res);
            } ).catch((err) => reject(err));
          }else{
            resolve("No order found");
          }
         
        }
      });
    });
  }

  static save(data) {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${table_name} (customer_id, total, comments) VALUES (?, ?, ?)`,
                  [data.customer_id, data.total, data.comments], (err, res) => {
        if (err) {
          reject(err);
        } else {
          OrderItemsModel.save(res.insertId, data.items).then((result) => resolve(result)).catch((err) => reject(err));
        }
      });
    });
  }

  static update(data) {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${table_name} SET customer_id = ?, total = ?, comments = ?, discount = ? WHERE id = ?`,
                  [data.customer_id, data.total, data.comments, data.discount, data.id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

}

module.exports = OrderModel;