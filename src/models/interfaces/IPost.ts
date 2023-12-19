import { type ObjectId } from 'mongoose'

export interface IPost {
  title: string
  body: string
  user: ObjectId
}
