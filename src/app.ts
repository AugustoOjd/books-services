import Server from "./models/server";
import dotenv from 'dotenv'
dotenv.config()

export const server = new Server()


server.listen()

