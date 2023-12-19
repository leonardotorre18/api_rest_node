import { type Request, type Response, Router } from 'express'
import data from '../json/movies.json'

const router: Router = Router()

router.route('/')
  .get((req: Request, res: Response) => {
    res.json(data).status(200)
  })

export default router
