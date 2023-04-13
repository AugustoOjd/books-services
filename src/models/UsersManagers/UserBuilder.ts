import { IUserBuilder, TAccount } from "../../interfaces/Users/IUserBuilder";
import { hashPassword } from "../../utils/bcryptConfig";
import User from "./User";

export default class UserBuilder implements IUserBuilder{
    id?:                string;
    name:               string;
    lastName:           string;
    email:              string;
    password:           string;
    country:            string;
    status:             boolean;
    typeAccount:        TAccount;
    balance:            number;
    discount:           number;
    freeShipping:       boolean;    
    registerDate:       Date | null;
    updatedDate:        Date | null;
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
        this.discount       = 0,
        this.freeShipping   = false,
        this.registerDate   = null,
        this.updatedDate    = null;
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

    setId(id: string): IUserBuilder {
        this.id = id
        return this
    }

    setName(name: string): IUserBuilder {
        this.name = name.toLocaleLowerCase()
        return this
    }

    setLastName(lastName: string): IUserBuilder {
        this.lastName = lastName.toLocaleLowerCase()
        return this
    }

    setEmail(email: string): IUserBuilder {
        this.email = email.toLocaleLowerCase()
        return this
    }

    setPassword(password: string): IUserBuilder {
        this.password = hashPassword(password) 
        return this
    }

    setCountry(country: string): IUserBuilder {
        this.country = country.toLocaleLowerCase()
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

    setDiscount(discount: number): IUserBuilder {
        this.discount = discount
        return this
    }

    setFreeShipping(freeShipping: boolean): IUserBuilder {
        this.freeShipping = freeShipping
        return this
    }

    setRegisterDate(registerDate: Date): IUserBuilder {
        this.registerDate = registerDate
        return this
    }

    setUpdatedDate(updatedDate: Date | null): IUserBuilder {
        this.updatedDate = updatedDate
        return this
    }

    setCart(cart: []): IUserBuilder{
        this.cart = cart
        return this
    }
    
    setHistory(history: []): IUserBuilder {
        this.history = history
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
            this.discount,
            this.freeShipping,  
            this.registerDate,
            this.updatedDate,
            this.cart,        
            this.history,     
        )

        this.reset()

        return user
    }
}

// export const userBuilder = new UserBuilder()

// const jose = userBuilder .setName('jose')
//                                 .setLastName('jose@gmail.com')
//                                 .build()

//                                 console.log(jose)