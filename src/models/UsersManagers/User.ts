// Aplicando pattern disign builder es un patron creacional

import { TAccount } from "../../interfaces/Users/IUserBuilder";

export default class User {
    private name:               string;
    private lastName:           string;
    private email:              string;
    private password:           string;
    private country:            string;
    private status:             boolean;
    private typeAccount:        TAccount;
    private balance:            number;
    private discount:           number;
    private freeShipping:       boolean;
    private registerDate:       Date | null;
    private updatedDate:        Date | null;
    private cart:               {}[];
    private history:            {}[];


    constructor(
        name:           string,
        lastName:       string,
        email:          string, 
        password:       string, 
        country:        string,
        status:         boolean,
        typeAccount:    TAccount,
        balance:        number,
        discount:       number,
        freeShipping:   boolean,
        registerDate:   Date | null,
        updatedDate:    Date | null,
        cart:           {}[],
        history:        {}[]
        ){
        this.name =          name
        this.lastName =      lastName
        this.email =         email
        this.password =      password
        this.country =       country
        this.status =        status
        this.typeAccount =   typeAccount
        this.balance =       balance
        this.discount =      discount
        this.freeShipping =  freeShipping
        this.registerDate =  registerDate
        this.updatedDate =   updatedDate
        this.cart =          cart
        this.history =       history
    }

    getEmail(){
        return this.email
    }

}

