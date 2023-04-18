import Book from "../../models/BookManager/Book";

export interface IBookBuilder {
    title           : string;
    description     : string;
    author          : string;
    editorial       : string;
    stock           : number;
    thumbnail       : string[];
    price           : number;
    pages           : number;
    language        : string;
    release         : string;
    category        : string;
    sold            : number;
    type            : string;

    setTitle(title:string): IBookBuilder
    setDescription(desc: string): IBookBuilder
    setAuthor(author: string): IBookBuilder
    setEditorial(edito: string): IBookBuilder
    setStock(stock: number): IBookBuilder
    setPrice(price: number): IBookBuilder
    setPages(pages: number): IBookBuilder
    setLaguange(language: string): IBookBuilder
    setRelease(release: string): IBookBuilder
    setCategory(category: string): IBookBuilder
    setSold(sold: number): IBookBuilder
    setType(type: string): IBookBuilder
    

    addThumbnail(img: string): IBookBuilder

    build(): Book
}