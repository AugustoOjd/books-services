import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
// Aplicando singleton para conexion de db

export default class DBConnection {

    private static instance: DBConnection
    // private connect: Promise<typeof import("mongoose")>

    private constructor(){
        // this.connection
        mongoose.connect(process.env.DB_CONNECTION!)
    }

    // async connection(){
    //     let db = await mongoose.connect(process.env.DB_CONNECTION!)
    //     return db
    // }

    public static getInstance(): DBConnection{
        if(!this.instance){
            console.log('db conectada')
            return this.instance = new DBConnection
        }
        console.log('db ya conectada')
        return this.instance
    }

}



