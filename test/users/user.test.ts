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
      expect(resp.body.payload.user.discount).toBe(0)
      expect(resp.body.payload.user.freeShipping).toBe(false)
      expect(resp.body.payload.user.cart).toBeInstanceOf(Array)
      expect(resp.body.payload.user.history).toBeInstanceOf(Array)
      expect(resp.body.payload.token).toBeDefined()
      
  })

  describe('Test login - updatePlus - updatePremium - logout', ()=>{

    let respLogin
    beforeAll(async ()=>{
      respLogin = await request(new Server().getApp()).post('/api/user/auth').send(loginUser)
    })

  it('POST /api/user/auth - login user -', async ()=>{


      expect(respLogin.statusCode).toBe(200)
      expect(respLogin.headers['content-type']).toContain('json')
      expect(respLogin.body.payload.user.email).toBe(loginUser.email)
      expect(respLogin.body.payload.user.name).toBe(newUser.name)
      expect(respLogin.body.payload.user.lastName).toBe(newUser.lastName)
      expect(respLogin.body.payload.user.typeAccount).toBeDefined()
      expect(respLogin.body.payload.user.balance).toBeDefined()
      expect(respLogin.body.payload.user.cart).toBeInstanceOf(Array)
      expect(respLogin.body.payload.user.history).toBeInstanceOf(Array)
      expect(respLogin.body.payload.token).toBeDefined()
  })

  it('PUT /api/user/plus - actualizar user a plus -', async ()=>{

    // const respLogin = await request(new Server().getApp()).post('/api/user/auth').send(loginUser)

    const respUpdate = await request(new Server().getApp()).put('/api/user/plus').set('Cookie', [`token=${respLogin.body.payload.token}`])

    expect(respUpdate.status).toBe(201)
    expect(respUpdate.headers['content-type']).toContain('json')
    expect(respUpdate.body.payload.user.email).toBe(authRegularUser.email)
    expect(respUpdate.body.payload.user.name).toBe(authRegularUser.name)
    expect(respUpdate.body.payload.user.lastName).toBe(authRegularUser.lastName)
    expect(respUpdate.body.payload.user.status).toBe(true)
    expect(respUpdate.body.payload.user.typeAccount).toBe('plus')
    expect(respUpdate.body.payload.user.discount).toBe(0.25)
    expect(respUpdate.body.payload.user.balance).toBe(1500)
    expect(respUpdate.body.payload.user.cart).toBeInstanceOf(Array)
    expect(respUpdate.body.payload.user.history).toBeInstanceOf(Array)
    expect(respUpdate.body.payload.token).toBe(respLogin.body.payload.token)
  })

  it('PUT /api/user/premium - actulizar user a premium -', async ()=>{
    
    // const respLogin = await request(new Server().getApp()).post('/api/user/auth').send(loginUser)
    // console.log(respLogin.body.payload.token)
    const respUpdate = await request(new Server().getApp()).put('/api/user/premium').set('Cookie', [`token=${respLogin.body.payload.token}`])


    expect(respUpdate.status).toBe(201)
    expect(respUpdate.headers['content-type']).toContain('json')
    expect(respUpdate.body.payload.user.email).toBe(authRegularUser.email)
    expect(respUpdate.body.payload.user.name).toBe(authRegularUser.name)
    expect(respUpdate.body.payload.user.lastName).toBe(authRegularUser.lastName)
    expect(respUpdate.body.payload.user.status).toBe(true)
    expect(respUpdate.body.payload.user.typeAccount).toBe('premium')
    expect(respUpdate.body.payload.user.balance).toBe(2500)
    expect(respUpdate.body.payload.user.discount).toBe(0.5)
    expect(respUpdate.body.payload.user.cart).toBeInstanceOf(Array)
    expect(respUpdate.body.payload.user.history).toBeInstanceOf(Array)
    expect(respUpdate.body.payload.token).toBe(respLogin.body.payload.token)

  } )

  it('Logout and clear cookie', async()=>{
    
    const resp = await request(new Server().getApp()).post('/api/user/logout').send()

    expect(resp.statusCode).toBe(200)
    expect(resp.headers['content-type']).toContain('json')
    expect(resp.body.token).toBe(null)
  })

  })


})

