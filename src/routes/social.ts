import { Router, Request, Response, response, request } from "express";
import SocialController from "../controllers/SocialController";
import { IPost, IUser } from "../models/interfaces/IUser";

const controller = new SocialController();

const router: Router = Router();

router.get('/users', async (req: Request, res: Response) => {
  const response = await controller.getUsers();
  res.json(response)
})

router.post('/register', async (req: Request, res: Response) => {
  const { email, password }: IUser = req?.body
  const response = await controller.register({email, password })
  res.json(response)
})

router.delete('/delete', async (req: Request, res: Response) => {
  let { id }: { id: string } = req?.body
  const response = await controller.deleteUser(id)
  res.json(response)
})

router.post('/login', async (req: Request, res: Response) => {
  let { email, password }: { email: string, password: string } = req?.body
  const response = await controller.login({email, password})
  res.json(response)
})

router.get('/post', async (req: Request, res: Response) => {
  const response = await controller.getPosts();
  res.json(response)
})

router.post('/post/add', async (req: Request, res: Response) => {
  const { id, body } = req?.body;
  const response = await controller.addPost({id, body})
  res.json(response)
})

router.delete('/post/delete', async (req: Request, res: Response) => {
  const { id } = req?.body;
  const response = await controller.deletePost(id)
  res.json(response)
})

export default router
