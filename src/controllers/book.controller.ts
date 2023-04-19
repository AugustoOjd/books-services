import {response, request} from 'express'


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
    try {
        return res.status(201).json({
            msg: 'Success',
            payload: 'add new book'
        })
    } catch (error) {
        console.log(error)
    }
}

