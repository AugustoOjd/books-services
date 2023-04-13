import { response, request } from "express";
import RegisterRegularUser from "../services/userServices/user.services";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from "../db/schemas/user.schema";


const serviceUser = new RegisterRegularUser()

export const getUsers = async (req = request, res = response) =>{

    return res.status(200).json({
        msg: 'show list user',
        payload: 'users'
    })
}

export const regiterUser = async (req = request, res = response)=>{

    const { name, lastName, email, country, password } = req.body
    
    try {
        const newRegularUser = await serviceUser.registerRegularUser(name, lastName, email, country, password)
        
        return res.status(201).json({
            msg: 'regular user creando correctamente',
            payload: {
                user: {
                name: newRegularUser.userData.name,
                lastName: newRegularUser.userData.lastName,
                email: newRegularUser.userData.email,
                country: newRegularUser.userData.country,
                status: newRegularUser.userData.status,
                balance: newRegularUser.userData.balance,
                discount: newRegularUser.userData.discount,
                freeShipping: newRegularUser.userData.freeShipping,
                typeAccount: newRegularUser.userData.typeAccount,
                cart: newRegularUser.userData.cart,
                history: newRegularUser.userData.history
                },
                token: newRegularUser.token
            }
        })

    } catch (error) {
        return res.status(404).json({error: error})
    }

}

export const loginUser = async (req = request, res = response) =>{
    
    const { email, password } = req.body
    try {
    
        // AGREGAR A UN MIDDLEWARE PORQUE ES INFORMACION EXTERNA
        if(!email || !password){
            return res.status(404).json({msg: 'Debe recibir email y password'})
        }


        const LoginData = await serviceUser.loginUser(email, password)

        return res.status(200).json({
            msg: 'Login Succcess',
            payload: {
                user: {
                    name            : LoginData.userData.name,
                    lastName        : LoginData.userData.lastName,
                    email           : LoginData.userData.email,
                    country         : LoginData.userData.country,
                    status          : LoginData.userData.status,
                    balance         : LoginData.userData.balance,
                    discount        : LoginData.userData.discount,
                    freeShipping    : LoginData.userData.freeShipping,
                    typeAccount     : LoginData.userData.typeAccount,
                    cart            : LoginData.userData.cart,
                    history         : LoginData.userData.history
                    
                },
                token: LoginData.token
            }
        })

    } catch (error) {
        return res.status(404).json({error: error})
    }
}


export const updatePlus =  async (req = request, res = response) =>{

    const {token} = req.cookies

    try {
        if(!token){
            throw {error: 'token no encontrado'}
        }
        
        const updatedUserPlus = await serviceUser.updateUserToPlus(token)

        return res.status(201).json({
            msg: 'user actualizado a plus correctamente',
            payload: {
                user: {
                name: updatedUserPlus.userData.name,
                lastName: updatedUserPlus.userData.lastName,
                email: updatedUserPlus.userData.email,
                country: updatedUserPlus.userData.country,
                status: updatedUserPlus.userData.status,
                balance: updatedUserPlus.userData.balance,
                discount: updatedUserPlus.userData.discount,
                freeshipping: updatedUserPlus.userData.freeShipping,
                typeAccount: updatedUserPlus.userData.typeAccount,
                cart: updatedUserPlus.userData.cart,
                history: updatedUserPlus.userData.history
                },
                token: updatedUserPlus.tokenQuery

            }
        })

    } catch (error) {
        return res.status(404).json({error: error})
    }

}

export const updatePremium = async (req = request, res = response) =>{
    const { token } = req.cookies
    
    try {
        if(!token){
            throw {error: 'token no encontrado'}
        }
        
        const updatedPremium = await serviceUser.updateUserToPremium(token)

        return res.status(201).json({
            msg: 'user actualizado a Premium correctamente',
            payload: {
                user: {
                name: updatedPremium.userData.name,
                lastName: updatedPremium.userData.lastName,
                email: updatedPremium.userData.email,
                country: updatedPremium.userData.country,
                status: updatedPremium.userData.status,
                balance: updatedPremium.userData.balance,
                discount: updatedPremium.userData.discount,
                freeShipping: updatedPremium.userData.freeShipping,
                typeAccount: updatedPremium.userData.typeAccount,
                cart: updatedPremium.userData.cart,
                history: updatedPremium.userData.history
                },
                token: updatedPremium.tokenQuery

            }
        })


    } catch (error) {
        return res.status(500).json({error: error})
    }
}