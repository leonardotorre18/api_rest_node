import { type Request, type Response, Router } from 'express'
import MusicController from '../controllers/MusicController'
import { type TServerResponse } from '../controllers/types'
import { internalServerErrorResponse } from '../controllers/types/responses'

const router: Router = Router()
const controller: MusicController = new MusicController()

router.get('/', (req: Request, res: Response) => {
  controller.getAllData().then((response) => {
    res.status(response.status).json(response)
  }).catch(() => {
    const response: TServerResponse = internalServerErrorResponse()
    res.status(response.status).json(response)
  })
})

export default router
