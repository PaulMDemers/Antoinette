const mysql = require('mysql2');

var pool = mysql.createPool({
    host: process.env.DB_ADDRESS,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

var promisePool = pool.promise();

module.exports.Pool = promisePool;