const pool = require("../../../database/connection");
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
          res.send(err);
        }
        res.send("User registered successfully");
      });
    });
  },
  async authentication(req, res) {
    // return res.send(req.body);
    const { email, password } = req.body;
    pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email], (err, data) => {
      // check user password & compare with hash password
      bcrypt.compare(password, data[0].password, function (err, success) {
        let localStorage = req.app.get("localStorage");
        if (success) {
          // create token login
          if (data[0].role === "1") {
            localStorage.setItem('name', data[0].name)
            localStorage.setItem('email', data[0].email)
            localStorage.setItem('role', data[0].role)
            return res.redirect("/");
          } else {
            let token = jwt.sign(data[0], randomstring.generate(255));
            res.send({ token });
          }
        }
      });
    });
  },

  async login(req, res) {
    if (typeof localStorage === "undefined" || localStorage === null) {
      res.render("login");
    } else {
      res.render("admin");
    }
  },
};

module.exports = AuthControllers;
