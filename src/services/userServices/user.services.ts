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
    }

    public async registerRegularUser(name: string, lastName: string, email: string, country: string, password: string){
        try {
            
            let valideEmail = await UserModel.findOne({email: email})
            
            if(valideEmail){
                throw {
                    code: this.code = 500,
                    error: this.error = 'Email already exists'
                };
                
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
                code: this.code = 500,
                error: this.error = 'Error en register regular user'
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

            const token = jwt.sign({token: user._id}, process.env.JWT_KEY!, {expiresIn: '1h'})

            if(!token){
                throw {
                    code: this.code = 405,
                    error: this.error = 'Error en generar token'
                };
            }

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
                    discount        : user.discount,
                    freeShipping    : user.freeShipping,   
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

    public async updateUserToPlus(tokenQuery: string){

        try {
            const userId:any = jwt.verify(tokenQuery, process.env.JWT_KEY!)

            if(!userId.token){
                throw {
                    code: this.code = 403,
                    error: this.error = 'Token no valido'
                }
            }

            const user: ResponseLoginUser | null = await UserModel.findById(userId.token)

            if(!user){
                throw {
                    code: this.code = 403,
                    error: this.error = 'User no encontrado'
                }
            }
            if(user.balance < 500){
                throw {
                    code: this.code = 403,
                    error: this.error = 'No hay suficiente balance, minimo 500'
                }
            }
            if(user.typeAccount === 'premium'){
                throw{
                    code: this.code = 403,
                    error: this.error = 'No puedes pasar de premium a plus'
                }
            }

            this.userDirector.createPlusUser(
                user._id, 
                user.name, 
                user.lastName, 
                user.email, 
                user.country, 
                user.password!, 
                user.registerDate!, 
                user.cart, 
                user.history)

            const userPlus = this.userBuilder.build() 

            const userUpdated = await UserModel.findByIdAndUpdate(userId.token, userPlus, {
                new: true
            }).lean()

            if(!userUpdated){
                throw {
                    code: this.code = 500,
                    error: this.error = 'Error en actualizar user en db'
                }
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
                code: this.code = 500,
                error: this.error = "Error en services update plus user"
            }
        }

    }

    public async updateUserToPremium(tokenQuery: string){

        try {
            const userId:any = jwt.verify(tokenQuery, process.env.JWT_KEY!)
            if(!userId.token){
                throw {
                    code: this.code = 403,
                    error: this.error = 'Token no valido'
                }
            }
            
            let user: ResponseLoginUser | null = await UserModel.findById(userId.token)
            if(!user){
                throw {
                    code: this.code = 403,
                    error: this.error = 'User no encontrado'
                }
            }
            if(user.balance < 1000){
                throw {
                    code: this.code = 403,
                    error: this.error = 'No hay suficiente balance, minimo 1000'
                }
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
                throw {
                    code: this.code = 500,
                    error: this.error = 'Error en actualizar user en db'
                }
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
                code: this.code = 500,
                error: this.error = "Error en services update premium user"
            }
        }
    
    
    }

}
