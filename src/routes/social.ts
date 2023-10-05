import { Router, Request, Response, response, request } from "express";
import SocialController from "../controllers/SocialController";
import { IPost, IUser } from "../models/interfaces/IUser";
import verifyToken from "../middlewares/VerifyToker";

const controller = new SocialController();

const router: Router = Router();

router.get('/users', verifyToken, async (req: Request, res: Response) => {
  const response = await controller.getUsers();
  res.json(response)
})

router.post('/register', async (req: Request, res: Response) => {
  const { email, password }: IUser = req?.body
  const response = await controller.register({email, password })
  res.json(response)
})

router.delete('/delete', verifyToken, async (req: Request, res: Response) => {
  let { id }: { id: string } = req?.body
  const response = await controller.deleteUser(id)
  res.json(response)
})

router.post('/login', async (req: Request, res: Response) => {
  let { email, password }: { email: string, password: string } = req?.body
  const response = await controller.login({email, password})
  res.json(response)
})

router.get('/post', verifyToken, async (req: Request, res: Response) => {
  const response = await controller.getPosts();
  res.json(response)
})

router.post('/post/add', verifyToken, async (req: Request, res: Response) => {
  const { id, body } = req?.body;
  const response = await controller.addPost({id, body})
  res.json(response)
})

router.delete('/post/delete', verifyToken, async (req: Request, res: Response) => {
  const { id } = req?.body;
  const response = await controller.deletePost(id)
  res.json(response)
})

export default router
