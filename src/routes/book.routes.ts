import { Router } from "express";
import { getAllBooks, addNewBook, getBookById } from "../controllers/book.controller";

const router = Router()

router.get('/', getAllBooks)

router.get('/:id', getBookById)

router.post('/', addNewBook)


export default router