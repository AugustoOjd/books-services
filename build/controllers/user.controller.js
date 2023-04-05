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
exports.getUsers = exports.regiterUser = void 0;
const express_1 = require("express");
const user_services_1 = __importDefault(require("../services/userServices/user.services"));
const serviceUser = new user_services_1.default();
const regiterUser = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, email, country, password } = req.body;
    try {
        const newRegularUser = yield serviceUser.registerRegularUser(name, lastName, email, country, password);
        return res.status(201).json({
            msg: 'regular user creando correctamente',
            payload: {
                user: {
                    name: newRegularUser.userData.name,
                    lastName: newRegularUser.userData.lastName,
                    email: newRegularUser.userData.email,
                    country: newRegularUser.userData.country,
                    status: newRegularUser.userData.status,
                    balance: newRegularUser.userData.balance,
                    cart: newRegularUser.userData.cart,
                    history: newRegularUser.userData.history
                },
                token: newRegularUser.token
            }
        });
    }
    catch (error) {
        return res.status(404).json({ error: error });
    }
});
exports.regiterUser = regiterUser;
const getUsers = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send('hola ok');
});
exports.getUsers = getUsers;
