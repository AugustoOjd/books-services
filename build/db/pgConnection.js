"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const pgConfig_1 = require("./pgConfig");
const { development: { username, password, database, host, dialect } } = pgConfig_1.dbConfig;
// export const sequelize = new Sequelize(`${dialect}://${username}:${password}@example.com:${host}/${database}`)
exports.sequelize = new sequelize_1.Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'postgres'
});
