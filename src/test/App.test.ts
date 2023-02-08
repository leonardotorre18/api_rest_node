import App from '../server'
import request from 'supertest';

describe('Server is running', () => {
  test('Music Endpoint', async () => {
    const response = await request(App).get('/music').send()
    expect(response.statusCode).toBe(200)
  })
})
