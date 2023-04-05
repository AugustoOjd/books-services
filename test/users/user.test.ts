// import {regiterUser} from '../controllers/user.controller'
// import { getUsers } from '../../src/controllers/user.controller'
import router from '../../src/routes/user.routes'
// import registerRouter from '../../src/routes/user.routes'
import request from 'supertest'


describe('GET /user', ()=>{
  
  it('Debe responder con status 200', async ()=>{

    const resp = await request(router).get('/api/user').send()
    expect(resp.status).toBe(200)
  })

})

