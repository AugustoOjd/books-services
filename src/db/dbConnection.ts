import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
// Aplicando singleton para conexion de db

export default class DBConnection {

    private static instance: DBConnection
    // public connect: Promise<typeof import("mongoose")>
    // public saludar: string

    private constructor(){
        // this.saludar = 'holaa'
        // this.connection
        mongoose.connect(process.env.DB_CONNECTION!)
        // this.connect = mongoose.connect(process.env.DB_CONNECTION!)
    }

    // async connection(){
    //     await mongoose.connect(process.env.DB_CONNECTION!)
        
    // }

    public static getInstance(): DBConnection{

        if(!this.instance){
            return this.instance = new DBConnection()
        }
        return this.instance
    }

}



