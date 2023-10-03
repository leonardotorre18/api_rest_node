import express, { Request, Response, Router } from "express";
import musicController from "../controllers/MusicController";

const router: Router = express.Router()
const controller: any = new musicController()

router.route('/')
  .get((req: Request, res: Response) => {
    const { id } = req?.query;
    let data = [];

    if (id) data = controller.getDataById(id)
    else data = controller.getAllData()

    res.json(data).status(200)
  })

export default router;