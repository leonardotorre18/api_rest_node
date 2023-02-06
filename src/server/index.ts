import express, { Express, Request, Response } from "express";

const server: Express = express();

server.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Application is running' })
})

export default server;