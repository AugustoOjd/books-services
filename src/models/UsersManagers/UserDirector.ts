import { IUserBuilder, TAccount } from "../../interfaces/Users/IUserBuilder";

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
        status: boolean, 
        balance: number,     
        ){
            this.userBuilder    .setName(name)
                                .setLastName(lastName)
                                .setEmail(email)
                                .setCountry(country)
                                .setPassword(password)
                                .setStatus(status)
                                .setTypeAccount('regular')
                                .setBalance(balance)
                                .setRegisterDate(new Date())
    }

}

// const director = new UserDirector(userBuilder)

// director.createRegularUser('ramon', 'gomez', 'ramon@gmail.com', '1234', true, 2000)

// const newUser = userBuilder.build()
// console.log(newUser)