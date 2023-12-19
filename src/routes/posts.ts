import { Router } from 'express'
import { PostController } from '../controllers/PostController'

const router: Router = Router()
const controller: PostController = new PostController()

router.route('/')
  .get(controller.getPost)
  .post(controller.addPost)

export default router
