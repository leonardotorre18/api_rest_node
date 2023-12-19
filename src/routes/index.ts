import express, { type Express } from 'express'
import musicRouter from './music'
import blogRouter from './blog'
import authRouter from './auth'
// import moviesRoute from './movies'
// import formRoute from './form'
// import socialRoute from './social'

const server: Express = express()

server.use('/music', musicRouter)
server.use('/blog', blogRouter)
server.use('/auth', authRouter)
// server.use('/movies', moviesRoute)
// server.use('/form', formRoute);
// server.use('/social', socialRoute)

export default server
