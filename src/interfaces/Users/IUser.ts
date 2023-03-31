export interface IRegularUser{
    name:               string;
    lastName:           string;
    email:              string;
    password:           string;
    country:            string;
    status:             boolean;
    registerDate:       Date
    cart:               {}[]

    // verifyLogin():      boolean
}