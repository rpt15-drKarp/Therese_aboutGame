const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  user: 'root',
  database: 'aboutGame'
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

pool.query('SET GLOBAL connect_timeout=30000');

pool.query = util.promisify(pool.query);

module.exports = {
  pool
};

// mysql -u root < db/schema.sql
