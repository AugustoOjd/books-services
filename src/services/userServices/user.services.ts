import { UserModel } from "../../db/schemas/user.schema"
import UserBuilder from "../../models/UsersManagers/UserBuilder"
import UserDirector from "../../models/UsersManagers/UserDirector"



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

            return {
                userData: data,
                token: 'test token'
            }

        } catch (error) {
            throw {
                code: this.code,
                error: this.error
            };
        }
    }
}