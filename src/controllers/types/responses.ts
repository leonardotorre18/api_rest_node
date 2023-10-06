import { IPost, IUser } from "../../models/interfaces/IUser";


export type TUsersResponse = {
  status: 200,
  users: IUser[]
}
export const usersResponse = (users: IUser[]): TUsersResponse => ({
  status: 200,
  users
})

export type TLoginResponse = {
  status: 200,
  token: string,
  user: IUser
}
export const loginResponse = (token: string, user: IUser): TLoginResponse => ({
  status: 200,
  token,
  user
})

export type TPostsResponse = {
  status: 200,
  posts: IPost[]
}
export const postsResponse = (posts: IPost[]): TPostsResponse => ({
  status: 200,
  posts
})

export type TCustomResponse = {
  status: 200,
  message: string
}
export const customResponse = (message: string): TCustomResponse => ({
  status: 200,
  message
})

export type TCustomErrorResponse = {
  status: 400,
  message: string
}
export const customErrorResponse = (message: string): TCustomErrorResponse => ({
  status: 400,
  message
})

export type TBadRequestResponse = {
  status: 400,
  message: string
}
export const badRequestResponse = (): TBadRequestResponse => ({
  status: 400,
  message: 'Bad Request'
})

export type TUnauthorizedResponse = {
  status: 401,
  message: string
}
export const unauthorizedResponse = (): TUnauthorizedResponse => ({
  status: 401,
  message: 'Unauthorized'
})

export type TInternalServerErrorResponse = {
  status: 500,
  message: string
}
export const internalServerErrorResponse = (): TInternalServerErrorResponse => ({
  status: 500,
  message: 'Internal Server Error'
})