import { IUserBuilder, TAccount } from "../../interfaces/Users/IUserBuilder";
import { hashPassword } from "../../utils/bcryptConfig";

export default class UserDirector {

    private userBuilder: IUserBuilder

    constructor(userBuilder: IUserBuilder){
        this.userBuilder = userBuilder
    }

    setUserBuilder(userBuilder: IUserBuilder){
        this.userBuilder = userBuilder
    }

    createRegularUser(
        name: string, 
        lastName: string, 
        email: string,
        country: string, 
        password: string, 
        ){
            this.userBuilder    .setName(name)
                                .setLastName(lastName)
                                .setEmail(email)
                                .setCountry(country)
                                .setPassword(hashPassword(password) )
                                .setStatus(true)
                                .setTypeAccount('regular')
                                .setBalance(1000)
                                .setDiscount(0)
                                .setFreeShipping(false)
                                .setRegisterDate(new Date())
                                .setUpdatedDate(new Date())
    }

    createPlusUser(
        id: string,
        name: string, 
        lastName: string, 
        email: string,
        country: string, 
        password: string, 
        registerDate: Date,
        cart: [],
        history: []
    ){
        this.userBuilder        
                                .setId(id)
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
                                .setHistory(history)
    }

    createPremiumUser(
        id: string,
        name: string, 
        lastName: string, 
        email: string,
        country: string, 
        password: string, 
        registerDate: Date,
        cart: [],
        history: []
    ){
        this.userBuilder        .setId(id)
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
                                .setHistory(history)
    }

}

// const director = new UserDirector(userBuilder)

// director.createRegularUser('ramon', 'gomez', 'ramon@gmail.com', '1234', true, 2000)

// const newUser = userBuilder.build()
// console.log(newUser)