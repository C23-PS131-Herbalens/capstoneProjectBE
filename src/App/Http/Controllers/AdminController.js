const pool = require("../../../database/connection");

const AdminControllers = {
  async index(req, res) {
    let localStorage = req.app.get("localStorage");
    if (typeof localStorage === "undefined" || localStorage === null) {
      res.redirect("/login");
    }
    res.render("admin");
  },
};

module.exports = AdminControllers;
