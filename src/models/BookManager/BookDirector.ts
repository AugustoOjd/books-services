import { IBookBuilder } from "../../interfaces/book/IBookBuilder";


export default class BookDirector {

    private bookbuilder: IBookBuilder

    constructor(bookbuilder: IBookBuilder){
        this.bookbuilder = bookbuilder
    }


    setBookBuilder(bookbuilder: IBookBuilder){
        this.bookbuilder = bookbuilder
    }

    createBook(
        title: string,
        description: string,
        author: string,
        editorial: string,
        stock: number,
        thumbnail: string,
        price: number,
        code: string,
        pages: number,
        language: string,
        release: string,
        category: string
    ){
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
                        .setCategory(category)
    }

}