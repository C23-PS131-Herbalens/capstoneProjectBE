const pool = require("../../../database/connection");
// hash password
const bcrypt = require("bcrypt");
const saltRounds = 10;
// jwt token
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const AuthControllers = {
  async registration(req, res) {
    const { name, email, password } = req.body;
    let role = 2;
    pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email], (err, data) => {
      if (data.length === 0) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          pool.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hash, role], (err, result) => {
            if (err) {
              return res.send(err);
            }
            return res.send({ status: 200, message: "User registered successfully" });
          });
        });
      } else {
        return res.send({ status: 200, message: 'Email was taken!' });
      }
    })
  },
  async authentication(req, res) {
    // return res.send(req.body);
    const { email, password } = req.body;
    pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email], (err, data) => {
      if (data.length === 0) {
        return res.send({ status: 404, message: 'User not found!' });
      }
      // check user password & compare with hash password
      bcrypt.compare(password, data[0].password, function (error, success) {
        if (success) {
          // create token login
          if (data[0].role === "1") {
            req.app.set("logged", true);
            req.app.set('name', data[0].name)
            req.app.set('email', data[0].email)
            return res.redirect("/");
          } else {
            let token = jwt.sign(data[0], randomstring.generate(255));
            return res.send({ token });
          }
        }
        if (error) {
          return res.send(error)
        }
      });
    });
  },

  async login(req, res) {
    let localStorage = req.app.get("logged");
    if (typeof localStorage === "undefined" || localStorage === null) {
      return res.render("login");
    } else {
      return res.redirect("/");
    }
  },

  async logout(req, res) {
    req.app.set("logged", null);
    return res.redirect("/login");
  },
};

module.exports = AuthControllers;
