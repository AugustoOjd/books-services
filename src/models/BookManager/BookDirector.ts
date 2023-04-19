import { IBookBuilder } from "../../interfaces/book/IBookBuilder";


export default class BookDirector {

    private bookbuilder: IBookBuilder

    constructor(bookbuilder: IBookBuilder){
        this.bookbuilder = bookbuilder
    }


    setBookBuilder(bookbuilder: IBookBuilder){
        this.bookbuilder = bookbuilder
    }

}