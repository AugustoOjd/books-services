"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const userSchema = new Schema({
    name: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    country: { type: String, require: true },
    status: { type: Boolean, require: true },
    typeAccount: { type: String, require: true, default: 'regular' },
    balance: { type: Number, require: true },
    registerDate: { type: Date },
    cart: { type: [] },
    history: { type: [] },
});
exports.UserModel = model('User', userSchema);
