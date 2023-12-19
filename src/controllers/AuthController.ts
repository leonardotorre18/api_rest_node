import { type Request, type Response } from 'express'
import { login, register } from '../models/orm/UserOrm'
import { type IUser } from '../models/interfaces/IUser'

export default class Controller {
  public login (req: Request, res: Response): void {
    const email: string = req?.body?.email.toLowerCase()
    const password: string = req?.body?.password

    if (
      email.length >= 10 &&
      password.length >= 8
    ) {
      login(email, password)
        .then((user: IUser) => res.status(200).json(user))
        .catch(() => res.status(403).json({ error: 'Forbidden' }))
    } else res.status(403).json({ error: 'Forbidden' })
  }

  public register (req: Request, res: Response): void {
    const email: string = req?.body?.email.toLowerCase()
    const password: string = req?.body?.password
    const name: string = req?.body?.name

    if (
      email.length >= 10 &&
      password.length >= 8 &&
      name.length <= 3
    ) {
      register(name, email, password)
        .then((user: IUser) => res.status(201).json(user))
        .catch(() => res.status(403).json({ error: 'Forbidden' }))
    } else res.status(403).json({ error: 'Forbidden' })
  }
}