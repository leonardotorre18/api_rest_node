import type { Request, Response } from 'express'
import { createPost, deletePost, getPostById, getPosts, getPostsByUser, updatePost } from '../models/orm/PostOrm'
import type { IPost } from '../models/interfaces/IPost'
import { isValidObjectId } from 'mongoose'

export class PostController {
  public getPost (req: Request, res: Response): void {
    getPosts()
      .then((posts: IPost[]) => res.status(200).json(posts))
      .catch(() => res.status(500).json({}))
  }

  public addPost (req: Request, res: Response): void {
    const title: string = req?.body?.title
    const body: string = req?.body?.body
    const user: string = req?.body?.user
    const token: string | undefined = req?.headers?.authorization

    if (
      title !== undefined && title.length >= 10 &&
      body !== undefined && body.length >= 30 &&
      isValidObjectId(user) &&
      token !== undefined
    ) {
      createPost({
        title,
        body,
        user
      }, token)
        .then((post: IPost) => res.status(201).json(post))
        .catch(() => res.status(403).json({}))
    } else res.status(403).json({})
  }

  public deletePost (req: Request, res: Response): void {
    const id = req?.params?.id
    const token: string | undefined = req?.headers?.authorization

    if (
      isValidObjectId(id) &&
      token !== undefined
    ) {
      deletePost(id, token)
        .then((post) => res.status(200).json(post))
        .catch(() => res.status(403).json({}))
    }
  }

  public getPostById (req: Request, res: Response): void {
    const id = req?.params?.id

    if (isValidObjectId(id)) {
      getPostById(id)
        .then((post: IPost) => res.status(200).json(post))
        .catch(() => res.status(403).json({}))
    } else res.status(403).json({})
  }

  public getPostByUser (req: Request, res: Response): void {
    const id = req?.params?.id

    if (isValidObjectId(id)) {
      getPostsByUser(id)
        .then((posts: IPost[]) => res.status(200).json(posts))
        .catch(() => res.status(403).json({}))
    } else res.status(403).json({})
  }

  public updatePost (req: Request, res: Response): void {
    const title: string | undefined = req?.body?.title
    const body: string | undefined = req?.body?.body
    const id = req?.params?.id
    const token = req?.headers?.authorization

    if (id !== undefined && token !== undefined) {
      updatePost({
        title,
        body
      }, id, token)
        .then((post: IPost) => res.status(200).json(post))
        .catch(() => res.status(403).json({}))
    } else res.status(403).json({})
  }
}
