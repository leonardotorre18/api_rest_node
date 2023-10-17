import { Router, Request, Response } from "express";
import SocialController from "../controllers/SocialController";
import verifyToken from "../middlewares/VerifyToker";
import { TServerResponse } from "../controllers/types";
import { forbiddenResponse, userResponse } from "../controllers/types/responses";
import mongoose from "mongoose";
import { getUserById } from "../models/orm/UserOrm";

const controller = new SocialController();

const router: Router = Router();

router.post('/login', async (req: Request, res: Response) => {
  let email = req?.body?.email;
  let password = req?.body?.password;
  let response: TServerResponse;

  if ( email && password ) {
    response = await controller.login(email, password);
  } else {
    response = forbiddenResponse()
  }

  res.status(response.status).json(response)
})
router.post('/register', async (req: Request, res: Response) => {
  let email = req?.body?.email;
  let password = req?.body?.password;
  let name = req?.body?.name;
  let response: TServerResponse;

  if (email && password && name){
    response = await controller.register({ name, email, password })
  }
  else response = forbiddenResponse()
  
  res.status(response.status).json(response)
})


// busqueda por name y id, tambien agregar follows
router.get('/users', verifyToken, async (req: Request, res: Response) => {
  const response = await controller.getUsers();
  res.status(response.status).json(response)
})
router.get('/users/id/:id_user', verifyToken, async (req: Request, res: Response) => {
  let response: TServerResponse;
  
  // Validation ID
  if(mongoose.Types.ObjectId.isValid(req.params?.id_user)) {

    // Find User
    const id = new mongoose.Types.ObjectId(req.params.id_user);
    const user = await getUserById(id)

    // Validation response
    response = user ?
      userResponse(user)
      : forbiddenResponse()

  } else response = forbiddenResponse()

  res.status(response.status).json(response)

})
router.delete('/users/delete', verifyToken, async (req: Request, res: Response) => {
  const id = req.body.id
  const token = req.headers["authorization"];

  let response: TServerResponse;

  if (mongoose.Types.ObjectId.isValid(id) && token)
    response = await controller.deleteUser(id, token)
  else response = forbiddenResponse()

  res.status(response.status).json(response)
})


router.get('/post', verifyToken, async (req: Request, res: Response) => {
  const response = await controller.getPosts();
  res.status(response.status).json(response)
})
router.post('/post/add', verifyToken, async (req: Request, res: Response) => {
  let id = req?.body?.id;
  let body = req?.body?.body;
  const token = req.headers["authorization"];

  let response: TServerResponse

  if (mongoose.Types.ObjectId.isValid(id) && body && token)
    response = await controller.addPost({user: id, body}, token)
  else response = forbiddenResponse(


  )
  res.status(response.status).json(response)
})
router.delete('/post/delete', verifyToken, async (req: Request, res: Response) => {
  const id = req?.body.id;
  const token = req.headers["authorization"]

  let response: TServerResponse

  if (mongoose.Types.ObjectId.isValid(req?.body.id) && token) {
    response = await controller.deletePost(id, token)
  } else response = forbiddenResponse()

  res.status(response.status).json(response)
})
// Falta ruta para encontrar post de usuarios

export default router
