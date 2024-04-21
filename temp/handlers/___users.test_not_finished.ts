import express from 'express';
import bodyParser from 'body-parser';
import router from '../../routes/users';
import { getUsers } from '../../handlers/users';
import request from 'supertest';

const app = express();
app.use(bodyParser.json());
app.use(router);

jest.mock('../../handlers/users');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Check get users', () => {
  let expectedMessage = '';

  it('Checking for receiving users', async () => {
    expectedMessage = 'Receiving now tested';
    (getUsers as jest.Mock).mockImplementation((req, res) => {
      res.status(200).send(expectedMessage);
    });

    const response = await request(app).get('/users').send();
    expect(response.status).toBe(200);
    expect(response.body).toBe(expectedMessage);
  });
});