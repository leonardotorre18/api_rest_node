import { Router, Request, Response, response } from "express";
import SocialController from "../controllers/SocialController";

const controller = new SocialController();

const router: Router = Router();

router.get('/users', async (req: Request, res: Response) => {
  const response = await controller.getUsers();
  res.json(response)
})
router.post('/signin', (req: Request, res: Response) => {
  let { email, password }: { email: string, password: string } = req?.body
  email = email.toLowerCase();

  controller.addUser({email, password})

  res.json({ realizado: ''})
})



export default router
