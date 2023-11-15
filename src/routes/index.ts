import express from 'express'
import musicRoute from './music'
// import moviesRoute from './movies'
// import formRoute from './form'
import cinemaRouter from './cinema'
// import socialRoute from './social'

const server: express.Express = express()

server.use('/music', musicRoute)
// server.use('/movies', moviesRoute)
server.use('/cinema', cinemaRouter)
// server.use('/form', formRoute);
// server.use('/social', socialRoute)

export default server
