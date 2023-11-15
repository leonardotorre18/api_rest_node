import type mongoose from 'mongoose'

export interface IPost {
  body: string
  user: mongoose.Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
}
