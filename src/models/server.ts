import express, {Application, application} from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import DBConnection from "../db/dbConnection";
import registerRouter from '../routes/user.routes'
import mongoose from "mongoose";
import bodyParser from "body-parser";



export default class Server {
    
    private app: Application
    private port: string
    private paths: {          
        register: '/api/user'
    }

    constructor(){
        this.app = express()
        this.port = process.env.PORT || '3000'

        this.paths = {          
            register: '/api/user'
        }


        this.dbConnection()

        // Middlewares
        this.middlewares();

        // Definir rutas
        this.routes(); 
    }

    getApp(){
        return this.app
    }

    async dbConnection(){
        // const connect = await 
        // console.log(connect)
        try {
            // await mongoose.connect(process.env.DB_CONNECTION!)
            await DBConnection.getInstance()
        } catch (error) {
            console.log(error)
        }
        
    }

    // EXPORTAR THIS.APP O APP DEL SERVER PARA USAR EN TEST


    middlewares(){
        this.app.use( express.json() )
        this.app.use( cookieParser() )
        this.app.use( cors())
        this.app.use( bodyParser.json() );
        this.app.use( bodyParser.urlencoded({extended: true}) );
        this.app.use( express.urlencoded({extended: true}) )
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