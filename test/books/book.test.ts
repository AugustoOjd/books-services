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


describe('CRUD BOOK - GET,POST, PUT, DELETE - peticiones post api/books - ', ()=>{

    let respPost
    beforeAll(async ()=>{
        await mongoose.connect(process.env.DB_CONNECTION!)
        respPost = await request(new Server().getApp()).post('/api/books').send(newbookMock)
      })

    afterAll(async ()=>{
      await BookModel.deleteOne({ code: 'ghnxjl' })
      await mongoose.disconnect()
    })

    it('POST - add new book api/books', async ()=>{

        // let respPost = await request(new Server().getApp()).post('/api/books').send(newbookMock)
    
        expect(respPost.status).toBe(201)
        expect(respPost.headers['content-type']).toContain('json')
        expect(respPost.body.payload.book.id).toBeDefined()
        expect(respPost.body.payload.book.title).toBe(newbookMock.title)
        expect(respPost.body.payload.book.description).toBe(newbookMock.description)
        expect(respPost.body.payload.book.author).toBe(newbookMock.author)
        expect(respPost.body.payload.book.editorial).toBe(newbookMock.editorial)
        expect(respPost.body.payload.book.price).toBe(newbookMock.price)
        expect(respPost.body.payload.book.code).toBe(newbookMock.code)
        expect(respPost.body.payload.book.pages).toBe(newbookMock.pages)
        expect(respPost.body.payload.book.category).toBe(newbookMock.category)
    })
    
    

    it('GET - get all books', async ()=>{

      let resp = await request(new Server().getApp()).get('/api/books').send()
      
      expect(resp.status).toBe(200)
      expect(resp.headers['content-type']).toContain('json')
      expect(resp.body.payload.books).toBeDefined()
    })

    it('GET - get by id api/books/:id', async ()=>{

      let respGet = await request(new Server().getApp()).get(`/api/books/${respPost.body.payload.book.id}`).send()

      expect(respGet.status).toBe(200)
      expect(respGet.headers['content-type']).toContain('json')
      expect(respGet.body.payload.book.title).toBe(newbookMock.title)
      expect(respGet.body.payload.book.description).toBe(newbookMock.description)
      expect(respGet.body.payload.book.author).toBe(newbookMock.author)
      expect(respGet.body.payload.book.editorial).toBe(newbookMock.editorial)
      expect(respGet.body.payload.book.price).toBe(newbookMock.price)
      expect(respGet.body.payload.book.code).toBe(newbookMock.code)
      expect(respGet.body.payload.book.pages).toBe(newbookMock.pages)
      expect(respGet.body.payload.book.category).toBe(newbookMock.category)
    })

    it('GET - get by category api/books?category=', async ()=>{

      let resp = await request(new Server().getApp()).get(`/api/books`).query({ category: 'drama'}).send()

      expect(resp.status).toBe(200)
      expect(resp.headers['content-type']).toContain('json')
      expect(resp.body.payload.books).toBeDefined()
      expect(resp.body.payload.books[0].title).toBe(newbookMock.title)
      expect(resp.body.payload.books[0].description).toBe(newbookMock.description)
      expect(resp.body.payload.books[0].author).toBe(newbookMock.author)
      expect(resp.body.payload.books[0].editorial).toBe(newbookMock.editorial)
      expect(resp.body.payload.books[0].price).toBe(newbookMock.price)
      expect(resp.body.payload.books[0].code).toBe(newbookMock.code)
      expect(resp.body.payload.books[0].pages).toBe(newbookMock.pages)
      expect(resp.body.payload.books[0].category).toBe(newbookMock.category)
    })

    it('PUT - put actualizar by id api/books/:id', async()=>{

      const newData = {title: 'new title', description: 'new description', price: 50 }
      let resp = await request(new Server().getApp()).put(`/api/books/${respPost.body.payload.book.id}`).send(newData)

      expect(resp.status).toBe(201)
      expect(resp.headers['content-type']).toContain('json')
      expect(resp.body.payload.book.title).toBe('new title')
      expect(resp.body.payload.book.description).toBe('new description')
      expect(resp.body.payload.book.author).toBe(newbookMock.author)
      expect(resp.body.payload.book.editorial).toBe(newbookMock.editorial)
      expect(resp.body.payload.book.price).toBe(50)
      expect(resp.body.payload.book.code).toBe(newbookMock.code)
      expect(resp.body.payload.book.pages).toBe(newbookMock.pages)
      expect(resp.body.payload.book.category).toBe(newbookMock.category)
    })


})