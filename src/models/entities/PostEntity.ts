import mongoose from "mongoose"
import { IPost } from "../interfaces/IUser"

export const PostEntity = () => {
  let schema = new mongoose.Schema<IPost>({
    user: { 
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true ,
    },
    body: { type: 'string', required: true }
  })
  return mongoose.models.posts || mongoose.model<IPost>('posts', schema)
}