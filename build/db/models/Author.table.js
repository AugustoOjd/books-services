"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const sequelize_1 = require("sequelize");
const pgConnection_1 = require("../pgConnection");
const Book_table_1 = require("./Book.table");
exports.Author = pgConnection_1.sequelize.define('Author', {
    authorId: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
});
exports.Author.hasMany(Book_table_1.Book, {
    foreignKey: 'bookId',
    // sourceKey: 'bookId'
});
Book_table_1.Book.belongsTo(exports.Author, {
    foreignKey: 'authorId',
    // targetKey: 'authorId'
});
