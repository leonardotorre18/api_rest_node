import express, { type Express } from 'express'
import songRouter from './songs'
import postsRouter from './posts'
import authRouter from './users'
// import moviesRoute from './movies'
// import formRoute from './form'
// import socialRoute from './social'

const server: Express = express()

server.use('/songs', songRouter)
server.use('/posts', postsRouter)
server.use('/users', authRouter)
// server.use('/movies', moviesRoute)
// server.use('/form', formRoute);
// server.use('/social', socialRoute)

export default server
