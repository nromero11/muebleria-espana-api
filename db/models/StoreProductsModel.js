const db = require('../index');
const table_name = 'tpStoreProducts';
const table_store = 'tmStores';
const table_product = 'tpProducts';

class StoreProductsModel {
  constructor() {

  }

  static get(where, orderBy, limit, offset) {
    return new Promise((resolve, reject) => {
      let query = `SELECT st.id, st.store_id as store_id, st.product_id as product_id, quantity, p.name as productName, s.name as storeName
               from  ${table_name} as st
               inner  join  ${table_product} as p on p.id = st.product_id
               inner  join  ${table_store} as s on s.id = st.store_id
               where${where}${orderBy} LIMIT ${limit} OFFSET ${offset}`;

      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          db.query(`Select count(*) as totalCount from  ${table_name} as st
                    inner  join  ${table_product} as p on p.id = st.product_id
                    inner  join  ${table_store} as s on s.id = st.store_id
                    where${where}${orderBy} LIMIT ${limit} OFFSET ${offset}`, (countQueryerr, countQueryres) => {
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