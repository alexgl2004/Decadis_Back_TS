import request from 'supertest'
import app from '../../app';

describe('Users tests', () => {

  test('should return all users', async () => {
    const res = await request(app)
    .get('/users')
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('usersData')
    expect(res.body.usersData.length).toBeGreaterThanOrEqual(1)
  })  

  test('should return user (ID=1)', async () => {
    const res = await request(app)
    .get('/users/1')
//      expect(res.).toEqual(200)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id',1)
  })

  test('should add new user and delete him', async () => {
    const res = await request(app)
    .post('/users/add')
    .send({
      'firstname':'alex',
      'lastname':'GL',
      'email':'test@test.com'
    })

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id')

    const res2 = await request(app)
    .get('/users/'+res.body.id+'/delete')

    expect(res2.statusCode).toEqual(201);
    expect(res2.body).toHaveProperty('id')
  })

})