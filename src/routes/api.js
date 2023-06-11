const express = require('express')
const router = express.Router()
// get the client
const mysql = require('mysql2');

// hash password
const bcrypt = require('bcrypt');
const saltRounds = 10;
// jwt token
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");


// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'herbalens',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'herbalens'
// })
router.get('/', async (req, res) => {
    pool.query('SELECT * FROM users', (err, users, fields) => {
        if (err) {
            console.log(err)
        }
        res.send({ users })
    })
    // console.log(data)
})

router.post('/add', async (req, res) => {
    const { name, email, password, role } = req.body
    // res.send(req.body)
    bcrypt.hash(password, saltRounds, function (err, hash) {
        pool.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hash, role], (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send({ result })
        })
    });

})
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    // res.send(req.body)
    pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email], (err, data) => {
        bcrypt.compare(password, data[0].password, function (err, result) {
            let token = jwt.sign({ data }, randomstring.generate(255));
            res.send({ token })
        });
    });

})

module.exports = router