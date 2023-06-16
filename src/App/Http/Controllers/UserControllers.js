const pool = require('../../../database/connection');
const UserControllers = {
    async getUsers(req, res) {
        pool.query("SELECT * FROM users", (err, users, fields) => {
            if (err) {
                return res.send(err);
            }
            return res.send({ users });
        });
    }
}

module.exports = UserControllers;