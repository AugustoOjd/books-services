import express, {Application, application} from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import DBConnection from "../db/dbConnection";
import mongoose from "mongoose";



export default class Server {
    
    private app: Application
    private port: string

    constructor(){
        this.app = express()
        this.port = process.env.PORT || '3000'


        this.dbConnection()

        // Middlewares
        this.middlewares();

        // Definir rutas
        this.routes(); 
    }

    async dbConnection(){
        const connect = DBConnection.getInstance()
        console.log(connect)
    }


    middlewares(){
        this.app.use(cookieParser())
        this.app.use(cors())
    }

    routes(){

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          })
    }
}