const pool = require('../../../database/connection');
const plantController = {
    async getPlants(req, res) {
        let plantName = req.query.name
        if (plantName) {
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
    },
    async getPlantById(req, res) {
        let plantId = req.params.id
        pool.query("SELECT * FROM plants WHERE plant_id = ? LIMIT 1", [plantId], (err, plants, fields) => {
            if (err) {
                console.log(err);
            }
            res.send({ plants });
        });
    }
}

module.exports = plantController;