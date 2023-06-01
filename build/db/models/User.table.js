"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const pgConnection_1 = require("../pgConnection");
exports.User = pgConnection_1.sequelize.define('User', {
    userId: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    lastName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    country: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    status: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    role: { type: sequelize_1.DataTypes.STRING, allowNull: false, defaultValue: 'client' },
    typeAccount: { type: sequelize_1.DataTypes.STRING, allowNull: false, defaultValue: 'regular' },
    balance: { type: sequelize_1.DataTypes.BIGINT, allowNull: false, },
    discount: { type: sequelize_1.DataTypes.BIGINT, allowNull: false, },
    freeShipping: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    registerDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    updatedDate: { type: sequelize_1.DataTypes.DATE, allowNull: false }
});
