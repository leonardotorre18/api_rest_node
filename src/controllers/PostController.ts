import type { Request, Response } from 'express'
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  getPostsByUser,
  updatePost
} from '../models/orm/PostOrm'
import type { IPost } from '../models/interfaces/IPost'
import { isValidObjectId } from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'
import LoadImages from '../middlewares/LoadImages'
import dotenv from 'dotenv'
dotenv.config()

const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? ''
const apiKey = process.env.CLOUDINARY_API_KEY ?? ''
const apiSecret = process.env.CLOUDINARY_API_SECRET ?? ''

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
})

export class PostController {
  public getPost (req: Request, res: Response): void {
    getPosts()
      .then((posts: IPost[]) => res.status(200).json(posts))
      .catch(() => res.status(500).json({}))
  }

  public addPost (req: Request, res: Response): void {
    // This middleware need be here to handle errors

    LoadImages(req, res, (err) => {
      if (err !== undefined) res.status(500).json(err)

      else {
        const title: string = req?.body?.title
        const body: string = req?.body?.body
        const user: string = req?.body?.user
        const image = req?.file
        const token: string | undefined = req?.headers?.authorization

        if (
          title !== undefined && title.length >= 10 &&
          body !== undefined && body.length >= 30 &&
          image !== undefined &&
          isValidObjectId(user) &&
          token !== undefined
        ) {
          if (image?.path !== undefined) {
            cloudinary.uploader.upload(image.path)
              .then((imgLoad) => {
                createPost({
                  title,
                  body,
                  user,
                  imgPath: imgLoad.url
                }, token)
                  .then((post: IPost) => res.status(201).json(post))
                  .catch(() => res.status(403).json({}))
              })
              .catch((err) => { console.log(err); return err })
          }
        } else res.status(403).json({})
      }
      // Everything went fine and save document in DB here.
    })
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
