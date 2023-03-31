"use strict";
// Aplicando pattern disign builder es un patron creacional
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, lastName, email, password, country, status, typeAccount, balance, registerDate, cart, history) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.country = country;
        this.status = status;
        this.typeAccount = typeAccount;
        this.balance = balance;
        this.registerDate = registerDate;
        this.cart = cart;
        this.history = history;
    }
    getEmail() {
        return this.email;
    }
}
exports.default = User;
