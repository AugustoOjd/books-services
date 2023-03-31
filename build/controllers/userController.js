"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regiterUser = void 0;
const express_1 = require("express");
const UserDirector_1 = __importDefault(require("../models/UsersManagers/UserDirector"));
const UserBuilder_1 = __importDefault(require("../models/UsersManagers/UserBuilder"));
const userBuilder = new UserBuilder_1.default();
const userDirector = new UserDirector_1.default(userBuilder);
const regiterUser = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, email, country, password, status = true, balance = 2000 } = req.body;
    try {
        userDirector.createRegularUser(name, lastName, email, country, password, status, balance);
        const newRegularUser = userBuilder.build();
        return res.status(201).json({
            msg: 'regular user creando correctamente',
            payload: newRegularUser
        });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: 'datos incorrectos'
        });
    }
});
exports.regiterUser = regiterUser;
