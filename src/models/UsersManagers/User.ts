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
    private registerDate:       Date | null;
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
        registerDate:   Date | null,
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
        this.registerDate =  registerDate
        this.cart =          cart
        this.history =       history
    }

    getEmail(){
        return this.email
    }

}

