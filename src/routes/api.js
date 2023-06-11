const express = require("express");
const router = express.Router();
const pool = require("../database/connection");
// hash password
const bcrypt = require("bcrypt");
const saltRounds = 10;
// jwt token
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");

// Route for user , registration & authentication
router.get("/users", async (req, res) => {
    pool.query("SELECT * FROM users", (err, users, fields) => {
        if (err) {
            console.log(err);
        }
        res.send({ users });
    });
});

router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        pool.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hash, role], (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send({ result });
        });
    });
});
router.post("/login", async (req, res) => {
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
})

// Route for get data plant

router.get("/plants", async (req, res) => {
    let plantName = req.query.name
    if (plantName) {
        res.send({ plantName })
        pool.query("SELECT * FROM plants WHERE plant_name = ? LIMIT 1", [plantName], (err, plants, fields) => {
            if (err) {
                console.log(err);
            }
            res.send({ plants });
        });
    } else {
        pool.query("SELECT * FROM plants", (err, plants, fields) => {
            if (err) {
                console.log(err);
            }
            res.send({ plants });
        })
    }
})

router.get("/plants/:id", async (req, res) => {
    let plantId = req.params.id
    pool.query("SELECT * FROM plants WHERE plant_id = ? LIMIT 1", [plantId], (err, plants, fields) => {
        if (err) {
            console.log(err);
        }
        res.send({ plants });
    });
})


module.exports = router;
