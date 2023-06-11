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
        "taxonomy",
        {
            plant_id: {
                type: "int",
                foreignKey: {
                    name: "plant_id",
                    table: "plant",
                    rules: {
                        onDelete: "CASCADE",
                    },
                    mapping: "plant_id",
                },
            },
            kingdom: "string",
            division: "string",
            classis: "string",
            ordo: "string",
            family: "string",
            genus: "string",
            spesies: "string",
        },
        callback
    );
};

exports.down = (db, callback) => {
    return db.dropTable("taxonomy", callback);
};

exports._meta = {
    version: 1,
};
