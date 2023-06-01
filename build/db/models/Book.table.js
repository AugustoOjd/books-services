"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const sequelize_1 = require("sequelize");
const pgConnection_1 = require("../pgConnection");
exports.Book = pgConnection_1.sequelize.define('Book', {
    bookId: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    // author          : {type:DataTypes.STRING,   allowNull: false},
    editorial: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    stock: { type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    image: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    price: { type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    code: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    pages: { type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    language: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    release: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    // category        : {type:DataTypes.ENUM(),   allowNull: false},
    sold: { type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    type: { type: sequelize_1.DataTypes.ENUM('physical', 'pdf', 'graphic'), allowNull: false },
});
