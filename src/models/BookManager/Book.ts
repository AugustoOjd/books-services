

export default class Book {

    private title           : string;
    private description     : string;
    private author          : string;
    private editorial       : string;
    private stock           : number;
    private thumbnail       : string[];
    private price           : number;
    private code            : string;
    private pages           : number;
    private language        : string;
    private release         : string;
    private category        : string;
    private sold            : number;
    private type            : string;

    constructor(
        title: string,
        description: string,
        author: string,
        editorial: string,
        stock: number,
        thumbnail: string[],
        price: number,
        code: string,
        pages: number,
        language: string,
        release: string,
        category: string,
        sold: number,
        type: string
    ){
        this.title = title
        this.description = description
        this.author = author
        this.editorial = editorial
        this.stock = stock
        this.thumbnail = thumbnail
        this.price = price
        this.code = code
        this.pages = pages
        this.language = language
        this.release = release
        this.category = category
        this.sold = sold
        this.type = type
    }
} 