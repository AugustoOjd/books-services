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

const loginUser = {
  email: newUser.email,
  password: newUser.password
}

const authRegularUser = {
  name: newUser.name,       
  lastName: newUser.lastName,   
  email: newUser.email,      
  country: newUser.country,    
  status: true,     
  typeAccount: 'regular',
  balance: 2000,    
  // cart: [],     
  // history: []    
}

describe('Pruebas API /user', ()=>{

  beforeAll(async ()=>{
    await mongoose.connect(process.env.DB_CONNECTION!)
  })

  afterAll(async ()=>{
    await UserModel.deleteMany({ email: newUser.email })
    await mongoose.disconnect()
  })
  
  it('GET /api/user - Ruta funciona conecta con base de datos y retorna un json -', async ()=>{
    let resp = await request(new Server().getApp()).get('/api/user').send()
    
      expect(resp.status).toBe(200)
      expect(resp.headers['content-type']).toContain('json')
  })

  it('POST /api/user - register new regular user -', async ()=>{
      const resp = await request(new Server().getApp()).post('/api/user').send(newUser)

      expect(resp.status).toBe(201)
      expect(resp.headers['content-type']).toContain('json')
      expect(resp.body.payload.user.name).toBe(newUser.name)
      expect(resp.body.payload.user.lastName).toBe(newUser.lastName)
      expect(resp.body.payload.user.email).toBe(newUser.email)
      expect(resp.body.payload.user.typeAccount).toBe('regular')
      expect(resp.body.payload.user.balance).toBe(1000)
      expect(resp.body.payload.user.cart).toBeInstanceOf(Array)
      expect(resp.body.payload.user.history).toBeInstanceOf(Array)
      expect(resp.body.payload.token).toBeDefined()
  })

  it('POST /api/user/auth - login user -', async ()=>{
      const resp = await request(new Server().getApp()).post('/api/user/auth').send(loginUser)

      expect(resp.statusCode).toBe(200)
      expect(resp.headers['content-type']).toContain('json')
      expect(resp.body.payload.user.email).toBe(loginUser.email)
      expect(resp.body.payload.user.name).toBe(newUser.name)
      expect(resp.body.payload.user.lastName).toBe(newUser.lastName)
      expect(resp.body.payload.user.typeAccount).toBeDefined()
      expect(resp.body.payload.user.balance).toBeDefined()
      expect(resp.body.payload.user.cart).toBeInstanceOf(Array)
      expect(resp.body.payload.user.history).toBeInstanceOf(Array)
      expect(resp.body.payload.token).toBeDefined()
  })

  it('PUT /api/user/plus - actualizar user a plus -', async ()=>{
    const resp = await request(new Server().getApp()).put('/api/user/plus').send()
    // const resp = await request(new Server().getApp()).put('/api/user/plus').send()

    expect(resp.status).toBe(201)
    expect(resp.headers['content-type']).toContain('json')
    expect(resp.body.payload.user.email).toBe(authRegularUser.email)
    expect(resp.body.payload.user.name).toBe(authRegularUser.name)
    expect(resp.body.payload.user.lastName).toBe(authRegularUser.lastName)
    expect(resp.body.payload.user.status).toBe(true)
    expect(resp.body.payload.user.typeAccount).toBe('plus')
    expect(resp.body.payload.user.balance).toBe(authRegularUser.balance)
    expect(resp.body.payload.user.cart).toBeInstanceOf(Array)
    expect(resp.body.payload.user.history).toBeInstanceOf(Array)
    expect(resp.body.payload.token).toBeDefined()
  })


  // describe('PUT /api/user/plus -actualizar user a plus-', ()=>{

  //   afterAll(async ()=>{
  //     await UserModel.deleteMany({ email: newUser.email })
  //   })

  //   it('PUT /api/user/plus actualizar typeAccount', async ()=>{
  //     const resp = await request(new Server().getApp()).put('/api/user/plus').send(newUser)

  //     expect(resp.status).toBe(201)
  //     expect(resp.headers['content-type']).toContain('json')
  //     expect(resp.body.payload.user.id).toBeDefined()
  //     expect(resp.body.payload.user.name).toBe(newUser.name)
  //     expect(resp.body.payload.user.lastName).toBe(newUser.lastName)
  //     expect(resp.body.payload.user.email).toBe(newUser.email)
  //     expect(resp.body.payload.user.typeAccount).toBe('plus')
  //     expect(resp.body.payload.user.balance).toBe(2000)
      
  //     // Object.defineProperty(window.document, 'cookie', {
  //     //   writable: true,
  //     //   value: 'token',
  //     // });

  //   })

  // })



})

