import type mongoose from 'mongoose'
import { type IRegister } from '../models/interfaces/IUser'
import {
  addPost,
  deletePost,
  getPosts
} from '../models/orm/PostOrm'
import {
  addUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUsers
} from '../models/orm/UserOrm'
import { type TServerResponse } from './types'
import {
  custom200Response,
  custom403Response,
  forbiddenResponse,
  loginResponse,
  postsResponse,
  userResponse,
  usersResponse
} from './types/responses'
import { getSession, getUserByTokenAndId, refreshSession, removeToken } from '../models/orm/AuthOrm'
import { type IPost } from '../models/interfaces/IPost'

export default class SocialController {
  public async logout (token: string): Promise<TServerResponse> {
    const response = await removeToken(token)
    return response
      ? custom200Response('Sesión cerrada Exitosamente')
      : forbiddenResponse()
  }

  public async mySession (token: string): Promise<TServerResponse> {
    const response = await getSession(token)

    return (response != null)
      ? userResponse(response)
      : forbiddenResponse()
  }

  public async refreshSession (token: string): Promise<TServerResponse> {
    const response = await refreshSession(token)

    return (response != null)
      ? userResponse(response)
      : forbiddenResponse()
  }

  public async getUsers (): Promise<TServerResponse> {
    const users = await getUsers()
    return usersResponse(users)
  }

  public async deleteUser (id: mongoose.Types.ObjectId, token: string): Promise<TServerResponse> {
    const response = await deleteUser(id, token)
    return response
      ? custom200Response('Usuario Eliminado')
      : forbiddenResponse()
  }

  public async getUserById (id: mongoose.Types.ObjectId): Promise<TServerResponse> {
    const user = await getUserById(id)
    return (user != null)
      ? userResponse(user)
      : forbiddenResponse()
  }

  public async getPosts (): Promise<TServerResponse> {
    const posts = await getPosts()
    return postsResponse(posts)
  }

  public async addPost ({ body, user }: IPost, token: string): Promise<TServerResponse> {
    const userValid = await getUserByTokenAndId(user, token)
    if (userValid == null) return forbiddenResponse()

    await addPost({ body, user })
    return custom200Response('Post agregado Correctamente')
  }

  public async deletePost (id: mongoose.Types.ObjectId, token: string): Promise<TServerResponse> {
    // Delete Post
    const response = await deletePost(id, token)

    return response
      ? custom200Response('Post eliminado')
      : forbiddenResponse()
  }
}
