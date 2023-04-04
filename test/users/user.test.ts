import {regiterUser} from '../../src/controllers/user.controller'
import registerRouter from '../../src/routes/user.routes'
import request from 'supertest'

describe('POST /api/register', ()=>{

    // test('deberia responder con codigo 200', ()=>{
        it('responds with json', function(done) {
            request(registerRouter)
              .post('/api/register')
              .send({name: 'john'})
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) return done(err);
                return done();
              });
          });
    // })

})