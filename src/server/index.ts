import express, { Express } from "express";
import routes from "../routes";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

mongoose.connect(process.env.DATABASE_URL || '')

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', routes);

export default app;