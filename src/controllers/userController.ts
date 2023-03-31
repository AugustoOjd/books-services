import { response, request } from "express";
import UserDirector from '../models/UsersManagers/UserDirector';
import UserBuilder from "../models/UsersManagers/UserBuilder";

const userBuilder = new UserBuilder()
const userDirector = new UserDirector(userBuilder)

export const regiterUser = async (req = request, res = response)=>{

    const { name, lastName, email, country, password, status = true, balance = 2000} = req.body
    
    try {

        userDirector.createRegularUser(name, lastName, email, country, password, status, balance )
        const newRegularUser = userBuilder.build()
        
        return res.status(201).json({
            msg: 'regular user creando correctamente',
            payload: newRegularUser
        })

    } catch (error) {
        console.log(error)
        return res.status(404).json({
            msg: 'datos incorrectos'
        })
    }

}