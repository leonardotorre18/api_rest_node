import mongoose, { type Model } from 'mongoose'
import { type IPost } from '../interfaces/IPost'

export const PostEntity = (): Model<IPost> => {
  const schema = new mongoose.Schema<IPost>({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    body: { type: 'string', required: true }
  })
  schema.set('timestamps', true)
  return mongoose.models.posts ?? mongoose.model<IPost>('posts', schema)
}
