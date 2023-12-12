import { type Model, Schema, models, model } from 'mongoose'
import { type Music } from '../interfaces/Music'

export const MusicEntity = (): Model<Music> => {
  const schema = new Schema<Music>({
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

  return models.musics ?? model<Music>('musics', schema)
}
