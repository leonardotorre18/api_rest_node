import mongoose from "mongoose"
import { IUser } from "../interfaces/IUser"

export const UserEntity = () => {
  let schema = new mongoose.Schema<IUser>({
    name: {
      type: 'string', required: true
    },
    email: {
      type: 'string', 
      required: true,
      unique: true,
    },
    password: {
      type: 'string', required: true
    },
    token: {
      type: 'string',
      unique: true,
      default: ''
    }
  })
  return mongoose.models.users || mongoose.model<IUser>('users', schema)
}