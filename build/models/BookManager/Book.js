"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    constructor(title, description, author, editorial, stock, thumbnail, price, pages, language, release, category, sold, type) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.editorial = editorial;
        this.stock = stock;
        this.thumbnail = thumbnail;
        this.price = price;
        this.pages = pages;
        this.language = language;
        this.release = release;
        this.category = category;
        this.sold = sold;
        this.type = type;
    }
}
exports.default = Book;
