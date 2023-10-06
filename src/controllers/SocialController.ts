import mongoose from "mongoose";
import { IPost, IUser } from "../models/interfaces/IUser";
import { addPost, deletePost, getPosts } from "../models/orm/PostOrm";
import { addUser, deleteUser, getUserByEmail, getUserById, getUsers } from "../models/orm/UserOrm";
import { TServerResponse } from "./types";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { badRequestResponse, customErrorResponse, customResponse, internalServerErrorResponse, loginResponse, postsResponse, usersResponse } from "./types/responses";


dotenv.config();

const secret = process.env.SECRET_KEY_TOKEN || '';

export default class SocialController {

  public async login (email: string, password: string): Promise<TServerResponse> {

    email = email.toLowerCase();
    const userByEmail = await getUserByEmail(email)
    if (!userByEmail) return badRequestResponse()

    if ( ! bcrypt.compareSync(password, userByEmail.password)) 
      return customErrorResponse('Password Invalid')
    const token = jwt.sign({ email }, secret, {
      expiresIn: "2h" 
    });

    return loginResponse(token, userByEmail)
  }

  public async getUsers (): Promise<TServerResponse> {
    try {
      const users = await getUsers()
      return usersResponse(users)
    } catch(err) {
      return internalServerErrorResponse()
    }
  }

  public async register (newUser: IUser): Promise<TServerResponse> {

    if (newUser.email) newUser.email = newUser.email.toLowerCase()
    if(newUser.password) newUser.password = bcrypt.hashSync(newUser.password, 8)
    
    const userRegister = await getUserByEmail(newUser.email)
    if (userRegister) return customResponse('This Email is in used')
    
    await addUser(newUser)


    return customResponse(`${newUser.email} Success Register`)
  }

  public async deleteUser (id: string): Promise<TServerResponse> {
    if(!mongoose.Types.ObjectId.isValid(id)) return badRequestResponse()
    const response = await deleteUser(id)
    return response ? 
      customResponse('User deleted')
      : badRequestResponse()
  }

  public async getPosts (): Promise<TServerResponse> {
    try {
      const posts = await getPosts()
      return postsResponse(posts)
    } catch(err) {
      return internalServerErrorResponse()
    }
  }

  public async addPost ({ id, body }: { id: string, body: string }): Promise<TServerResponse> {

    
    if(!body || !mongoose.Types.ObjectId.isValid(id)) return badRequestResponse()

    const user = await getUserById(id)
    if(!user) return badRequestResponse()

    await addPost({ user_id: {_id: id}, body })
    
    return customResponse('Post Added')
  }

  public async deletePost (id: string): Promise<TServerResponse> {
    if(!mongoose.Types.ObjectId.isValid(id)) return badRequestResponse()

    const response = await deletePost(id)
    return response ? 
      customResponse('User Deleted')
      : badRequestResponse()
  }
}