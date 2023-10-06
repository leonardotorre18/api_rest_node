import { Router, Request, Response, json } from "express";
import SocialController from "../controllers/SocialController";
import { IUser } from "../models/interfaces/IUser";
import verifyToken from "../middlewares/VerifyToker";
import { TServerResponse } from "../controllers/types";
import { badRequestResponse } from "../controllers/types/responses";

const controller = new SocialController();

const router: Router = Router();

router.post('/login', async (req: Request, res: Response) => {
  let email = req?.body?.email;
  let password = req?.body?.password;
  let response: TServerResponse;

  if ( email && password ) {
    response = await controller.login(email, password);
  } else {
    response = badRequestResponse()
  }

  res.status(response.status).json(response)
})
// Deber redireccionar al login luego del registro
router.post('/register', async (req: Request, res: Response) => {
  let email = req?.body?.email;
  let password = req?.body?.password;

  const response = await controller.register({email, password })
  res.json(response)
})


// busqueda por name y id, tambien agregar follows
router.get('/users', verifyToken, async (req: Request, res: Response) => {
  const response = await controller.getUsers();
  res.status(response.status).json(response)
})
// Debe recibir tambien la password
router.delete('/users/delete', verifyToken, async (req: Request, res: Response) => {
  let { id }: { id: string } = req?.body
  const response = await controller.deleteUser(id)
  res.json(response)
})
// Ruta para información personal por id


router.get('/post', verifyToken, async (req: Request, res: Response) => {
  const response = await controller.getPosts();
  res.json(response)
})
router.post('/post/add', verifyToken, async (req: Request, res: Response) => {
  let id = req?.body?.id;
  let body = req?.body?.body;

  const response = await controller.addPost({id, body})
  res.status(response.status).json(response)
})
// Debe recibir el id y el token
router.delete('/post/delete', verifyToken, async (req: Request, res: Response) => {
  const { id } = req?.body;
  const response = await controller.deletePost(id)
  res.json(response)
})

// Falta ruta para encontrar post de usuarios

export default router
