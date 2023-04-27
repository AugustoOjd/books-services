import { Router } from "express";
import { getAllBooks, addNewBook, getBookById, updateBookById } from "../controllers/book.controller";

const router = Router()

router.get('/', getAllBooks)

router.get('/:id', getBookById)

router.post('/', addNewBook)

router.put('/:id', updateBookById)


export default router