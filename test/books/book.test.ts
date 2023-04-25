import request from 'supertest'
import Server from '../../src/models/server';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { BookModel } from '../../src/db/schemas/book.schema';

dotenv.config()

let newbookMock = {
    title       : 'title mock',     
    description : 'description mock',
    author      : 'author mock',
    editorial   : 'editorial mock',
    stock       : 15,
    thumbnail   : ['img mock'],
    price       : 30,
    code        : 'ghnxjl',
    pages       : 230,
    language    : 'english',
    release     : '03-02-1982',
    category    : 'drama'
}

describe('GET - peticiones get api/books -', ()=>{

    beforeAll(async ()=>{
        await mongoose.connect(process.env.DB_CONNECTION!)
      })

    afterAll(async ()=>{
    //   await UserModel.deleteMany({ email: newUser.email })
      await mongoose.disconnect()
    })

    it('GET - get all books', async ()=>{

        let resp = await request(new Server().getApp()).get('/api/books').send()
    
        expect(resp.status).toBe(200)
        expect(resp.headers['content-type']).toContain('json')
    })

})

describe('POST - peticiones post api/books - ', ()=>{

    beforeAll(async ()=>{
        await mongoose.connect(process.env.DB_CONNECTION!)
      })

    afterAll(async ()=>{
      await BookModel.deleteMany({ title: newbookMock.title })
      await mongoose.disconnect()
    })

    it('POST - add new book api/books', async ()=>{

        let resp = await request(new Server().getApp()).post('/api/books').send(newbookMock)
    
        expect(resp.status).toBe(201)
        expect(resp.headers['content-type']).toContain('json')
        expect(resp.body.payload.book.title).toBe(newbookMock.title)
        expect(resp.body.payload.book.description).toBe(newbookMock.description)
        expect(resp.body.payload.book.author).toBe(newbookMock.author)
        expect(resp.body.payload.book.editorial).toBe(newbookMock.editorial)
        expect(resp.body.payload.book.price).toBe(newbookMock.price)
        expect(resp.body.payload.book.code).toBe(newbookMock.code)
    })
})