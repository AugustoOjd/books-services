"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RegularUserBuilder_1 = require("./RegularUserBuilder");
class UserDirector {
    constructor(userBuilder) {
        this.userBuilder = userBuilder;
    }
    setUserBuilder(userBuilder) {
        this.userBuilder = userBuilder;
    }
    createRegularUser(name, lastName, email, password, status, balance) {
        this.userBuilder.setName(name)
            .setLastName(lastName)
            .setEmail(email)
            .setPassword(password)
            .setStatus(status)
            .setTypeAccount('regular')
            .setBalance(balance)
            .setRegisterDate(new Date());
    }
}
exports.default = UserDirector;
const director = new UserDirector(RegularUserBuilder_1.userBuilder);
director.createRegularUser('ramon', 'gomez', 'ramon@gmail.com', '1234', true, 2000);
const newUser = RegularUserBuilder_1.userBuilder.build();
console.log(newUser);
