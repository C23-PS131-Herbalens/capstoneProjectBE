const pool = require("../../../database/connection");

const AdminControllers = {
  async index(req, res) {
    res.render("admin");
  },
};

module.exports = AdminControllers;
