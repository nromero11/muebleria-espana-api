require('dotenv').config();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = {
    // execute any SQL query
    query: (text, params, callback) => {
      const start = Date.now();
      return con.query(text, params, (err, res) => {
        const duration = Date.now() - start;
        console.log('executed query', {
          text,
          duration
        });
        callback(err, res);
      });
    }
}