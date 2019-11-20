const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  user: 'root',
  database: 'aboutGame',
  connectTimeout: 30000
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Pool connection error: ', err);
  }
  if (connection) {
    connection.release();
    return;
  }
});

// const connection = mysql.createConnection({
//   user: 'root',
//   database: 'aboutGame'
// });

// connection.query('SET GLOBAL connect_timeout=30000');
// pool.query('SET GLOBAL connect_timeout=30000');

pool.query = util.promisify(pool.query);
// connection.query = util.promisify(connection.query);

module.exports = {
  pool
};

// module.exports = {
//   connection
// }

// mysql -u root < db/schema.sql
