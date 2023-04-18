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
const bcryptConfig_1 = require("../../utils/bcryptConfig");
class UserServices {
    constructor() {
        this.userBuilder = new UserBuilder_1.default();
        this.userDirector = new UserDirector_1.default(this.userBuilder);
        this.error = '';
        this.code = 200;
        this.errorController;
    }
    errorController(message, code) {
        this.error = message;
        this.code = code;
    }
    registerRegularUser(name, lastName, email, country, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let valideEmail = yield user_schema_1.UserModel.findOne({ email: email });
                if (valideEmail) {
                    throw this.errorController('Email already exits', 404);
                }
                this.userDirector.createRegularUser(name, lastName, email, country, password);
                const user = this.userBuilder.build();
                const data = yield user_schema_1.UserModel.create(user);
                const token = jsonwebtoken_1.default.sign({ token: data._id }, process.env.JWT_KEY, { expiresIn: '1h' });
                return {
                    userData: data,
                    token
                };
            }
            catch (error) {
                throw this.errorController('Error register regular user', 500);
            }
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email || !password) {
                    throw this.errorController('Email and password are require', 404);
                }
                const user = yield user_schema_1.UserModel.findOne({ email: email });
                if (!user) {
                    throw this.errorController('Invalid email', 404);
                }
                const token = jsonwebtoken_1.default.sign({ token: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
                if (!token) {
                    throw this.errorController('Generate token error', 405);
                }
                const validPassDB = (0, bcryptConfig_1.validPassword)(user, password);
                if (!validPassDB) {
                    throw this.errorController('Incorrect email or password', 404);
                }
                return {
                    userData: {
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        country: user.lastName,
                        status: user.status,
                        typeAccount: user.typeAccount,
                        balance: user.balance,
                        discount: user.discount,
                        freeShipping: user.freeShipping,
                        cart: user.cart,
                        history: user.history
                    },
                    token
                };
            }
            catch (error) {
                throw {
                    error: this.error,
                    code: this.code
                };
            }
        });
    }
    updateUserToPlus(tokenQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = jsonwebtoken_1.default.verify(tokenQuery, process.env.JWT_KEY);
                if (!userId.token) {
                    throw this.errorController('Invalid token', 403);
                }
                const user = yield user_schema_1.UserModel.findById(userId.token);
                if (!user) {
                    throw this.errorController('Invalid user', 404);
                }
                if (user.balance < 500) {
                    throw this.errorController('Balance at least 500', 403);
                }
                if (user.typeAccount === 'premium') {
                    throw this.errorController('account premium already', 404);
                }
                // $2a$10$4GPgajB8PbSlWbAbAa7gYO0uu.MfCEBv6Ac7S7U72jbSZ.zTqIOgi
                this.userDirector.createPlusUser(user._id, user.name, user.lastName, user.email, user.country, user.password, user.registerDate, user.cart, user.history);
                const userPlus = this.userBuilder.build();
                const userUpdated = yield user_schema_1.UserModel.findByIdAndUpdate(userId.token, userPlus, {
                    new: true
                }).lean();
                if (!userUpdated) {
                    throw this.errorController('Error in update user to plus', 500);
                }
                return {
                    userData: {
                        name: userUpdated.name,
                        lastName: userUpdated.lastName,
                        email: userUpdated.email,
                        country: userUpdated.lastName,
                        status: userUpdated.status,
                        typeAccount: userUpdated.typeAccount,
                        balance: userUpdated.balance,
                        discount: userUpdated.discount,
                        freeShipping: userUpdated.freeShipping,
                        cart: userUpdated.cart,
                        history: userUpdated.history
                    },
                    tokenQuery
                };
            }
            catch (error) {
                throw {
                    error: this.error,
                    code: this.code
                };
            }
        });
    }
    updateUserToPremium(tokenQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = jsonwebtoken_1.default.verify(tokenQuery, process.env.JWT_KEY);
                if (!userId.token) {
                    throw this.errorController('Invalid Token', 403);
                }
                let user = yield user_schema_1.UserModel.findById(userId.token);
                if (!user) {
                    throw this.errorController('Invalid User', 403);
                }
                if (user.balance < 1000) {
                    throw this.errorController('Balance must be at least 1000', 403);
                }
                this.userDirector.createPremiumUser(user._id, user.name, user.lastName, user.email, user.country, user.password, user.registerDate, user.cart, user.history);
                const premiumUser = this.userBuilder.build();
                const userUpdated = yield user_schema_1.UserModel.findByIdAndUpdate(userId.token, premiumUser, {
                    new: true
                }).lean();
                if (!userUpdated) {
                    throw this.errorController('Error in update user to premium', 500);
                }
                return {
                    userData: {
                        name: userUpdated.name,
                        lastName: userUpdated.lastName,
                        email: userUpdated.email,
                        country: userUpdated.lastName,
                        status: userUpdated.status,
                        typeAccount: userUpdated.typeAccount,
                        balance: userUpdated.balance,
                        discount: userUpdated.discount,
                        freeShipping: userUpdated.freeShipping,
                        cart: userUpdated.cart,
                        history: userUpdated.history
                    },
                    tokenQuery
                };
            }
            catch (error) {
                throw {
                    error: this.error,
                    code: this.code
                };
            }
        });
    }
}
exports.default = UserServices;
