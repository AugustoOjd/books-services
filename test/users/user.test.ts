// import {regiterUser} from '../controllers/user.controller'
// import { getUsers } from '../../src/controllers/user.controller'
import router from '../../src/routes/user.routes'
// import registerRouter from '../../src/routes/user.routes'
import request from 'supertest'
import Server from '../../src/models/server';


describe('GET /user', ()=>{

  let resp;
  beforeEach( async ()=>{
    resp = await request(new Server().app).get('/api/user').send()
  })
  
  it('Debe responder con status 200', async ()=>{
    expect(resp.status).toBe(200)
  })

})

