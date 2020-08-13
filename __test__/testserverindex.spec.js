const app = require('../src/server/index'); // Link to your server file
const request = require('supertest');

test('test the path', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200)
    // expect(response.body.message).toBe('pass!')
  });