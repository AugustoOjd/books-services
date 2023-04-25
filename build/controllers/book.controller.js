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
exports.addNewBook = exports.getAllBooks = void 0;
const express_1 = require("express");
const book_services_1 = __importDefault(require("../services/bookServices/book.services"));
const bookServices = new book_services_1.default();
const getAllBooks = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({
            msg: 'Success',
            payload: 'todos los books en json'
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllBooks = getAllBooks;
const addNewBook = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, author, editorial, stock, thumbnail, price, code, pages, language, release, category } = req.body;
    try {
        const data = yield bookServices.createPhysicalBook(title, description, author, editorial, stock, thumbnail, price, code, pages, language, release, category);
        return res.status(201).json({
            msg: 'physical book created success',
            payload: {
                book: {
                    title: data.book.title,
                    description: data.book.description,
                    author: data.book.author,
                    editorial: data.book.editorial,
                    stock: data.book.stock,
                    thumbnail: data.book.thumbnail,
                    price: data.book.price,
                    code: data.book.code,
                    pages: data.book.pages,
                    language: data.book.language,
                    release: data.book.release,
                    category: data.book.category
                }
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addNewBook = addNewBook;
