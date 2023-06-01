"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const pgConnection_1 = require("../pgConnection");
const Book_table_1 = require("./Book.table");
exports.Category = pgConnection_1.sequelize.define('Category', {
    categoryId: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.ENUM('classic', 'crime', 'fantasy', 'horror', 'romance'), allowNull: false }
});
exports.Category.hasMany(Book_table_1.Book, {
    foreignKey: 'bookId',
    // sourceKey: 'bookId'
});
Book_table_1.Book.belongsTo(exports.Category, {
    foreignKey: 'categoryId',
    // targetKey: 'authorId'
});
