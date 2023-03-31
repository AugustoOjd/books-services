"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDirector {
    constructor(userBuilder) {
        this.userBuilder = userBuilder;
    }
    setUserBuilder(userBuilder) {
        this.userBuilder = userBuilder;
    }
    createRegularUser(name, lastName, email, country, password, status, balance) {
        this.userBuilder.setName(name)
            .setLastName(lastName)
            .setEmail(email)
            .setCountry(country)
            .setPassword(password)
            .setStatus(status)
            .setTypeAccount('regular')
            .setBalance(balance)
            .setRegisterDate(new Date());
    }
}
exports.default = UserDirector;
// const director = new UserDirector(userBuilder)
// director.createRegularUser('ramon', 'gomez', 'ramon@gmail.com', '1234', true, 2000)
// const newUser = userBuilder.build()
// console.log(newUser)
