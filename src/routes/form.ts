import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

interface IResponse {
  validation: boolean,
  response: string,
  message: string
}

router.post('/', (req: Request, res: Response) => {
  const form = req?.body

  res.json({
    response: 'El servidor recibió los datos correctamente',
    body: form
  })

})

router.post('/signin', (req: Request, res: Response) => {
  let { email, password }: { email: string, password: string } = req?.body

  email = email.toLowerCase();

  let response: IResponse = {
    validation: false,
    response: '',
    message: ''
  }

  if (email === 'example@gmail.com' && password === '1234') {
    response = {
      validation: true,
      response: 'Success',
      message: 'Sessión iniciada correctamente'
    }

  } else {
    response = {
      validation: false,
      response: 'Error',
      message: 'Los datos enviados son incorrectos'
    }

  }

  res.json(response)
})

export default router