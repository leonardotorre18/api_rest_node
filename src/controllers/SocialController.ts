import mongoose from "mongoose";
import { IRegister, IUser } from "../models/interfaces/IUser";
import {
  addPost,
  deletePost,
  getPosts
} from "../models/orm/PostOrm";
import {
  addUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUsers
} from "../models/orm/UserOrm";
import { TServerResponse } from "./types";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { 
  custom200Response,
  custom403Response,
  forbiddenResponse,
  loginResponse, 
  postsResponse, 
  userResponse, 
  usersResponse 
} from "./types/responses";
import { getSession, getUserByTokenAndId, loginToken, refreshSession, removeToken } from "../models/orm/AuthOrm";
import { IPost } from "../models/interfaces/IPost";


dotenv.config();

const secret = process.env.SECRET_KEY_TOKEN || '';

export default class SocialController {

  public async login (email: string, password: string): Promise<TServerResponse> {

    // LowerCase Email
    email = email.toLowerCase();

    // Validation Email
    const userByEmail = await getUserByEmail(email)
    if (!userByEmail) return custom403Response('El correo no es correcto')

    // Validation Password
    if ( ! bcrypt.compareSync(password, userByEmail.password)) 
    
    return custom403Response('La contraseña no es correcta')

    // Create Token
    const token = jwt.sign({ email, password }, secret, {
      expiresIn: "2h" 
    });

    // save login session
    await loginToken(userByEmail._id ,token)

    // Response
    return loginResponse(token, userByEmail)
  }

  public async register (newUser: IRegister): Promise<TServerResponse> {

    // Lower Case Email
    newUser.email = newUser.email.toLowerCase()

    // Hashed Password
    newUser.password = bcrypt.hashSync(newUser.password, 8)
    
    // Validation Email in use
    const userRegister = await getUserByEmail(newUser.email)
    if (userRegister) return custom403Response('El correo ya se encuentra registrado')
    
    // Register User
    const userAdded = await addUser(newUser)

    // Create token
    const token = jwt.sign({ email: newUser.email }, secret, {
      expiresIn: "2h" 
    });

    // Save Token
    await loginToken(userAdded._id, token)

    // Response
    return loginResponse(token, userAdded)
  }

  public async logout ( token: string ): Promise<TServerResponse> {
    const response = await removeToken(token)
    return response ? 
      custom200Response('Sesión cerrada Exitosamente')
      : forbiddenResponse()
  }

  public async mySession (token: string): Promise<TServerResponse> {
    const response = await getSession(token)
    
    return response ?
      userResponse(response)
      : forbiddenResponse()
  }

  public async refreshSession (token: string): Promise<TServerResponse> {
    const response = await refreshSession(token)

    return response ?
      userResponse(response)
      : forbiddenResponse()
  }

  public async getUsers (): Promise<TServerResponse> {
    const users = await getUsers()
    return usersResponse(users)
  }

  public async deleteUser (id: mongoose.Types.ObjectId, token: string): Promise<TServerResponse> {
    const response = await deleteUser(id, token)
    return response ? 
      custom200Response('Usuario Eliminado')
      : forbiddenResponse()
  }

  public async getUserById (id: mongoose.Types.ObjectId): Promise<TServerResponse> {
    const user = await getUserById(id)
    return user ?
      userResponse(user)
      : forbiddenResponse()

  }

  public async getPosts (): Promise<TServerResponse> {
    const posts = await getPosts()
    return postsResponse(posts)
  }

  public async addPost ({ body, user }: IPost, token: string): Promise<TServerResponse> {
    const userValid = await getUserByTokenAndId(user, token)
    if (!userValid) return forbiddenResponse()

    await addPost({ body, user })
    return custom200Response('Post agregado Correctamente')
  }

  public async deletePost (id: mongoose.Types.ObjectId, token: string): Promise<TServerResponse> {

    // Delete Post
    const response = await deletePost(id, token)

    return response ? 
      custom200Response('Post eliminado')
      : forbiddenResponse()
  }
}