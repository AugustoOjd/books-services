import { TAccount } from "./IUserBuilder";


export interface IUser{
    _id?:                string;
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
    // verifyLogin():      boolean
}