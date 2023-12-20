// import type mongoose from 'mongoose'
import { isValidObjectId, type Model } from 'mongoose'
import { UserEntity } from '../entities/UserEntity'
import { type IUser } from '../interfaces/IUser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const SECRET_KEY_TOKEN: string = process.env.SECRET_KEY_TOKEN ?? ''

export const login = async (email: string, password: string): Promise<IUser> => {
  const model: Model<IUser> = UserEntity()

  const result = await model.findOne({ email })

  if (result != null && bcrypt.compareSync(password, result.password)) {
    const session = await model.findOneAndUpdate({ email }, { token: jwt.sign({ email }, SECRET_KEY_TOKEN) }, { new: true })
    if (session == null) throw new Error()

    return session
  }
  throw new Error()
}

export const logout = async (token: string): Promise<string> => {
  const model = UserEntity()
  await model.updateOne({ token }, { token: jwt.sign({ }, SECRET_KEY_TOKEN) })
  return token
}

export const register = async (name: string, email: string, password: string): Promise<IUser> => {
  const model: Model<IUser> = UserEntity()

  const result = await model.findOne({ email })

  if (result != null) throw new Error('Usuario registrado con ese correo')

  const register = await model.create({
    name,
    email,
    password: bcrypt.hashSync(password, 8),
    token: jwt.sign({ email }, SECRET_KEY_TOKEN)
  })

  return register
}

export const getUsers = async (): Promise<IUser[]> => {
  const model = UserEntity()

  return await model.find({}, { _id: 1, name: 1, email: 1 })
}

export const deleteUser = async (id: string, token: string): Promise<IUser> => {
  if (!isValidObjectId(id)) throw new Error()
  const model = UserEntity()

  const user = await model.findOneAndDelete({ _id: id, token })

  if (user == null) throw new Error()

  return user
}

export const getUserByToken = async (token: string): Promise<IUser> => {
  const model = UserEntity()
  const user = await model.findOne({ token })

  if (user == null) throw new Error()

  return user
}

// export const getUsers = async (): Promise<IUser[]> => {
//   const model = UserEntity()
//   return await model.aggregate([
//     { $match: {} },
//     { $project: { password: 0, token: 0 } }
//   ])
// }

// export const getUserByEmail = async (email: string): Promise<IUser | null> => {
//   const model = UserEntity()
//   return await model.findOne({
//     email
//   }, { token: 0 })
// }

export const getUserById = async (id: string): Promise<IUser> => {
  if (!isValidObjectId(id)) throw new Error()
  const model = UserEntity()
  const result = await model.findById(id, { _id: 1, email: 1, name: 1 })

  if (result == null) throw new Error()
  else return result
}
