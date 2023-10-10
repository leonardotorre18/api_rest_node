import express, { Express } from "express";
import routes from "../routes";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import morgan from "morgan";

dotenv.config();

const app: Express = express();

mongoose.connect(process.env.DATABASE_URL || '')

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/', routes);

export default app;