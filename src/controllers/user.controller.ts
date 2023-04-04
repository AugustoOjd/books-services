import { response, request } from "express";
import RegisterRegularUser from "../services/userServices/user.services";

const serviceUser = new RegisterRegularUser()


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