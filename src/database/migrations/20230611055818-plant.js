"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = (options, seedLink) => {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = (db, callback) => {
    db.createTable(
        "plant",
        {
            plant_id: { type: "int", primaryKey: true, autoIncrement: true },
            plant_name: { type: "string" },
            image: { type: "string" },
            description: "text",
            benefit: "text",
            list_recipe: "text",
        },
        callback
    );
};

exports.down = (db, callback) => {
    return db.dropTable("plant", callback);
};

exports._meta = {
    version: 1,
};
