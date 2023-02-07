import express, { Request, Response, Router } from "express";
import data from '../json/music.json';

const router: Router = express.Router()

router.route('/')
  .get((req: Request, res: Response) => {
    res.json(data).status(200)
  })

export default router