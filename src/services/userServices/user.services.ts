import { UserModel } from "../../db/schemas/user.schema"
import UserBuilder from "../../models/UsersManagers/UserBuilder"
import UserDirector from "../../models/UsersManagers/UserDirector"
import jwt from 'jsonwebtoken'
import { validPassword } from "../../utils/bcryptConfig"

type ResponseLoginUser = {
    _id             : string
    name            : string
    lastName        : string
    email           : string
    country         : string
    status          : boolean
    password?       : string;
    typeAccount     : string
    balance         : number
    discount        : number  
    freeShipping    : boolean
    registerDate?   : Date

    cart            : []
    history         : []
}


export default class UserServices {

    private userBuilder 
    private userDirector
    error: string
    code: number

    constructor(){
        this.userBuilder = new UserBuilder()
        this.userDirector = new UserDirector(this.userBuilder)
        this.error = ''
        this.code = 200

        this.errorController
    }

    errorController(message: string, code: number) {
        this.error = message;
        this.code = code
    }

    public async registerRegularUser(name: string, lastName: string, email: string, country: string, password: string){
        try {
            
            let valideEmail = await UserModel.findOne({email: email})
            
            if(valideEmail){
                throw this.errorController('Email already exits', 404)
            }
            this.userDirector.createRegularUser(name, lastName, email, country, password)
            
            const user = this.userBuilder.build()
            const data = await UserModel.create(user)
            
            const token = jwt.sign({token: data._id}, process.env.JWT_KEY!, {expiresIn: '1h'})
            

            return {
                userData: data,
                token
            }

        } catch (error) {
            throw {
                error: this.error,
                code: this.code
            }
        }
    }

    public async loginUser(email: string, password: string){
        try {

            if(!email || !password){
                throw this.errorController('Email and password are require', 404)
            }

            const user: ResponseLoginUser | null = await UserModel.findOne({email: email})

            if(!user){
                throw this.errorController('Invalid email', 404) 
            }

            const token = jwt.sign({token: user._id}, process.env.JWT_KEY!, {expiresIn: '1h'})
            if(!token){
                throw this.errorController('Generate token error', 405)
            }

            const validPassDB = validPassword(user, password)
            if(!validPassDB){
                throw this.errorController('Incorrect email or password', 404) 
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
                    discount        : user.discount,
                    freeShipping    : user.freeShipping,   
                    cart            : user.cart,   
                    history         : user.history
                },
                token
            }


        } catch (error) {
            throw {
                error: this.error,
                code: this.code
            } 
        }
    }

    public async updateUserToPlus(tokenQuery: string){

        try {
            const userId:any = jwt.verify(tokenQuery, process.env.JWT_KEY!)

            if(!userId.token){
                throw  this.errorController('Invalid token', 403)
            }

            const user: ResponseLoginUser | null = await UserModel.findById(userId.token)

            if(!user){
                throw this.errorController('Invalid user', 404)
            }
            if(user.balance < 500){
                throw this.errorController('Balance at least 500', 403)
            }
            if(user.typeAccount === 'premium'){
                throw this.errorController('account premium already', 404)
            }
            // $2a$10$4GPgajB8PbSlWbAbAa7gYO0uu.MfCEBv6Ac7S7U72jbSZ.zTqIOgi
            this.userDirector.createPlusUser(
                user._id, 
                user.name, 
                user.lastName, 
                user.email, 
                user.country, 
                user.password!, 
                user.registerDate!, 
                user.cart, 
                user.history
                )

            const userPlus = this.userBuilder.build() 

            const userUpdated = await UserModel.findByIdAndUpdate(userId.token, userPlus, {
                new: true
            }).lean()

            if(!userUpdated){
                throw this.errorController('Error in update user to plus', 500) 
            }
            
            return {
                userData:{
                    name            : userUpdated.name,
                    lastName        : userUpdated.lastName,
                    email           : userUpdated.email,   
                    country         : userUpdated.lastName,
                    status          : userUpdated.status,
                    typeAccount     : userUpdated.typeAccount,
                    balance         : userUpdated.balance,
                    discount        : userUpdated.discount,
                    freeShipping    : userUpdated.freeShipping,   
                    cart            : userUpdated.cart,   
                    history         : userUpdated.history
                },
                tokenQuery
            }

        } catch (error) {
            throw {
                error: this.error,
                code: this.code
            } 
        }

    }

    public async updateUserToPremium(tokenQuery: string){

        try {
            const userId:any = jwt.verify(tokenQuery, process.env.JWT_KEY!)
            if(!userId.token){
                throw this.errorController('Invalid Token', 403) 
            }
            
            let user: ResponseLoginUser | null = await UserModel.findById(userId.token)
            if(!user){
                throw this.errorController('Invalid User', 403) 
            }
            if(user.balance < 1000){
                throw this.errorController('Balance must be at least 1000', 403)
            }

             
            this.userDirector.createPremiumUser(
                    user._id, 
                    user.name, 
                    user.lastName, 
                    user.email, 
                    user.country, 
                    user.password!, 
                    user.registerDate!, 
                    user.cart, 
                    user.history)

            const premiumUser = this.userBuilder.build()

            const userUpdated = await UserModel.findByIdAndUpdate(userId.token, premiumUser, {
                new: true
            }).lean()

            if(!userUpdated){
                throw this.errorController('Error in update user to premium', 500 ) 
            }

            return {
                userData:{
                    name            : userUpdated.name,
                    lastName        : userUpdated.lastName,
                    email           : userUpdated.email,   
                    country         : userUpdated.lastName,
                    status          : userUpdated.status,
                    typeAccount     : userUpdated.typeAccount,
                    balance         : userUpdated.balance,
                    discount        : userUpdated.discount,
                    freeShipping    : userUpdated.freeShipping,
                    cart            : userUpdated.cart,   
                    history         : userUpdated.history
                },
                tokenQuery
            }

        } catch (error) {
            throw {
                error: this.error,
                code: this.code
            } 
        }
    
    
    }

}
