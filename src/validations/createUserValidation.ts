import { object, string, number, date} from 'yup';

export type Data = {
    name:       string; 
    lastName:   string; 
    email:      string; 
    country:    string; 
    password:   string; 
}

// export const createUserValidation2 = (data: Data)=>{

//     const {name, lastName, email, country, password} = data

//     // ==== name
//     if(typeof name !== 'string'){
//         throw new Error('name must be a string')
//     }

//     if(name.length <= 4){
//         throw new Error('name must be most to 4 characters')
//     }

//     if(name.length > 10){
//         throw new Error('name must be least 10 characters')
//     }

//     if(!(/^[a-zA-Z ]+$/.test(name))){
//         throw new Error('name must contain only a-z characters')
//     }

//     // ==== lastName

//     if(typeof lastName !== 'string'){
//         throw new Error('lastName must be a string')
//     }

//     if(lastName.length <= 4){
//         throw new Error('lastName must be most 4 characters')
//     }

//     if(lastName.length > 10){
//         throw new Error('lastName must be least 10 characters')
//     }

//     if(!(/^[a-zA-Z ]+$/.test(lastName))){
//         throw new Error('lastName must contain only a-z characters')
//     }

//     // ==== email

//     if(typeof email !== 'string'){
//         throw new Error('email must be a string')
//     }

//     if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
//         throw new Error('invalid email')
//     }


//     // ==== country

//     if(typeof country !== 'string'){
//         throw new Error('country must be a string')
//     }

//     if(country.length >= 20){
//         throw new Error('country must be least 20 characters')
//     }

//     if(!(/^[a-zA-Z ]+$/.test(country))){
//         throw new Error('country must contain only a-z characters')
//     }


//     // ===

//     if(typeof password !== 'string'){
//         throw new Error('password must be a string')
//     }

//     if(password.length < 6){
//         throw new Error('password must be 6 characters or more')
//     }

//     if(password.length >= 20){
//         throw new Error('password must be least to 20 characters')
//     }
// }

// export const createUserValidation = (data: Data)=>{

    // const {name, lastName, email, country, password} = data

export const userValidateSchema = object({
    name: string().required().min(3).max(15).matches(/^[a-zA-Z ]+$/),
    lastName: string().required().min(4).max(15).matches(/^[a-zA-Z ]+$/),
    country: string().required().min(3).max(15).matches(/^[a-zA-Z ]+$/),
    email: string().email().required(),
    password: string().required().min(6).max(20),
})



