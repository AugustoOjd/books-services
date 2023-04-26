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
const PhysicalBookBuilder_1 = __importDefault(require("../../models/BookManager/PhysicalBookBuilder"));
const GraphicBookBuilder_1 = __importDefault(require("../../models/BookManager/GraphicBookBuilder"));
const PdfBookBuilder_1 = __importDefault(require("../../models/BookManager/PdfBookBuilder"));
const BookDirector_1 = __importDefault(require("../../models/BookManager/BookDirector"));
const book_schema_1 = require("../../db/schemas/book.schema");
class BookServices {
    constructor() {
        this.physicalBookBuilder = new PhysicalBookBuilder_1.default();
        this.pdfBookBuilder = new PdfBookBuilder_1.default();
        this.graphicBookBuilder = new GraphicBookBuilder_1.default();
        this.bookDirector = new BookDirector_1.default(this.physicalBookBuilder);
        this.error = '';
        this.code = 200;
    }
    errorController(message, code) {
        this.error = message;
        this.code = code;
    }
    getAllBooks(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield book_schema_1.BookModel.find();
                if (!data) {
                    throw this.errorController('data is undefined', 500);
                }
                const limitData = data.slice(0, Number(limit));
                if (limit) {
                    return {
                        books: limitData
                    };
                }
                return {
                    books: data
                };
            }
            catch (error) {
                throw {
                    error: this.error,
                    code: this.code
                };
            }
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield book_schema_1.BookModel.findById(id);
                if (!data)
                    throw this.errorController('id not found', 404);
                return {
                    book: data
                };
            }
            catch (error) {
                throw {
                    error: this.error,
                    code: this.code
                };
            }
        });
    }
    getBookByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (category) {
                    const data = yield book_schema_1.BookModel.find({ category: category });
                    if (!data)
                        throw this.errorController('category not found', 404);
                    return {
                        books: data
                    };
                }
                else {
                    const data = yield book_schema_1.BookModel.find();
                    if (!data)
                        throw this.errorController('books error not found', 404);
                    return {
                        books: data
                    };
                }
            }
            catch (error) {
                throw {
                    error: this.error,
                    code: this.code
                };
            }
        });
    }
    createPhysicalBook(title, description, author, editorial, stock, thumbnail, price, code, pages, language, release, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!title || !description || !author || !editorial || !stock || !thumbnail || !price || !code || !pages || !language || !release || !category) {
                    throw this.errorController('All fields are require', 404);
                }
                this.bookDirector.createBook(title, description, author, editorial, stock, thumbnail, price, code, pages, language, release, category);
                const book = this.physicalBookBuilder.build();
                const data = yield book_schema_1.BookModel.create(book);
                return {
                    book: data,
                };
            }
            catch (error) {
                throw {
                    error: this.error,
                    code: this.code
                };
            }
        });
    }
}
exports.default = BookServices;
