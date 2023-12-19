import { Router } from 'express'
import Controller from '../controllers/AuthController'

const router: Router = Router()

const controller: Controller = new Controller()

router.post('/login', controller.login)
router.post('/register', controller.register)

export default router
