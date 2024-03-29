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
import fs from 'fs'
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
    const { limit, page } = req.query
    if (
      limit !== undefined && limit != null && typeof limit !== 'object' &&
      page !== undefined && page != null && typeof page !== 'object'
    ) {
      getPosts(parseInt(limit.toString()), parseInt(page.toString()))
        .then((posts: IPost[]) => res.status(200).json({
          posts,
          limit: parseInt(limit),
          page: parseInt(page) > 0 ? parseInt(page) : 1
        }))
        .catch((err) => res.status(500).json({ err }))
    } else {
      getPosts()
        .then((posts: IPost[]) => res.status(200).json({
          posts
        }))
        .catch(() => res.status(500).json({}))
    }
  }

  public addPost (req: Request, res: Response): void {
    // This middleware need be here to handle errors

    LoadImages(req, res, (err) => {
      // Validation errors
      if (err !== undefined) res.status(500).json(err)

      else {
        const title: string = req?.body?.title
        const body: string = req?.body?.body
        const image = req?.file
        const token: string | undefined = req?.headers?.authorization

        if (
          title !== undefined && title != null && title.length >= 10 &&
          body !== undefined && body != null && body.length >= 30 &&
          image !== undefined && image != null &&
          token !== undefined && token != null &&
          image.path !== undefined && image.path != null
        ) {
          cloudinary.uploader.upload(image.path)
            .then((imgLoad) => {
              createPost({
                title,
                body,
                user: 'Is not Necessary',
                img: {
                  url: imgLoad.url,
                  id: imgLoad.public_id
                }
              }, token)
                .then((post: IPost) => {
                  res.status(201).json({ post })
                  // Delete temporal image after save
                  fs.unlinkSync(image.path)
                })
                .catch(() => res.status(403).json({}))
            })
            .catch((err) => res.status(403).json({ err }))
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
      token !== undefined &&
      token !== undefined
    ) {
      deletePost(id, token)
        .then((post) => res.status(200).json({ post }))
        .catch(() => res.status(403).json({}))
    }
  }

  public getPostById (req: Request, res: Response): void {
    const id = req?.params?.id

    if (isValidObjectId(id)) {
      getPostById(id)
        .then((post: IPost) => res.status(200).json({ post }))
        .catch(() => res.status(403).json({}))
    } else res.status(403).json({})
  }

  public getPostsByUser (req: Request, res: Response): void {
    const id = req?.params?.id

    if (isValidObjectId(id)) {
      getPostsByUser(id)
        .then((posts: IPost[]) => res.status(200).json({ posts }))
        .catch(() => res.status(403).json({}))
    } else res.status(403).json({})
  }

  public updatePost (req: Request, res: Response): void {
    // This middleware need be here to handle errors

    LoadImages(req, res, (err) => {
      // Validation errors
      if (err !== undefined) res.status(500).json(err)

      else {
        const title: string | undefined = req?.body?.title
        const body: string | undefined = req?.body?.body
        // const user = req?.body?.user

        const id = req?.params?.id

        const image = req?.file

        const token = req?.headers?.authorization

        console.log(id)

        if (id !== undefined && id != null && token !== undefined && token != null) {
          // Condicional for update image or not
          if (image !== undefined && image != null) {
            // Delete old image if exist new image
            getPostById(id)
              .then((post: IPost) => {
                cloudinary.uploader.destroy(post.img.id)
                  .then((res) => res)
                  .catch(err => err)
              })
              .catch(err => res.status(500).json({ err }))

            // Update post with image
            cloudinary.uploader.upload(image.path)
              .then((imgLoad) => {
                updatePost({
                  title,
                  body,
                  img: {
                    url: imgLoad.url,
                    id: imgLoad.public_id
                  }
                }, id, token)
                  .then((post: IPost) => res.status(200).json({ post }))
                  .catch(() => res.status(403).json({}))
              })
              .catch(() => res.status(403).json({}))
          } else {
            // Update post without image
            updatePost({
              title,
              body
            }, id, token)
              .then((post: IPost) => res.status(200).json({ post }))
              .catch(() => res.status(403).json({}))
          }
        } else res.status(403).json({})
      }
    })
  }
}
