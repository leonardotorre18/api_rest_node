import { type Model, Schema, model, models } from 'mongoose'
import { type IPost } from '../interfaces/IPost'

export const PostEntity = (): Model<IPost> => {
  const schema = new Schema<IPost>({
    user: {
      type: 'string',
      ref: 'users',
      required: true
    },
    img: {
      url: {
        type: 'string',
        required: true
      },
      id: {
        type: 'string',
        required: true
      }
    },
    body: { type: 'string', required: true },
    title: { type: 'string', required: true }
  })
  schema.set('timestamps', true)
  return models.posts ?? model<IPost>('posts', schema)
}
