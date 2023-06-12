const pool = require('../../../database/connection');
// hash password
const bcrypt = require("bcrypt");
const saltRounds = 10;
// jwt token
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const AuthControllers = {
    async registration(req, res) {
        const { name, email, password, role } = req.body;
        bcrypt.hash(password, saltRounds, function (err, hash) {
            pool.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hash, role], (err, result) => {
                if (err) {
                    console.log(err);
                }
                res.send({ result });
            });
        });
    },
    async authentication(req, res) {
        const { email, password } = req.body;
        pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email], (err, data) => {
            // check user password & compare with hash password
            bcrypt.compare(password, data[0].password, function (err, success) {
                if (success) {
                    // create token login
                    let token = jwt.sign({ data }, randomstring.generate(255));
                    res.send({ token });
                }
            })
        })
    }
}

module.exports = AuthControllers;