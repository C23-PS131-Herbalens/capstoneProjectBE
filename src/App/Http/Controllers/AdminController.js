const pool = require("../../../database/connection");

const AdminControllers = {
  async index(req, res) {
    let localStorage = req.app.get("logged");
    const adminData = {
      name: req.app.get("name"),
      email: req.app.get("email"),
    };

    if (typeof localStorage === "undefined" || localStorage === null) {
      res.redirect("/login");
    }
    pool.query("SELECT * FROM users WHERE role != 1", (err, data) => {
      res.render("admin", { data, adminData });
    });
  },
};

module.exports = AdminControllers;
