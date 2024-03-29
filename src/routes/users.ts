import { Router } from 'express'
import Controller from '../controllers/UserController'
import verifyToken from '../middlewares/VerifyToken'

const router: Router = Router()

const controller: Controller = new Controller()

router.post('/login', controller.login)
router.post('/register', controller.register)
router.get('/session', verifyToken, controller.getUserByToken)
router.post('/logout', verifyToken, controller.logout)

router.route('/:id')
  .delete(controller.deleteUser)
  .get(controller.getUserById)

router.route('/')
  .get(controller.getUsers)

export default router
