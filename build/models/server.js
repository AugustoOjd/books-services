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
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const book_routes_1 = __importDefault(require("../routes/book.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const pgConnection_1 = require("../db/pgConnection");
const User_table_1 = require("../db/models/User.table");
const Author_table_1 = require("../db/models/Author.table");
const Category_table_1 = require("../db/models/Category.table");
const Book_table_1 = require("../db/models/Book.table");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.paths = {
            user: '/api/user',
            book: '/api/books'
        };
        // this.dbConnection()
        this.dbSQLConnection();
        // Middlewares
        this.middlewares();
        // Definir rutas
        this.routes();
    }
    getApp() {
        return this.app;
    }
    dbSQLConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield pgConnection_1.sequelize.authenticate();
                yield User_table_1.User.sync();
                yield Author_table_1.Author.sync();
                yield Category_table_1.Category.sync();
                yield Book_table_1.Book.sync();
                // await User.sync({force: true})
                // await Author.sync({force: true})
                // await Category.sync({force: true})
                // await Book.sync({force: true})
                console.log('Connection has been established successfully.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
    // async dbConnection(){
    //     // const connect = await 
    //     // console.log(connect)
    //     try {
    //         // await mongoose.connect(process.env.DB_CONNECTION!)
    //         await DBConnection.getInstance()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
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
        this.app.use(this.paths.user, user_routes_1.default);
        this.app.use(this.paths.book, book_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}
exports.default = Server;
