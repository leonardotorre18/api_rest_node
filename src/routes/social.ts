import { Router, Request, Response, response } from "express";
import SocialController from "../controllers/SocialController";

const controller = new SocialController();

const router: Router = Router();

router.get('/users', async (req: Request, res: Response) => {
  const response = await controller.getUsers();
  res.json(response)
})
router.post('/register', async (req: Request, res: Response) => {
  let { email, password }: { email: string, password: string } = req?.body
  const response = await controller.addUser({email, password})
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



export default router
