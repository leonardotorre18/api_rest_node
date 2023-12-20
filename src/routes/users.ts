import { Router } from 'express'
import Controller from '../controllers/UserController'

const router: Router = Router()

const controller: Controller = new Controller()

router.post('/login', controller.login)
router.post('/register', controller.register)
router.get('/session', controller.getUserByToken)
router.post('/logout', controller.logout)

router.route('/:id')
  .delete(controller.deleteUser)
  .get(controller.getUserById)

router.route('/')
  .get(controller.getUsers)

export default router
