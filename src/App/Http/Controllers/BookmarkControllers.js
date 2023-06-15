const pool = require("../../../database/connection");

const BookmarkControllers = {
    getBookmarks(req, res) {
        const user_id = req.params.userId;
        pool.query(
            "SELECT p.plant_id, p.plant_name, p.image, p.description, p.benefit, t.*, GROUP_CONCAT(ls.recipe SEPARATOR ';;') AS recipes FROM bookmarks b INNER JOIN plants p ON p.plant_id = b.plant_id INNER JOIN taxonomy t ON p.plant_id = t.plant_id INNER JOIN recipe_plants_list rp ON p.plant_id = rp.plant_id INNER JOIN recipe_list ls ON ls.recipe_id = rp.recipe_id WHERE b.user_id = ? GROUP BY b.plant_id",
            [user_id],
            (err, bookmarks) => {
                if (err) {
                    res.send(err);
                }
                const bookmarksData = bookmarks.map((item) => {
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

                res.send(bookmarksData);
            }
        );
    },

    addBookmarks(req, res) {
        const { user_id, plant_id } = req.body;
        pool.query("INSERT INTO bookmarks (user_id, plant_id) VALUES (?, ?)", [user_id, plant_id], (err) => {
            if (err) {
                res.send(err);
            }
            res.send("Bookmark added");
        });
    },

    deleteBookmarks(req, res) {
        const { user_id, plant_id } = req.body;
        pool.query("DELETE FROM bookmarks WHERE user_id = ? AND plant_id = ?", [user_id, plant_id], (err) => {
            if (err) {
                res.send(err);
            }
            res.send("Bookmark deleted");
        });
    },
};

module.exports = BookmarkControllers;
