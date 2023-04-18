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
exports.logoutUser = exports.updatePremium = exports.updatePlus = exports.loginUser = exports.regiterUser = exports.getUsers = void 0;
const express_1 = require("express");
const user_services_1 = __importDefault(require("../services/userServices/user.services"));
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
                    name: newRegularUser.userData.name,
                    lastName: newRegularUser.userData.lastName,
                    email: newRegularUser.userData.email,
                    country: newRegularUser.userData.country,
                    status: newRegularUser.userData.status,
                    balance: newRegularUser.userData.balance,
                    discount: newRegularUser.userData.discount,
                    freeShipping: newRegularUser.userData.freeShipping,
                    typeAccount: newRegularUser.userData.typeAccount,
                    cart: newRegularUser.userData.cart,
                    history: newRegularUser.userData.history
                },
                token: newRegularUser.token
            }
        });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.regiterUser = regiterUser;
const loginUser = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // AGREGAR A UN MIDDLEWARE PORQUE ES INFORMACION EXTERNA
        if (!email || !password) {
            return res.status(404).json({ msg: 'Debe recibir email y password' });
        }
        const LoginData = yield serviceUser.loginUser(email, password);
        return res.status(200).json({
            msg: 'Login Succcess',
            payload: {
                user: {
                    name: LoginData.userData.name,
                    lastName: LoginData.userData.lastName,
                    email: LoginData.userData.email,
                    country: LoginData.userData.country,
                    status: LoginData.userData.status,
                    balance: LoginData.userData.balance,
                    discount: LoginData.userData.discount,
                    freeShipping: LoginData.userData.freeShipping,
                    typeAccount: LoginData.userData.typeAccount,
                    cart: LoginData.userData.cart,
                    history: LoginData.userData.history
                },
                token: LoginData.token
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json(error);
    }
});
exports.loginUser = loginUser;
const updatePlus = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    try {
        const updatedUserPlus = yield serviceUser.updateUserToPlus(token);
        return res.status(201).json({
            msg: 'user actualizado a plus correctamente',
            payload: {
                user: {
                    name: updatedUserPlus.userData.name,
                    lastName: updatedUserPlus.userData.lastName,
                    email: updatedUserPlus.userData.email,
                    country: updatedUserPlus.userData.country,
                    status: updatedUserPlus.userData.status,
                    balance: updatedUserPlus.userData.balance,
                    discount: updatedUserPlus.userData.discount,
                    freeshipping: updatedUserPlus.userData.freeShipping,
                    typeAccount: updatedUserPlus.userData.typeAccount,
                    cart: updatedUserPlus.userData.cart,
                    history: updatedUserPlus.userData.history
                },
                token: updatedUserPlus.tokenQuery
            }
        });
    }
    catch (error) {
        return res.status(404).json({ error: error });
    }
});
exports.updatePlus = updatePlus;
const updatePremium = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    try {
        // agregar en un middleware
        // if(!token){
        //     throw {error: 'token no encontrado'}
        // }
        const updatedPremium = yield serviceUser.updateUserToPremium(token);
        return res.status(201).json({
            msg: 'user actualizado a Premium correctamente',
            payload: {
                user: {
                    name: updatedPremium.userData.name,
                    lastName: updatedPremium.userData.lastName,
                    email: updatedPremium.userData.email,
                    country: updatedPremium.userData.country,
                    status: updatedPremium.userData.status,
                    balance: updatedPremium.userData.balance,
                    discount: updatedPremium.userData.discount,
                    freeShipping: updatedPremium.userData.freeShipping,
                    typeAccount: updatedPremium.userData.typeAccount,
                    cart: updatedPremium.userData.cart,
                    history: updatedPremium.userData.history
                },
                token: updatedPremium.tokenQuery
            }
        });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.updatePremium = updatePremium;
const logoutUser = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.clearCookie('token').json({
            msg: 'Logout Success',
            token: null
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.logoutUser = logoutUser;
