import type { Request, Response } from 'express'
import { createPost, getPosts } from '../models/orm/PostOrm'
import type { IPost } from '../models/interfaces/IPost'
import { type ObjectId, isValidObjectId } from 'mongoose'

export class PostController {
  public getPost (req: Request, res: Response): void {
    getPosts()
      .then((posts: IPost[]) => res.status(200).json(posts))
      .catch(() => res.status(500).json({}))
  }

  public addPost (req: Request, res: Response): void {
    const title: string = req?.body?.title
    const body: string = req?.body?.body
    const user: ObjectId = req?.body?.user

    if (
      title !== undefined && title.length >= 10 &&
      body !== undefined && body.length >= 30 &&
      isValidObjectId(user)
    ) {
      createPost({
        title,
        body,
        user
      })
        .then((post: IPost) => res.status(201).json(post))
        .catch(() => res.status(403).json({}))
    } else res.status(403).json({})
  }
}
