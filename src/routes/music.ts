import { Router } from 'express'
import MusicController from '../controllers/MusicController'

const router: Router = Router()
const controller: MusicController = new MusicController()

router.route('/').get(controller.getSongs)

export default router
