"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = __importDefault(require("./Book"));
class BookPdfBuilder {
    constructor() {
        this.title = '';
        this.description = '';
        this.author = '';
        this.editorial = '';
        this.stock = 0;
        this.thumbnail = [];
        this.price = 0;
        this.pages = 0;
        this.language = '';
        this.release = '';
        this.category = '';
        this.sold = 0;
        this.type = 'pdf';
    }
    reset() {
        this.title = '';
        this.description = '';
        this.author = '';
        this.editorial = '';
        this.stock = 0;
        this.thumbnail = [];
        this.price = 0;
        this.pages = 0;
        this.language = '';
        this.release = '';
        this.category = '';
        this.sold = 0;
        this.type = 'pdf';
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setDescription(desc) {
        this.description = desc;
        return this;
    }
    setAuthor(author) {
        this.author = author;
        return this;
    }
    setEditorial(edito) {
        this.editorial = edito;
        return this;
    }
    setStock(stock) {
        this.stock = stock;
        return this;
    }
    setPrice(price) {
        this.price = price;
        return this;
    }
    setPages(pages) {
        this.pages = pages;
        return this;
    }
    setCategory(category) {
        this.category = category;
        return this;
    }
    setLaguange(language) {
        this.language = language;
        return this;
    }
    setRelease(release) {
        this.release = release;
        return this;
    }
    setSold() {
        this.sold = 0;
        return this;
    }
    setType() {
        this.type = 'pdf';
        return this;
    }
    addThumbnail(img) {
        this.thumbnail.push(img);
        return this;
    }
    build() {
        const pdfBook = new Book_1.default(this.title, this.description, this.author, this.editorial, this.stock, this.thumbnail, this.price, this.pages, this.language, this.release, this.category, this.sold, this.type);
        this.reset();
        return pdfBook;
    }
}
exports.default = BookPdfBuilder;
