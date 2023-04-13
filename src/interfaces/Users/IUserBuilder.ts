import User from "../../models/UsersManagers/User";

export type TAccount =  'regular' | 'plus' | 'premium'

export interface IUserBuilder {
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


    setId(id: string): IUserBuilder
    setName(name: string): IUserBuilder
    setLastName(lastName: string): IUserBuilder
    setEmail(email: string): IUserBuilder
    setPassword(password: string): IUserBuilder
    setCountry(country: string):     IUserBuilder
    setStatus(status: boolean):      IUserBuilder
    setTypeAccount(typeAccount: TAccount): IUserBuilder
    setBalance(balance: number):     IUserBuilder
    setDiscount(discount: number):IUserBuilder
    setFreeShipping(freeShipping: boolean): IUserBuilder
    setRegisterDate(registerData: Date):IUserBuilder
    setUpdatedDate(updatedDate: Date | null):IUserBuilder
    setCart(cart: []): IUserBuilder
    setHistory(history: []): IUserBuilder
    

    addCart(item: {}):        IUserBuilder
    addHistory(item: {}):     IUserBuilder

    build(): User
}