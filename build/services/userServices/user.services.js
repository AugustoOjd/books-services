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
const user_schema_1 = require("../../db/schemas/user.schema");
const UserBuilder_1 = __importDefault(require("../../models/UsersManagers/UserBuilder"));
const UserDirector_1 = __importDefault(require("../../models/UsersManagers/UserDirector"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class RegisterRegularUser {
    constructor() {
        this.userBuilder = new UserBuilder_1.default();
        this.userDirector = new UserDirector_1.default(this.userBuilder);
        this.error = '';
        this.code = 200;
    }
    registerRegularUser(name, lastName, email, country, password, status = true, balance = 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userDirector.createRegularUser(name, lastName, email, country, password, status, balance);
                let valideEmail = yield user_schema_1.UserModel.findOne({ email: email });
                if (valideEmail) {
                    throw {
                        code: this.code = 500,
                        error: this.error = 'Email already exists'
                    };
                }
                const user = this.userBuilder.build();
                const data = yield user_schema_1.UserModel.create(user);
                // Math.floor(Date.now() / 1000) - 30
                // 60*60*7
                const token = jsonwebtoken_1.default.sign({ token: data._id, iat: 60 * 60 * 7 }, process.env.JWT_KEY);
                return {
                    userData: data,
                    token
                };
            }
            catch (error) {
                throw {
                    code: this.code,
                    error: this.error
                };
            }
        });
    }
}
exports.default = RegisterRegularUser;
