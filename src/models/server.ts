import express, {Application, application} from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import DBConnection from "../db/dbConnection";
import registerRouter from '../routes/user.routes'
import mongoose from "mongoose";



export default class Server {
    
    private app: Application
    private port: string
    private paths: {          
        register: '/api/register'
    }

    constructor(){
        this.app = express()
        this.port = process.env.PORT || '3000'

        this.paths = {          
            register: '/api/register'
        }


        this.dbConnection()

        // Middlewares
        this.middlewares();

        // Definir rutas
        this.routes(); 
    }

    async dbConnection(){
        // const connect = await DBConnection.getInstance()
        // console.log(connect)
        await mongoose.connect(process.env.DB_CONNECTION!)
    }


    middlewares(){
        this.app.use( express.json() )
        this.app.use(cookieParser())
        this.app.use(cors())
    }

    routes(){

        this.app.use( this.paths.register , registerRouter)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          })
    }
}