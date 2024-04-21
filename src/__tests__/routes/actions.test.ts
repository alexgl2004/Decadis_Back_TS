import request from 'supertest'
import app from '../../app';

describe('Actions tests', () => {
  
  test('should return all actions', async () => {
    const res = await request(app)
    .get('/actions')
    expect(res.statusCode).toEqual(200);
    expect(res.body).toContainEqual({
           "id": 1,
           "name": "Move Item",
         })
  })  

  test('should return all active actions of user', async () => {
    const res = await request(app)
    .get('/actions/user/1')
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0)
  })  

})