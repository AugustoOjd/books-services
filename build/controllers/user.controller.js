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
exports.updatePlus = exports.regiterUser = exports.getUsers = void 0;
const express_1 = require("express");
const user_services_1 = __importDefault(require("../services/userServices/user.services"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const serviceUser = new user_services_1.default();
const getUsers = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        msg: 'show list user',
        payload: 'users'
    });
});
exports.getUsers = getUsers;
const regiterUser = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, email, country, password } = req.body;
    try {
        const newRegularUser = yield serviceUser.registerRegularUser(name, lastName, email, country, password);
        return res.status(201).json({
            msg: 'regular user creando correctamente',
            payload: {
                user: {
                    id: newRegularUser.userData._id,
                    name: newRegularUser.userData.name,
                    lastName: newRegularUser.userData.lastName,
                    email: newRegularUser.userData.email,
                    country: newRegularUser.userData.country,
                    status: newRegularUser.userData.status,
                    balance: newRegularUser.userData.balance,
                    typeAccount: newRegularUser.userData.typeAccount,
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
const updatePlus = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    // headers funciona
    // const { token } = req.headers
    // console.log(token)
    // const id = jwt.verify(token as string, process.env.JWT_KEY!)
    const { token } = req.cookies;
    const id = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
    try {
        return res.status(201).json({
            msg: 'cookie validada correctamente',
            payload: {
                // user: {
                // id: newRegularUser.userData._id,
                // name: newRegularUser.userData.name,
                // lastName: newRegularUser.userData.lastName,
                // email: newRegularUser.userData.email,
                // country: newRegularUser.userData.country,
                // status: newRegularUser.userData.status,
                // balance: newRegularUser.userData.balance,
                // typeAccount: newRegularUser.userData.typeAccount,
                // cart: newRegularUser.userData.cart,
                // history: newRegularUser.userData.history
                // },
                // token: newRegularUser.token
                token: id
            }
        });
    }
    catch (error) {
        return res.status(404).json({ error: 'error por editar' });
    }
});
exports.updatePlus = updatePlus;
