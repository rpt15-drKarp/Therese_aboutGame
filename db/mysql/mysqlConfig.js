const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 *1000,
  timeout: 60 * 60 * 1000,
  host: 'ec2-54-153-113-85.us-west-1.compute.amazonaws.com',
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

pool.query = util.promisify(pool.query);

module.exports = {
  pool
};

// mysql -u root < db/mysql/schema.sql
