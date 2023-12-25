import { type Model, Schema, models, model } from 'mongoose'
import { type ISong } from '../interfaces/ISong'

export const MusicEntity = (): Model<ISong> => {
  const schema = new Schema<ISong>({
    title: {
      type: 'string',
      required: true
    },
    author: {
      type: 'string',
      required: true
    },
    album: {
      type: 'string',
      required: true
    },
    path: {
      front: {
        type: 'string',
        required: true
      },
      audio: {
        type: 'string',
        required: true
      }
    }
  })

  return models.musics ?? model<ISong>('musics', schema)
}
