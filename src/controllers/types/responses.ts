import { type IPost } from '../../models/interfaces/IPost'
import { type IUser } from '../../models/interfaces/IUser'
import { type Music } from '../../models/interfaces/Music'

export interface TUsersResponse {
  status: 200
  users: IUser[]
}
export const usersResponse = (users: IUser[]): TUsersResponse => ({
  status: 200,
  users
})

export interface TUserResponse {
  status: 200
  user: IUser
}
export const userResponse = (user: IUser): TUserResponse => ({
  status: 200,
  user
})

export interface TLoginResponse {
  status: 200
  token: string
  user: IUser
}
export const loginResponse = (token: string, user: IUser): TLoginResponse => ({
  status: 200,
  token,
  user
})

export interface TPostsResponse {
  status: 200
  posts: IPost[]
}
export const postsResponse = (posts: IPost[]): TPostsResponse => ({
  status: 200,
  posts
})

export interface TCustom200Response {
  status: 200
  message: string
}
export const custom200Response = (message: string): TCustom200Response => ({
  status: 200,
  message
})

export interface TCustom403Response {
  status: 403
  message: string
}
export const custom403Response = (message: string): TCustom403Response => ({
  status: 403,
  message
})

export interface T403Response {
  status: 403
  message: string
}
export const forbiddenResponse = (): T403Response => ({
  status: 403,
  message: 'Los parámetros enviados son incorrectos'
})

export interface T401Response {
  status: 401
  message: string
}
export const unauthorizedResponse = (): T401Response => ({
  status: 401,
  message: 'Unauthorized'
})

export interface T500Response {
  status: 500
  message: string
}
export const internalServerErrorResponse = (): T500Response => ({
  status: 500,
  message: 'Internal Server Error'
})

export interface IMusicResponse200 {
  status: 200
  songs: Music[]
}
export const MusicResponse200 = (music: Music[]): IMusicResponse200 => ({
  status: 200,
  songs: music
})
