import { Router } from 'express'
import SongController from '../controllers/SongController'

const router: Router = Router()
const controller: SongController = new SongController()

router.route('/').get(controller.getSongsV2)

export default router
