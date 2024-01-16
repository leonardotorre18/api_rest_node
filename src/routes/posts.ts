import { Router } from 'express'
import { PostController } from '../controllers/PostController'
import verifyToken from '../middlewares/VerifyToken'

const router: Router = Router()
const controller: PostController = new PostController()

router.route('/user/:id')
  .get(controller.getPostsByUser)

router.route('/:id')
  .get(controller.getPostById)
  .delete(verifyToken, controller.deletePost)
  .put(verifyToken, controller.updatePost)

router.route('/')
  .get(controller.getPost)
  .post(verifyToken, controller.addPost)

export default router
