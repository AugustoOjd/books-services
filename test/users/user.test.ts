import request from 'supertest'
import Server from '../../src/models/server';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { UserModel } from '../../src/db/schemas/user.schema';

dotenv.config()

const newUser = {
  name: 'mockjose',
  lastName: 'mockgomez',
  email: 'mockjoseee@gmail.com',
  country: 'mockchile',
  password: '123456'
}


describe('Pruebas API /user', ()=>{

  beforeAll(async ()=>{
    await mongoose.connect(process.env.DB_CONNECTION!)
  })

  afterAll(async ()=>{
    await mongoose.disconnect()
  })

  describe('GET /api/user',()=>{
    let resp;
    beforeEach( async ()=>{
      resp = await request(new Server().getApp()).get('/api/user').send()
    })
    
    it('Ruta funciona y retorna un json', async ()=>{
      expect(resp.status).toBe(200)
      expect(resp.headers['content-type']).toContain('json')
    })
  })

  describe('POST /api/user -register regular user-', ()=>{
    
    it('POST /api/user insert regular user', async ()=>{
      const resp = await request(new Server().getApp()).post('/api/user').send(newUser)

      expect(resp.status).toBe(201)
      expect(resp.headers['content-type']).toContain('json')
      expect(resp.body.payload.user.id).toBeDefined()
      expect(resp.body.payload.user.name).toBe(newUser.name)
      expect(resp.body.payload.user.lastName).toBe(newUser.lastName)
      expect(resp.body.payload.user.email).toBe(newUser.email)
      expect(resp.body.payload.user.typeAccount).toBe('regular')
      expect(resp.body.payload.user.balance).toBe(1000)
      expect(resp.body.payload.user.cart).toBeInstanceOf(Array)
      expect(resp.body.payload.user.history).toBeInstanceOf(Array)
    })

  })

  describe('PUT /api/user/plus -actualizar user a plus-', ()=>{

    afterAll(async ()=>{
      await UserModel.deleteMany({ email: newUser.email })
    })

    it('PUT /api/user/plus actualizar typeAccount', async ()=>{
      const resp = await request(new Server().getApp()).put('/api/user/plus').send(newUser)

      expect(resp.status).toBe(201)
      expect(resp.headers['content-type']).toContain('json')
      expect(resp.body.payload.user.id).toBeDefined()
      expect(resp.body.payload.user.name).toBe(newUser.name)
      expect(resp.body.payload.user.lastName).toBe(newUser.lastName)
      expect(resp.body.payload.user.email).toBe(newUser.email)
      expect(resp.body.payload.user.typeAccount).toBe('plus')
      expect(resp.body.payload.user.balance).toBe(2000)
      
      // Object.defineProperty(window.document, 'cookie', {
      //   writable: true,
      //   value: 'token',
      // });

    })

  })








})

