import express, { Express } from "express";
import musicRoute from './music';
import moviesRoute from './movies';
import formRoute from './form';

const server: Express = express();

server.use('/music', musicRoute);
server.use('/movies', moviesRoute);
server.use('/form', formRoute)

export default server;