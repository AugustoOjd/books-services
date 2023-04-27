import {response, request} from 'express'
import BookServices from '../services/bookServices/book.services'

const bookServices = new BookServices()

export const getAllBooks = async (req = request, res = response)=>{
    
    const { limit, category } = req.query

    try {
        const data = await bookServices.getAllBooks(limit as string)

        if(category){
            const data = await bookServices.getBookByCategory(category as string)

            return res.status(200).json({
                msg: 'Success',
                payload: {
                    books: data.books
                }
            })
        }

        return res.status(200).json({
            msg: 'Success',
            payload: {
                books: data.books
            }
        })
    } catch (error) {
        return res.status(404).json({error: error})
    }
}

export const getBookById = async(req = request, res = response)=>{
    const { id } = req.params

    try {
        
        const data = await bookServices.getBookById(id)

        return res.status(200).json({
            msg: 'Success',
            payload: {
                book: data.book
            }
        })

    } catch (error) {
        return res.status(500).json({error: error})
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
                id: data.book._id,
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
        return res.status(404).json({error: error})
    }
}

export const updateBookById = async (req = request, res = response)=>{
    const { id } = req.params
    const newData = req.body

    try {
        
        // const book = await bookServices.updatePhysicalBook(id, {title: 'new title', description: 'new description', price: 50})
        const book = await bookServices.updatePhysicalBook(id, {...newData})

        return res.status(201).json({
            msg: 'Update success',
            payload: book
        })
    } catch (error) {
        return res.status(404).json({error: error})
    }
}


