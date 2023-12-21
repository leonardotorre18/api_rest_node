import { type Model, Schema, model, models } from 'mongoose'
import { type IPost } from '../interfaces/IPost'

export const PostEntity = (): Model<IPost> => {
  const schema = new Schema<IPost>({
    user: {
      type: 'string',
      ref: 'users',
      required: true
    },
    imgPath: {
      type: 'string'
    },
    body: { type: 'string', required: true },
    title: { type: 'string', required: true }
  })
  schema.set('timestamps', true)
  return models.posts ?? model<IPost>('posts', schema)
}
