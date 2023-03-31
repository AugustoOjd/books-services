"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptConfig_1 = require("../../utils/bcryptConfig");
const User_1 = __importDefault(require("./User"));
class UserBuilder {
    constructor() {
        this.name = "",
            this.lastName = "",
            this.email = "",
            this.password = "",
            this.country = "",
            this.status = false,
            this.typeAccount = 'regular',
            this.balance = 0,
            this.registerDate = null,
            this.cart = [],
            this.history = [];
    }
    reset() {
        this.name = "",
            this.lastName = "",
            this.email = "",
            this.password = "",
            this.country = "",
            this.status = false,
            this.typeAccount = 'regular',
            this.balance = 0,
            this.registerDate = null,
            this.cart = [],
            this.history = [];
    }
    setName(name) {
        this.name = name.toLocaleLowerCase();
        return this;
    }
    setLastName(lastName) {
        this.lastName = lastName.toLocaleLowerCase();
        return this;
    }
    setEmail(email) {
        this.email = email.toLocaleLowerCase();
        return this;
    }
    setPassword(password) {
        this.password = (0, bcryptConfig_1.hashPassword)(password);
        return this;
    }
    setCountry(country) {
        this.country = country.toLocaleLowerCase();
        return this;
    }
    setStatus(status) {
        this.status = status;
        return this;
    }
    setTypeAccount(typeAccount) {
        this.typeAccount = typeAccount;
        return this;
    }
    setBalance(balance) {
        this.balance = balance;
        return this;
    }
    setRegisterDate(registerDate) {
        this.registerDate = registerDate;
        return this;
    }
    addCart(item) {
        this.cart.push(item);
        return this;
    }
    addHistory(item) {
        this.history.push(item);
        return this;
    }
    build() {
        const user = new User_1.default(this.name, this.lastName, this.email, this.password, this.country, this.status, this.typeAccount, this.balance, this.registerDate, this.cart, this.history);
        this.reset();
        return user;
    }
}
exports.default = UserBuilder;
// export const userBuilder = new UserBuilder()
// const jose = userBuilder .setName('jose')
//                                 .setLastName('jose@gmail.com')
//                                 .build()
//                                 console.log(jose)
