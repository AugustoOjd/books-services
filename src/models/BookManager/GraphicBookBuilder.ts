import { IBookBuilder, TypeBooks } from "../../interfaces/book/IBookBuilder";
import Book from "./Book";


export default class GraphicBookBuilder implements IBookBuilder{
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
    type            : TypeBooks;

    constructor(){
        this.title           = ''
        this.description     = ''
        this.author          = ''
        this.editorial       = ''
        this.stock           = 0
        this.thumbnail       = []
        this.price           = 0
        this.pages           = 0
        this.language        = ''
        this.release         = ''
        this.category        = ''
        this.sold            = 0
        this.type            = 'graphic'
    }

    reset():void{
        this.title           = '';
        this.description     = '';
        this.author          = '';
        this.editorial       = '';
        this.stock           = 0;
        this.thumbnail       = [];
        this.price           = 0;
        this.pages           = 0;
        this.language        = '';
        this.release         = '';
        this.category        = '';
        this.sold            = 0;
        this.type            = 'graphic';
    }

    setTitle(title: string): IBookBuilder {
        this.title = title
        return this
    }
    setDescription(desc: string): IBookBuilder {
        this.description = desc
        return this
    }
    setAuthor(author: string): IBookBuilder {
        this.author = author
        return this
    }
    setEditorial(edito: string): IBookBuilder {
        this.editorial = edito
        return this
    }
    setStock(stock: number): IBookBuilder {
        this.stock = stock
        return this
    }
    setPrice(price: number): IBookBuilder {
        this.price = price
        return this
    }
    setPages(pages: number): IBookBuilder {
        this.pages = pages
        return this
    }
    setCategory(category: string): IBookBuilder {
        this.category = category
        return this
    }
    setLaguange(language: string): IBookBuilder {
        this.language = language
        return this
    }
    setRelease(release: string): IBookBuilder {
        this.release = release
        return this
    }
    setSold(): IBookBuilder {
        this.sold = 0
        return this
    }
    setType(): IBookBuilder {
        this.type = 'graphic'
        return this
    }

    addThumbnail(img: string): IBookBuilder {
        this.thumbnail.push(img)
        return this
    }

    build(): Book {
        const graphicBook = new Book(
            this.title,      
            this.description,
            this.author,     
            this.editorial,  
            this.stock,      
            this.thumbnail,  
            this.price,      
            this.pages,      
            this.language,   
            this.release,    
            this.category,   
            this.sold,       
            this.type,       
        )

        this.reset()
        
        return graphicBook
    }
}