import { connection } from 'mongoose'
import App from '../server'
import request from 'supertest'
describe('Test Status Code', () => {
  // Closed database after testing
  afterAll(async () => {
    await connection.close()
  })

  it('Route Home', async () => {
    const res = await request(App).get('')
    expect(res.statusCode).toBe(200)
  })

  describe('Songs Routes', () => {
    it('Get all Songs', async () => {
      const res = await request(App).get('/songs')
      expect(res.statusCode).toBe(200)
    })
  })

  describe('Post Routes', () => {
    it('Get All Post', async () => {
      const res = await request(App).get('/posts')
      expect(res.statusCode).toBe(200)
    })
    it('Get All Post with limit and pagination', async () => {
      const res = await request(App).get('/posts?limit=6&page=1')
      expect(res.statusCode).toBe(200)
    })
  })
})
