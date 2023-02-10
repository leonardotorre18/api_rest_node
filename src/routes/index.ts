import express, { Express } from "express";
import musicRoute from './music';
import moviesRoute from './movies'

const server: Express = express();

server.use('/music', musicRoute);
server.use('/movies', moviesRoute);

export default server;