import { IPost } from "../../models/interfaces/IPost";
import { IUser} from "../../models/interfaces/IUser";


export type TUsersResponse = {
  status: 200,
  users: IUser[]
}
export const usersResponse = (users: IUser[]): TUsersResponse => ({
  status: 200,
  users
})

export type TUserResponse = {
  status: 200,
  user: IUser
}
export const userResponse = (user: IUser): TUserResponse => ({
  status: 200,
  user
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

export type TCustom200Response = {
  status: 200,
  message: string
}
export const custom200Response = (message: string): TCustom200Response => ({
  status: 200,
  message
})

export type TCustom403Response = {
  status: 403,
  message: string
}
export const custom403Response = (message: string): TCustom403Response => ({
  status: 403,
  message
})

export type T403Response = {
  status: 403,
  message: string
}
export const forbiddenResponse = (): T403Response => ({
  status: 403,
  message: 'Los parámetros enviados son incorrectos'
})

export type T401Response = {
  status: 401,
  message: string
}
export const unauthorizedResponse = (): T401Response => ({
  status: 401,
  message: 'Unauthorized'
})

export type T500Response = {
  status: 500,
  message: string
}
export const internalServerErrorResponse = (): T500Response => ({
  status: 500,
  message: 'Internal Server Error'
})