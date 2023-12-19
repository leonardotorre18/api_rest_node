import express, { type Express } from 'express'
import musicRouter from './music'
import postsRouter from './posts'
import authRouter from './auth'
// import moviesRoute from './movies'
// import formRoute from './form'
// import socialRoute from './social'

const server: Express = express()

server.use('/music', musicRouter)
server.use('/posts', postsRouter)
server.use('/auth', authRouter)
// server.use('/movies', moviesRoute)
// server.use('/form', formRoute);
// server.use('/social', socialRoute)

export default server
