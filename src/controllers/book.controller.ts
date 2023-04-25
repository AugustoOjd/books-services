import {response, request} from 'express'
import BookServices from '../services/bookServices/book.services'

const bookServices = new BookServices()

export const getAllBooks = async (req = request, res = response)=>{
    try {
        

        return res.status(200).json({
            msg: 'Success',
            payload: 'todos los books en json'
        })
    } catch (error) {
        console.log(error)
    }
}

export const addNewBook = async (req = request, res = response)=>{

    const {title ,description,author ,editorial ,stock ,thumbnail ,price , code, pages ,language ,release ,category} = req.body

    try {

        const data = await bookServices.createPhysicalBook(title ,description,author ,editorial ,stock ,thumbnail ,price , code, pages ,language ,release ,category)

        return res.status(201).json({
            msg: 'physical book created success',
            payload: {
                book: {
                title: data.book.title,
                description: data.book.description,
                author: data.book.author,
                editorial: data.book.editorial,
                stock: data.book.stock,
                thumbnail: data.book.thumbnail,
                price: data.book.price,
                code: data.book.code,
                pages: data.book.pages,
                language: data.book.language,
                release: data.book.release,
                category: data.book.category
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

