"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BookDirector {
    constructor(bookbuilder) {
        this.bookbuilder = bookbuilder;
    }
    setBookBuilder(bookbuilder) {
        this.bookbuilder = bookbuilder;
    }
    createBook(title, description, author, editorial, stock, thumbnail, price, code, pages, language, release, category) {
        this.bookbuilder.setTitle(title)
            .setDescription(description)
            .setAuthor(author)
            .setEditorial(editorial)
            .setStock(stock)
            .addThumbnail(thumbnail)
            .setPrice(price)
            .setCode(code)
            .setPages(pages)
            .setLaguange(language)
            .setRelease(release)
            .setCategory(category);
    }
}
exports.default = BookDirector;
