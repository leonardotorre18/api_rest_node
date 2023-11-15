import { type Router, type Request, type Response } from 'express'
import express from 'express'

const router: Router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Server is running')
})

export default router
