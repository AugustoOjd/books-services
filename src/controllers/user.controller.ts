import { response, request } from "express";
import RegisterRegularUser from "../services/userServices/user.services";
import jwt from 'jsonwebtoken';


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
                id: newRegularUser.userData._id,
                name: newRegularUser.userData.name,
                lastName: newRegularUser.userData.lastName,
                email: newRegularUser.userData.email,
                country: newRegularUser.userData.country,
                status: newRegularUser.userData.status,
                balance: newRegularUser.userData.balance,
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


export const updatePlus =  async (req = request, res = response) =>{

    // headers funciona
    // const { token } = req.headers
    // console.log(token)
    // const id = jwt.verify(token as string, process.env.JWT_KEY!)

    const {token} = req.cookies

    const id = jwt.verify(token, process.env.JWT_KEY!)



    try {
        
        return res.status(201).json({
            msg: 'cookie validada correctamente',
            payload: {
                // user: {
                // id: newRegularUser.userData._id,
                // name: newRegularUser.userData.name,
                // lastName: newRegularUser.userData.lastName,
                // email: newRegularUser.userData.email,
                // country: newRegularUser.userData.country,
                // status: newRegularUser.userData.status,
                // balance: newRegularUser.userData.balance,
                // typeAccount: newRegularUser.userData.typeAccount,
                // cart: newRegularUser.userData.cart,
                // history: newRegularUser.userData.history
                // },
                // token: newRegularUser.token
                token: id
            }
        })

    } catch (error) {
        return res.status(404).json({error: 'error por editar'})
    }

}