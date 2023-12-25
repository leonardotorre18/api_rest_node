import { Router } from 'express'
import SongController from '../controllers/SongController'

const router: Router = Router()
const controller: SongController = new SongController()

router.route('/').get(controller.getSongs)

export default router
