const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 *1000,
  timeout: 60 * 60 * 1000,
  host: 'ec2-13-57-206-123.us-west-1.compute.amazonaws.com',
  user: 'sdc',
  password: 'password',
  database: 'aboutGame'
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('MySQL database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('MySQL database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('MySQL database connection was refused.');
    }
    if (err) {
      console.error('This error: ', err);
    }
  } else {
    console.log('connected to mySQL')
  }

  if (connection) {
    connection.release();
  }
  return;
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
