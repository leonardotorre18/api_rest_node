import express, { type Express } from 'express'
import songRouter from './songs'
import postsRouter from './posts'
import authRouter from './users'
import MusicController from '../controllers/MusicController'

const server: Express = express()

const musicRoutes = new MusicController()
server.get('/music', musicRoutes.getSongs)

server.use('/songs', songRouter)
server.use('/posts', postsRouter)
server.use('/users', authRouter)

export default server
