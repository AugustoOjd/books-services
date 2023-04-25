"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("../controllers/book.controller");
const router = (0, express_1.Router)();
router.get('/', book_controller_1.getAllBooks);
router.post('/', book_controller_1.addNewBook);
exports.default = router;