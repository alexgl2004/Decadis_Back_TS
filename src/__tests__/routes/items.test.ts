import request from 'supertest'
import app from '../../app';

describe('Items tests', () => {

  test('should return all Items', async () => {
    const res = await request(app)
    .get('/')
    expect(res.statusCode).toEqual(200);
//    expect(res.body.length).toBeGreaterThanOrEqual(0)
  })

  test('should return all positions', async () => {
    const res = await request(app)
    .get('/items/positions')
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1)
  })

  test('should return item "Chairs" of user (ID=1) if user have rights', async () => {
    const res = await request(app)
    .post('/items/1')
    .send({'user_id':1})
//      expect(res.).toEqual(200)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id',1)
  })

  test('should move item "Chairs" of user (ID=1) to position=2 if user have rights', async () => {
    const res = await request(app)
    .post('/items/1/move')
    .send({'user_id':1,'position_id':2})
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id',1)
  })

  test('should delete item named "Test Table" for user (ID=1) if user have rights', async () => {
    const res = await request(app)
    .post('/items/8/delete')
    .send({'user_id':1,'byName':'Test Table'})
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id',8)
  })
  
  test('should add new item and delete it for user (ID=1) if user have rights', async () => {
    const res = await request(app)
    .post('/items/add')
    .send({
      'user_id':1,
      'name':'Test Table',
      'text':'Test Table Text'
    })

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id')

    const res2 = await request(app)
    .post('/items/'+res.body.id+'/delete')
    .send({'user_id':1})

    expect(res2.statusCode).toEqual(201);
    expect(res2.body).toHaveProperty('id')

  })

})