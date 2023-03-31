"use strict";
// Aplicando pattern disign builder es un patron creacional 
Object.defineProperty(exports, "__esModule", { value: true });
class UserManage {
    constructor(email, password, status, registerDate) {
        this.email = email;
        this.password = password;
        this.status = status;
        this.registerDate = registerDate;
    }
}
exports.default = UserManage;
