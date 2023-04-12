import { UserModel } from "../../db/schemas/user.schema"
import UserBuilder from "../../models/UsersManagers/UserBuilder"
import UserDirector from "../../models/UsersManagers/UserDirector"
import jwt from 'jsonwebtoken'
import { validPassword } from "../../utils/bcryptConfig"
import { IUser } from "../../interfaces/Users/IUser"

type ResponseLoginUser = {
    _id             : string
    name            : string
    lastName        : string
    email           : string
    country         : string
    status          : boolean
    typeAccount     : string
    balance         : number
    cart            : []
    history         : []
}


export default class RegisterRegularUser {

    private userBuilder 
    private userDirector
    error: string
    code: number

    constructor(){
        this.userBuilder = new UserBuilder()
        this.userDirector = new UserDirector(this.userBuilder)
        this.error = ''
        this.code = 200
    }

    public async registerRegularUser(name: string, lastName: string, email: string, country: string, password: string, status: boolean = true, balance: number = 1000){
        try {
            this.userDirector.createRegularUser(name, lastName, email, country, password, status, balance)
            
            let valideEmail = await UserModel.findOne({email: email})
            
            if(valideEmail){
                throw {
                    code: this.code = 500,
                    error: this.error = 'Email already exists'
                };
                
            }
            
            
            const user = this.userBuilder.build()
            const data = await UserModel.create(user)
            
            // Math.floor(Date.now() / 1000) - 30
            // 60*60*7
            const token = jwt.sign({token: data._id, iat: 60*60*7 }, process.env.JWT_KEY!)

            return {
                userData: data,
                token
            }

        } catch (error) {
            throw {
                code: this.code,
                error: this.error
            };
        }
    }

    public async loginUser(email: string, password: string){
        try {

            const user: ResponseLoginUser | null = await UserModel.findOne({email: email})

            if(!user){
                throw {
                    code: this.code = 404,
                    error: this.error = 'El email es incorrecto'
                };
            }

            const validPassDB = validPassword(user, password)
            const token = jwt.sign({token: user._id, iat: 60*60*7 }, process.env.JWT_KEY!)

            if(!validPassDB){
                throw {
                    code: this.code = 404,
                    error: this.error = 'Incorrect email or password'
                };
            }

            return {
                userData:{
                    name            : user.name,
                    lastName        : user.lastName,
                    email           : user.email,   
                    country         : user.lastName,
                    status          : user.status,
                    typeAccount     : user.typeAccount,
                    balance         : user.balance,   
                    cart            : user.cart,   
                    history         : user.history
                },
                token
            }


        } catch (error) {
            throw {
                code: this.code,
                error: this.error
            };
        }
    }

    
}