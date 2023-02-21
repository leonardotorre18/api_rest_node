import express, { Express } from "express";
import routes from "../routes";
import cors from 'cors';

const app: Express = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', routes);

export default app;