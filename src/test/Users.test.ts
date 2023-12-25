import { connection } from 'mongoose'
import App from '../server'
import request from 'supertest'
import { v1 } from 'uuid'

afterAll(async () => {
  await connection.close()
})
describe('Test Status Code', () => {
  // Closed database after testing
  describe('Authentication Routes', () => {
    const userOptions = {
      _id: '',
      email: `${v1()}@example.com`,
      name: 'Usuario de prueba',
      password: v1(),
      token: ''
    }
    it('Register', async () => {
      const res = await request(App)
        .post('/users/register')
        .send(userOptions)
      expect(res.statusCode).toBe(201)
    })
    it('Login', async () => {
      const res = await request(App)
        .post('/users/login')
        .send(userOptions)
      // Update data of user after login
      userOptions.token = res.body.user.token
      userOptions._id = res.body.user._id
      expect(res.statusCode).toBe(200)
    })
    it('Delete', async () => {
      const res = await request(App)
        .delete(`/users/${userOptions._id}`).set('Authorization', userOptions.token)
      expect(res.statusCode).toBe(200)
    })
  })
})

describe('Test Responses', () => {
  // Closed database after testing
  afterAll(async () => {
    await connection.close()
  })
  describe('Authentication Routes', () => {
    const userOptions = {
      _id: '',
      email: `${v1()}@example.com`,
      name: 'Usuario de prueba',
      password: v1(),
      token: ''
    }
    it('Register', async () => {
      const res = await request(App)
        .post('/users/register')
        .send(userOptions)
      userOptions.token = res.body.user.token
      userOptions._id = res.body.user._id
      expect(res.body.user.name).toBe(userOptions.name)
      expect(res.body.user.email).toBe(userOptions.email)
    })
    it('Login', async () => {
      const res = await request(App)
        .post('/users/login')
        .send(userOptions)
      // Update data of user after login
      expect(res.body.user._id).toBe(userOptions._id)
      expect(res.body.user.name).toBe(userOptions.name)
      expect(res.body.user.email).toBe(userOptions.email)
    })
    it('Delete', async () => {
      const res = await request(App)
        .delete(`/users/${userOptions._id}`).set('Authorization', userOptions.token)
      expect(res.body.user._id).toBe(userOptions._id)
      expect(res.body.user.name).toBe(userOptions.name)
      expect(res.body.user.email).toBe(userOptions.email)
    })
  })
})
