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
class RegisterRegularUser {
    constructor() {
        this.userBuilder = new UserBuilder_1.default();
        this.userDirector = new UserDirector_1.default(this.userBuilder);
        this.error = '';
        this.code = 200;
    }
    registerRegularUser(name, lastName, email, country, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let valideEmail = yield user_schema_1.UserModel.findOne({ email: email });
                if (valideEmail) {
                    throw {
                        code: this.code = 500,
                        error: this.error = 'Email already exists'
                    };
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
                throw {
                    code: this.code = 500,
                    error: this.error = 'Error en register regular user'
                };
            }
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_schema_1.UserModel.findOne({ email: email });
                if (!user) {
                    throw {
                        code: this.code = 404,
                        error: this.error = 'El email es incorrecto'
                    };
                }
                const validPassDB = (0, bcryptConfig_1.validPassword)(user, password);
                const token = jsonwebtoken_1.default.sign({ token: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
                if (!token) {
                    throw {
                        code: this.code = 405,
                        error: this.error = 'Error en generar token'
                    };
                }
                if (!validPassDB) {
                    throw {
                        code: this.code = 404,
                        error: this.error = 'Incorrect email or password'
                    };
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
                    code: this.code,
                    error: this.error
                };
            }
        });
    }
    updateUserToPlus(tokenQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = jsonwebtoken_1.default.verify(tokenQuery, process.env.JWT_KEY);
                if (!userId.token) {
                    throw {
                        code: this.code = 403,
                        error: this.error = 'Token no valido'
                    };
                }
                const user = yield user_schema_1.UserModel.findById(userId.token);
                if (!user) {
                    throw {
                        code: this.code = 403,
                        error: this.error = 'User no encontrado'
                    };
                }
                if (user.balance < 500) {
                    throw {
                        code: this.code = 403,
                        error: this.error = 'No hay suficiente balance, minimo 500'
                    };
                }
                if (user.typeAccount === 'premium') {
                    throw {
                        code: this.code = 403,
                        error: this.error = 'No puedes pasar de premium a plus'
                    };
                }
                this.userDirector.createPlusUser(user._id, user.name, user.lastName, user.email, user.country, user.password, user.registerDate, user.cart, user.history);
                const userPlus = this.userBuilder.build();
                const userUpdated = yield user_schema_1.UserModel.findByIdAndUpdate(userId.token, userPlus, {
                    new: true
                }).lean();
                if (!userUpdated) {
                    throw {
                        code: this.code = 500,
                        error: this.error = 'Error en actualizar user en db'
                    };
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
                    code: this.code = 500,
                    error: this.error = "Error en services update plus user"
                };
            }
        });
    }
    updateUserToPremium(tokenQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = jsonwebtoken_1.default.verify(tokenQuery, process.env.JWT_KEY);
                if (!userId.token) {
                    throw {
                        code: this.code = 403,
                        error: this.error = 'Token no valido'
                    };
                }
                let user = yield user_schema_1.UserModel.findById(userId.token);
                if (!user) {
                    throw {
                        code: this.code = 403,
                        error: this.error = 'User no encontrado'
                    };
                }
                if (user.balance < 1000) {
                    throw {
                        code: this.code = 403,
                        error: this.error = 'No hay suficiente balance, minimo 1000'
                    };
                }
                this.userDirector.createPremiumUser(user._id, user.name, user.lastName, user.email, user.country, user.password, user.registerDate, user.cart, user.history);
                const premiumUser = this.userBuilder.build();
                const userUpdated = yield user_schema_1.UserModel.findByIdAndUpdate(userId.token, premiumUser, {
                    new: true
                }).lean();
                if (!userUpdated) {
                    throw {
                        code: this.code = 500,
                        error: this.error = 'Error en actualizar user en db'
                    };
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
                    code: this.code = 500,
                    error: this.error = "Error en services update premium user"
                };
            }
        });
    }
}
exports.default = RegisterRegularUser;
