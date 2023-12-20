import { type Request, type Response } from 'express'
import { deleteUser, getUserById, getUsers, login, register } from '../models/orm/UserOrm'
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
      email !== undefined && email.length >= 10 &&
      password !== undefined && password.length >= 8 &&
      name !== undefined && name.length >= 3
    ) {
      register(name, email, password)
        .then((user: IUser) => res.status(201).json(user))
        .catch(() => res.status(403).json({ error: 'Forbidden' }))
    } else res.status(403).json({ error: 'Forbidden' })
  }

  public getUsers (req: Request, res: Response): void {
    getUsers()
      .then((users: IUser[]) => res.status(200).json(users))
      .catch(() => res.status(403).json({}))
  }

  public deleteUser (req: Request, res: Response): void {
    const id = req?.params?.id
    const token = req?.headers?.authorization

    if (id != null && token != null) {
      deleteUser(id, token)
        .then((user: IUser) => res.status(200).json(user))
        .catch(() => res.status(403).json({}))
    } else res.status(403).json({})
  }

  public getUserById (req: Request, res: Response): void {
    const id = req?.params?.id

    if (id != null) {
      getUserById(id)
        .then((user: IUser) => res.status(200).json(user))
        .catch(() => res.status(403).json({}))
    } else res.status(403).json({})
  }
}
