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
        "users",
        {
            id: { type: "int", primaryKey: true, autoIncrement: true },
            email: { type: "string", unique: true },
            name: "string",
            password: "string",
            role: { type: "string", defaultValue: 0 },
        },
        callback
    );
};

exports.down = (db, callback) => {
    db.dropTable("users", callback);
};

exports._meta = {
    version: 1,
};
