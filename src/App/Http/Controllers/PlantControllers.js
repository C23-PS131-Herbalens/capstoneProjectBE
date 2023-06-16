const pool = require("../../../database/connection");

const plantController = {
  async getPlants(req, res) {
    let plantName = req.query.name;
    if (plantName) {
      pool.query(
        "SELECT p.plant_id, p.plant_name, p.image, p.description, p.benefit, t.*, GROUP_CONCAT(ls.recipe SEPARATOR ';;') AS recipes FROM plants p INNER JOIN taxonomy t ON p.plant_id = t.plant_id INNER JOIN recipe_plants_list rp ON p.plant_id = rp.plant_id INNER JOIN recipe_list ls ON ls.recipe_id = rp.recipe_id  WHERE p.plant_name = ? GROUP BY p.plant_id LIMIT 1",
        [plantName],
        (err, plants, fields) => {
          if (err) {
            res.send(err);
          }
          const plantData = plants.map((item) => {
            let _taxonomy = {};
            _taxonomy.kingdom = item.kingdom;
            _taxonomy.division = item.division;
            _taxonomy.classis = item.classis;
            _taxonomy.ordo = item.ordo;
            _taxonomy.family = item.family;
            _taxonomy.genus = item.genus;
            _taxonomy.species = item.species;

            item.benefit = item.benefit.split(";;");
            item.recipes = item.recipes.split(";;");

            return { ...item, taxonomy: _taxonomy };
          });

          res.send(plantData[0]);
        }
      );
    } else {
      pool.query(
        "SELECT p.plant_id, p.plant_name, p.image, p.description, p.benefit, t.*, GROUP_CONCAT(ls.recipe SEPARATOR ';;') AS recipes FROM plants p INNER JOIN taxonomy t ON p.plant_id = t.plant_id INNER JOIN recipe_plants_list rp ON p.plant_id = rp.plant_id INNER JOIN recipe_list ls ON ls.recipe_id = rp.recipe_id GROUP BY p.plant_id",
        (err, plants, fields) => {
          if (err) {
            res.send(err);
          }

          const plantData = plants.map((item) => {
            let _taxonomy = {};
            _taxonomy.kingdom = item.kingdom;
            _taxonomy.division = item.division;
            _taxonomy.classis = item.classis;
            _taxonomy.ordo = item.ordo;
            _taxonomy.family = item.family;
            _taxonomy.genus = item.genus;
            _taxonomy.species = item.species;

            item.benefit = item.benefit.split(";;");
            item.recipes = item.recipes.split(";;");

            return { ...item, taxonomy: _taxonomy };
          });

          res.send(plantData);
        }
      );
    }
  },
  async getPlantById(req, res) {
    let plantId = req.params.id;
    pool.query(
      "SELECT p.plant_id, p.plant_name, p.image, p.description, p.benefit, t.*, GROUP_CONCAT(ls.recipe SEPARATOR ';;') AS recipes FROM plants p INNER JOIN taxonomy t ON p.plant_id = t.plant_id INNER JOIN recipe_plants_list rp ON p.plant_id = rp.plant_id INNER JOIN recipe_list ls ON ls.recipe_id = rp.recipe_id WHERE p.plant_id = ? GROUP BY p.plant_id LIMIT 1",
      [plantId],
      (err, plants, fields) => {
        if (err) {
          res.send(err);
        }
        const plantData = plants.map((item) => {
          let _taxonomy = {};
          _taxonomy.kingdom = item.kingdom;
          _taxonomy.division = item.division;
          _taxonomy.classis = item.classis;
          _taxonomy.ordo = item.ordo;
          _taxonomy.family = item.family;
          _taxonomy.genus = item.genus;
          _taxonomy.species = item.species;

          item.benefit = item.benefit.split(";;");
          item.recipes = item.recipes.split(";;");

          return { ...item, taxonomy: _taxonomy };
        });

        res.send(plantData[0]);
      }
    );
  },

  async listPlant(req, res) {
    let localStorage = req.app.get("logged");
    const adminData = {
      name: req.app.get("name"),
      email: req.app.get("email"),
    };
    if (typeof localStorage === "undefined" || localStorage === null) {
      res.redirect("/login");
    }
    pool.query(
      "SELECT p.plant_id, p.plant_name, p.image, p.description, p.benefit, t.*, GROUP_CONCAT(ls.recipe SEPARATOR ';;') AS recipes FROM plants p INNER JOIN taxonomy t ON p.plant_id = t.plant_id INNER JOIN recipe_plants_list rp ON p.plant_id = rp.plant_id INNER JOIN recipe_list ls ON ls.recipe_id = rp.recipe_id GROUP BY p.plant_id",
      (err, plants, fields) => {
        if (err) {
          res.send(err);
        }

        const plantData = plants.map((item) => {
          let _taxonomy = {};
          _taxonomy.kingdom = item.kingdom;
          _taxonomy.division = item.division;
          _taxonomy.classis = item.classis;
          _taxonomy.ordo = item.ordo;
          _taxonomy.family = item.family;
          _taxonomy.genus = item.genus;
          _taxonomy.species = item.species;

          item.benefit = item.benefit.split(";;");
          item.recipes = item.recipes.split(";;");

          return { ...item, taxonomy: _taxonomy };
        });

        res.render("plants", { data: plantData, adminData });
      }
    );
  },
};

module.exports = plantController;
