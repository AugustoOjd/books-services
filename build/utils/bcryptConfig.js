"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validPassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = (password) => {
    return bcryptjs_1.default.hashSync(password);
};
exports.hashPassword = hashPassword;
const validPassword = (user, password) => {
    return bcryptjs_1.default.compareSync(password, user.password);
};
exports.validPassword = validPassword;
