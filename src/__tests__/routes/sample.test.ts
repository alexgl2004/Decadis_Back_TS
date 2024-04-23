import express from 'express';
import bodyParser from 'body-parser';
import router from '../../routes/users';
import { getUsers } from '../../handlers/users';
import request from 'supertest';

import app from '../../app';

jest.mock('../../handlers/users');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Check get users', () => {
  let expectedMessage = '';

  it('Checking for receiving users', async () => {
    
    expectedMessage = 'Receiving now tested';
    (getUsers as jest.Mock).mockImplementation(async (req, res) => {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaa')
        res.status(200).send(expectedMessage);
    });

    const response = await request(app).get('/users').send();
    expect(response.status).toBe(200);
    expect(response.body).toBe(expectedMessage);

  });

});