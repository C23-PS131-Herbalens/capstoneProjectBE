const dotenv = require('dotenv')
// get the client
const mysql = require('mysql2');
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: dotenv.config().parsed.DB_HOST,
    user: dotenv.config().parsed.DB_USER,
    database: dotenv.config().parsed.DB_NAME,
    password: dotenv.config().parsed.DB_PASS,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

module.exports = pool;