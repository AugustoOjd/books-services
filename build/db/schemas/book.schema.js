"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    author: { type: String, require: true },
    editorial: { type: String, require: true },
    stock: { type: Number, require: true },
    thumbnail: { type: Array, require: true },
    price: { type: Number, require: true },
    code: { type: String, require: true },
    pages: { type: Number, require: true },
    language: { type: String, require: true },
    release: { type: String, require: true },
    category: { type: String, require: true },
    sold: { type: Number, require: true },
    type: { type: String, require: true },
});
exports.BookModel = (0, mongoose_1.model)('Book', bookSchema);
