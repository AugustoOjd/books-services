import { TAccount } from "./IUserBuilder";


export interface IUser{
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
    // verifyLogin():      boolean
}