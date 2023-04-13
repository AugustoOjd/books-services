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
exports.updatePlus = exports.loginUser = exports.regiterUser = exports.getUsers = void 0;
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
const loginUser = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(404).json({ msg: 'Debe recibir email y password' });
        }
        const LoginData = yield serviceUser.loginUser(email, password);
        return res.status(200).json({
            msg: 'Login Succcess',
            payload: {
                user: {
                    name: LoginData === null || LoginData === void 0 ? void 0 : LoginData.userData.name,
                    lastName: LoginData === null || LoginData === void 0 ? void 0 : LoginData.userData.lastName,
                    email: LoginData === null || LoginData === void 0 ? void 0 : LoginData.userData.email,
                    country: LoginData === null || LoginData === void 0 ? void 0 : LoginData.userData.country,
                    status: LoginData === null || LoginData === void 0 ? void 0 : LoginData.userData.status,
                    balance: LoginData === null || LoginData === void 0 ? void 0 : LoginData.userData.balance,
                    typeAccount: LoginData === null || LoginData === void 0 ? void 0 : LoginData.userData.typeAccount,
                    cart: LoginData === null || LoginData === void 0 ? void 0 : LoginData.userData.cart,
                    history: LoginData === null || LoginData === void 0 ? void 0 : LoginData.userData.history
                },
                token: LoginData === null || LoginData === void 0 ? void 0 : LoginData.token
            }
        });
    }
    catch (error) {
        return res.status(404).json({ error: error });
    }
});
exports.loginUser = loginUser;
const updatePlus = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    // headers funciona
    // const { token } = req.headers
    // console.log(token)
    // const id = jwt.verify(token as string, process.env.JWT_KEY!)
    // const {token} = req.cookies
    // const id:any = jwt.verify(token, process.env.JWT_KEY!)
    // // const idtoken = jwt.verify(token, 'shhhhh', function(err, decoded) {
    // //     console.log(decoded.foo) // bar
    // //   });
    // // let datos ={
    // //     id: id.token
    // // }
    // const data = await UserModel.findById(id.token)
    // console.log(data)
    // try {
    //     return res.status(201).json({
    //         msg: 'cookie validada correctamente',
    //         payload: {
    //             // user: {
    //             // id: newRegularUser.userData._id,
    //             // name: newRegularUser.userData.name,
    //             // lastName: newRegularUser.userData.lastName,
    //             // email: newRegularUser.userData.email,
    //             // country: newRegularUser.userData.country,
    //             // status: newRegularUser.userData.status,
    //             // balance: newRegularUser.userData.balance,
    //             // typeAccount: newRegularUser.userData.typeAccount,
    //             // cart: newRegularUser.userData.cart,
    //             // history: newRegularUser.userData.history
    //             // },
    //             // token: newRegularUser.token
    //             token: id.token
    //         }
    //     })
    // } catch (error) {
    //     return res.status(404).json({error: 'error por editar'})
    // }
    const { token } = req.cookies;
    try {
        const updatedUserPlus = yield serviceUser.updateUserToPlus(token);
        if (!token) {
            throw { error: 'token no encontrado' };
        }
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
