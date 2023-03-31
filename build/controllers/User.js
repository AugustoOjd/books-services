"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regiterUser = void 0;
const express_1 = require("express");
const UserDirector_1 = __importDefault(require("../models/UsersManagers/UserDirector"));
const UserBuilder_1 = __importDefault(require("../models/UsersManagers/UserBuilder"));
const regiterUser = (req = express_1.request, res = express_1.response) => {
    const { name, lastName, email, password, status = true, balance = 2000 } = req.body;
    const userBuilder = new UserBuilder_1.default();
    const userDirector = new UserDirector_1.default(userBuilder);
    try {
        const newRegularUser = userDirector.createRegularUser(name, lastName, email, password, status, balance);
        return res.status(201).json({
            msg: 'regular user creando correctamente',
            payload: newRegularUser
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.regiterUser = regiterUser;
