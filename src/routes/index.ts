import express, { Express, Request, Response } from "express";
import musicRoute from './music'

const server: Express = express();

server.use('/music', musicRoute)

// Redirection
server.get('*', (req: Request, res: Response) => {
  res.redirect('/music')
})

export default server;