import bcrypt from 'bcryptjs'
import { IUser } from '../interfaces/Users/IUser'


export const hashPassword =(password: string)=>{

    return bcrypt.hashSync(password)
}

export const validPassword = (user: IUser, password: string) =>{
    return bcrypt.compareSync( password, user.password)
}