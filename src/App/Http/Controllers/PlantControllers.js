const pool = require("../../../database/connection");

const plantController = {
    async getPlants(req, res) {
        let plantName = req.query.name;
        if (plantName) {
            pool.query("SELECT p.plant_id, p.plant_name, p.image, p.description, p.benefit, t.* FROM plants p INNER JOIN taxonomy t ON p.plant_id = t.plant_id  WHERE p.plant_name = ? LIMIT 1", [plantName], (err, plants, fields) => {
                if (err) {
                    console.log(err);
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

                    return { ...item, taxonomy: _taxonomy };
                });

                res.send(plantData);
            });
        } else {
            pool.query("SELECT p.plant_id, p.plant_name, p.image, p.description, p.benefit, t.* FROM plants p INNER JOIN taxonomy t ON p.plant_id = t.plant_id", (err, plants, fields) => {
                if (err) {
                    console.log(err);
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

                    return { ...item, taxonomy: _taxonomy };
                });

                res.send(plantData);
            });
        }
    },
    async getPlantById(req, res) {
        let plantId = req.params.id;
        pool.query("SELECT p.plant_id, p.plant_name, p.image, p.description, p.benefit, t.* FROM plants p INNER JOIN taxonomy t ON p.plant_id = t.plant_id WHERE p.plant_id = ? LIMIT 1", [plantId], (err, plants, fields) => {
            if (err) {
                console.log(err);
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

                return { ...item, taxonomy: _taxonomy };
            });

            res.send(plantData);
        });
    },
};

module.exports = plantController;
