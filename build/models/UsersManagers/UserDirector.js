"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDirector {
    constructor(userBuilder) {
        this.userBuilder = userBuilder;
    }
    setUserBuilder(userBuilder) {
        this.userBuilder = userBuilder;
    }
    createRegularUser(name, lastName, email, country, password) {
        this.userBuilder.setName(name)
            .setLastName(lastName)
            .setEmail(email)
            .setCountry(country)
            .setPassword(password)
            .setStatus(true)
            .setTypeAccount('regular')
            .setBalance(1000)
            .setDiscount(0)
            .setFreeShipping(false)
            .setRegisterDate(new Date())
            .setUpdatedDate(new Date());
    }
    createPlusUser(id, name, lastName, email, country, password, registerDate, cart, history) {
        this.userBuilder.setId(id)
            .setName(name)
            .setLastName(lastName)
            .setEmail(email)
            .setCountry(country)
            .setPassword(password)
            .setStatus(true)
            .setTypeAccount('plus')
            .setBalance(1500)
            .setDiscount(0.25)
            .setFreeShipping(false)
            .setRegisterDate(registerDate)
            .setUpdatedDate(new Date())
            .setCart(cart)
            .setHistory(history);
    }
    createPremiumUser(id, name, lastName, email, country, password, registerDate, cart, history) {
        this.userBuilder.setId(id)
            .setName(name)
            .setLastName(lastName)
            .setEmail(email)
            .setCountry(country)
            .setPassword(password)
            .setStatus(true)
            .setTypeAccount('premium')
            .setBalance(2500)
            .setDiscount(0.5)
            .setFreeShipping(true)
            .setRegisterDate(registerDate)
            .setUpdatedDate(new Date())
            .setCart(cart)
            .setHistory(history);
    }
}
exports.default = UserDirector;
// const director = new UserDirector(userBuilder)
// director.createRegularUser('ramon', 'gomez', 'ramon@gmail.com', '1234', true, 2000)
// const newUser = userBuilder.build()
// console.log(newUser)
