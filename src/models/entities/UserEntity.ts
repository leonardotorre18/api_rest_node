import mongoose from "mongoose"
import { IUser } from "../interfaces/IUser"

export const UserEntity = () => {
  let schema = new mongoose.Schema<IUser>({
    email: {
      type: 'string', required: true,
    },
    password: {
      type: 'string', required: true
    }
  })
  return mongoose.models.users || mongoose.model<IUser>('users', schema)
}