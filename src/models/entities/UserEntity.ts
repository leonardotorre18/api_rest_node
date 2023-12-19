import mongoose, { type Model } from 'mongoose'
import { type IUser } from '../interfaces/IUser'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const SECRET_KEY_TOKEN: string = process.env.SECRET_KEY_TOKEN ?? ''

export const UserEntity = (): Model<IUser> => {
  const schema = new mongoose.Schema<IUser>({
    name: {
      type: 'string', required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string', required: true
    },
    token: {
      type: 'string',
      unique: true,
      default: jwt.sign({}, SECRET_KEY_TOKEN)
    }
  })
  return mongoose.models.users ?? mongoose.model<IUser>('users', schema)
}
