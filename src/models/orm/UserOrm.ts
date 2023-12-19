// import type mongoose from 'mongoose'
import { type Model } from 'mongoose'
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

  if (result != null && bcrypt.compareSync(password, result.password)) return result

  throw new Error()
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

// export const deleteUser = async (id: mongoose.Types.ObjectId, token: string): Promise<boolean> => {
//   const model = UserEntity()
//   const response = await model.deleteOne({ _id: id, token })

//   if (response.deletedCount) {
//     await PostEntity().deleteMany({ user: id })
//     return true
//   } else return false
// }

// export const getUserById = async (id: mongoose.Types.ObjectId): Promise<IUser | null> => {
//   const model = UserEntity()
//   return await model.findById(id, { password: 0, token: 0 })
// }
