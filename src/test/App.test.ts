import App from '../server'
import request from 'supertest';

test('Server is running', async () => {
  const response = await request(App).get('/').send()
  expect(response.statusCode).toBe(200)
})