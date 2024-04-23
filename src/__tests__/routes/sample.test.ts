import request from 'supertest';
import app from '../../app';
import { getUsers } from '../../handlers/users';

jest.mock('../../handlers/users');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Check get users', () => {
  let expectedMessage = '';

  it('Checking for receiving users', async () => {
    
    expectedMessage = 'Receiving now tested';
    (getUsers as jest.Mock).mockImplementation(async (req, res) => {
        res.status(200).send(expectedMessage);
    });

    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.text).toBe(expectedMessage);

  });

});