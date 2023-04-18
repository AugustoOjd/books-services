"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
            this.discount = 0,
            this.freeShipping = false,
            this.registerDate = null,
            this.updatedDate = null;
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
            this.discount = 0,
            this.freeShipping = false,
            this.registerDate = null,
            this.updatedDate = null;
        this.registerDate = null,
            this.cart = [],
            this.history = [];
    }
    setId(id) {
        this.id = id;
        return this;
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
        this.password = password;
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
    setDiscount(discount) {
        this.discount = discount;
        return this;
    }
    setFreeShipping(freeShipping) {
        this.freeShipping = freeShipping;
        return this;
    }
    setRegisterDate(registerDate) {
        this.registerDate = registerDate;
        return this;
    }
    setUpdatedDate(updatedDate) {
        this.updatedDate = updatedDate;
        return this;
    }
    setCart(cart) {
        this.cart = cart;
        return this;
    }
    setHistory(history) {
        this.history = history;
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
        const user = new User_1.default(this.name, this.lastName, this.email, this.password, this.country, this.status, this.typeAccount, this.balance, this.discount, this.freeShipping, this.registerDate, this.updatedDate, this.cart, this.history);
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
