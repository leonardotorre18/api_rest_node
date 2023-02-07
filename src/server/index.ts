import express, { Express } from "express";
import routes from "../routes";
import cors from 'cors';
import path from 'path'

const app: Express = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);

export default app;