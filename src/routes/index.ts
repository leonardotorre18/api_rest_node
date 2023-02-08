import express, { Express, Request, Response } from "express";
import musicRoute from './music'

const server: Express = express();

server.use('/music', musicRoute)

export default server;