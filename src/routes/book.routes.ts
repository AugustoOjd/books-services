import { Router } from "express";
import { getAllBooks, addNewBook } from "../controllers/book.controller";

const router = Router()

router.get('/', getAllBooks)

router.post('/', addNewBook)


export default router