const pool = require('../../../database/connection');
const UserControllers = {
    async getUsers(req, res) {
        pool.query("SELECT * FROM users", (err, users, fields) => {
            if (err) {
                console.log(err);
            }
            res.send({ users });
        });
    }
}

module.exports = UserControllers;