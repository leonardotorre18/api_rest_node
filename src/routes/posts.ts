import { Router } from 'express'
import { PostController } from '../controllers/PostController'

const router: Router = Router()
const controller: PostController = new PostController()

router.route('/user/:id')
  .get(controller.getPostByUser)

router.route('/:id')
  .get(controller.getPostById)
  .delete(controller.deletePost)
  .put(controller.updatePost)

router.route('/')
  .get(controller.getPost)
  .post(controller.addPost)

export default router
