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
    // public connect: Promise<typeof import("mongoose")>
    // public saludar: string
    constructor() {
        // this.saludar = 'holaa'
        // this.connection
        mongoose_1.default.connect(process.env.DB_CONNECTION);
        // this.connect = mongoose.connect(process.env.DB_CONNECTION!)
    }
    // async connection(){
    //     await mongoose.connect(process.env.DB_CONNECTION!)
    // }
    static getInstance() {
        if (!this.instance) {
            return this.instance = new DBConnection();
        }
        return this.instance;
    }
}
exports.default = DBConnection;
