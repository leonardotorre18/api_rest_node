import { type ObjectId } from 'mongoose'

export interface Music {
  _id: ObjectId
  title: string
  author: string
  album: string
  duration: string
  path: {
    audio: string
    front: string
  }
}
