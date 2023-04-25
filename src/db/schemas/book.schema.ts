import {model, Schema} from "mongoose";

const bookSchema = new Schema({
    title           : {type: String, require: true},
    description     : {type: String, require: true},
    author          : {type: String, require: true},
    editorial       : {type: String, require: true},
    stock           : {type: Number, require: true},
    thumbnail       : {type: Array, require: true},
    price           : {type: Number, require: true},
    code            : {type: String, require: true},
    pages           : {type: Number, require: true},
    language        : {type: String, require: true},
    release         : {type: String, require: true},
    category        : {type: String, require: true},
    sold            : {type: Number, require: true},
    type            : {type: String, require: true},
})

export const BookModel = model('Book', bookSchema)