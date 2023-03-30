"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Aplicando singleton para conexion de db
class DBConnection {
    // private connect: Promise<typeof import("mongoose")>
    constructor() {
        // this.connection
        mongoose_1.default.connect(process.env.DB_CONNECTION);
    }
    // async connection(){
    //     let db = await mongoose.connect(process.env.DB_CONNECTION!)
    //     return db
    // }
    static getInstance() {
        if (!this.instance) {
            console.log('db conectada');
            return this.instance = new DBConnection;
        }
        console.log('db ya conectada');
        return this.instance;
    }
}
exports.default = DBConnection;
