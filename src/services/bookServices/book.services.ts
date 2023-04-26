import PhysicalBookBuilder from "../../models/BookManager/PhysicalBookBuilder"
import GraphicBookBuilder from '../../models/BookManager/GraphicBookBuilder';
import PdfBookBuilder from "../../models/BookManager/PdfBookBuilder";
import BookDirector from "../../models/BookManager/BookDirector";
import { BookModel } from "../../db/schemas/book.schema";

type CategoryType = 'drama' | 'terror' | 'fiction' 

export default class BookServices {
    

    private physicalBookBuilder
    private pdfBookBuilder
    private graphicBookBuilder
    
    private bookDirector


    error: string
    code: number

    constructor(){
        this.physicalBookBuilder = new PhysicalBookBuilder()
        this.pdfBookBuilder = new PdfBookBuilder()
        this.graphicBookBuilder = new GraphicBookBuilder()
        this.bookDirector = new BookDirector(this.physicalBookBuilder)

        this.error = ''
        this.code = 200
    }

    errorController(message: string, code: number) {
        this.error = message;
        this.code = code
    }

    async getAllBooks(limit?: string){
        try {
            const data = await BookModel.find()

            if(!data){
                throw this.errorController('data is undefined', 500)
            }

            const limitData = data.slice(0, Number(limit))
            if(limit){
                return {
                    books: limitData
                }
            }

            return {
                books: data
            }
        } catch (error) {
            throw {
                error: this.error,
                code: this.code
            }
        }
    }

    async getBookById(id: string){
        try {
            const data = await BookModel.findById(id)
            if(!data) throw this.errorController('id not found', 404)

            return {
                book: data
            }

        } catch (error) {
            throw {
                error: this.error,
                code: this.code
            }
        }
    }

    async getBookByCategory(category?: string){
        try {
            
            if(category){
                const data = await BookModel.find({category: category})

                if(!data) throw this.errorController('category not found', 404)

                return {
                    books: data
                }
            }
            else{
                
                const data = await BookModel.find()

                if(!data) throw this.errorController('books error not found', 404)

                return {
                    books: data
                }
            }

        } catch (error) {
            throw {
                error: this.error,
                code: this.code
            }
        }
    }

    async createPhysicalBook(
        title          :  string,
        description    :  string,
        author         :  string,
        editorial      :  string,
        stock          :  number,
        thumbnail      :  string,
        price          :  number,
        code           :  string,
        pages          :  number,
        language       :  string,
        release        :  string,
        category       :  string
        ){
            try {
                if(!title ||!description||!author ||!editorial ||!stock ||!thumbnail ||!price || !code ||!pages ||!language ||!release ||!category){
                        throw this.errorController('All fields are require', 404)
                    }
            
            this.bookDirector.createBook(
                title,      
                description,
                author,     
                editorial,  
                stock,      
                thumbnail,  
                price,
                code,      
                pages,      
                language,   
                release,    
                category)
    
                const book = this.physicalBookBuilder.build()
                const data = await BookModel.create(book)
    
                return {
                    book: data,
                }
            } catch (error) {
                throw {
                    error: this.error,
                    code: this.code
                }
            }
    }

}