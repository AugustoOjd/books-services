"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.paths = {
            register: '/api/user'
        };
        this.dbConnection();
        // Middlewares
        this.middlewares();
        // Definir rutas
        this.routes();
    }
    getApp() {
        return this.app;
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            // const connect = await 
            // console.log(connect)
            try {
                // await mongoose.connect(process.env.DB_CONNECTION!)
                yield dbConnection_1.default.getInstance();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // EXPORTAR THIS.APP O APP DEL SERVER PARA USAR EN TEST
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    routes() {
        this.app.use(this.paths.register, user_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}
exports.default = Server;
