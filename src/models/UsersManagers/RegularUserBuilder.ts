import { IUserBuilder, TAccount } from "../../interfaces/Users/IUserBuilder";
import User from "./User";

export default class UserBuilder implements IUserBuilder{
    name:               string;
    lastName:           string;
    email:              string;
    password:           string;
    country:            string;
    status:             boolean;
    typeAccount:        TAccount;
    balance:            number;
    registerDate:       Date | null;
    cart:               {}[];
    history:            {}[];

    constructor(){
        this.name           = "",        
        this.lastName       = "",    
        this.email          = "",       
        this.password       = "",    
        this.country        = "",     
        this.status         = false,      
        this.typeAccount    = 'regular', 
        this.balance        = 0,     
        this.registerDate   = null,
        this.cart           = [],        
        this.history        = []
    }

    reset():void{
        this.name         =   "",        
        this.lastName     =   "",    
        this.email        =   "",       
        this.password     =   "",    
        this.country      =   "",     
        this.status       =   false,      
        this.typeAccount  =   'regular', 
        this.balance      =   0,     
        this.registerDate =   null,
        this.cart         =   [],        
        this.history      =   []
    }

    setName(name: string): IUserBuilder {
        this.name = name
        return this
    }

    setLastName(lastName: string): IUserBuilder {
        this.lastName = lastName
        return this
    }

    setEmail(email: string): IUserBuilder {
        this.email = email
        return this
    }

    setPassword(password: string): IUserBuilder {
        this.password = password
        return this
    }

    setCountry(country: string): IUserBuilder {
        this.country = country
        return this
    }

    setStatus(status: boolean): IUserBuilder {
        this.status = status
        return this
    }

    setTypeAccount(typeAccount: TAccount): IUserBuilder {
        this.typeAccount = typeAccount
        return this
    }

    setBalance(balance: number): IUserBuilder {
        this.balance = balance
        return this
    }

    setRegisterDate(registerDate: Date): IUserBuilder {
        this.registerDate = registerDate 
        return this
    }

    addCart(item: {}): IUserBuilder {
        this.cart.push(item)
        return this
    }

    addHistory(item: {}): IUserBuilder {
        this.history.push(item)
        return this
    }

    build(): User {
        const user = new User(
            this.name,        
            this.lastName,
            this.email,       
            this.password,    
            this.country,     
            this.status,      
            this.typeAccount, 
            this.balance,     
            this.registerDate,
            this.cart,        
            this.history,     
        )

        this.reset()

        return user
    }
}

export const userBuilder = new UserBuilder()

const jose = userBuilder .setName('jose')
                                .setLastName('jose@gmail.com')
                                .build()

                                console.log(jose)