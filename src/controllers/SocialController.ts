import mongoose from "mongoose";
import { IAuth, IPost, IUser } from "../models/interfaces/IUser";
import { addPost, deletePost, getPosts } from "../models/orm/PostOrm";
import { addUser, deleteUser, getUserByEmail, getUserById, getUsers } from "../models/orm/UserOrm";
import { ResponseServer } from "./types";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';


dotenv.config();

const secret = process.env.SECRET_KEY_TOKEN || '';

export default class SocialController {

  public async getUsers (): Promise<IUser[] | ResponseServer> {
    try {
      return await getUsers()
    } catch(err) {
      return { message: 'Error in Server' }
    }
  }

  public async register (newUser: IUser): Promise<ResponseServer> {
    let response: ResponseServer = { message: '' }

    if (newUser.email) newUser.email = newUser.email.toLowerCase()
    if(newUser.password) newUser.password = bcrypt.hashSync(newUser.password, 8)
    
    const userRegister = await getUserByEmail(newUser.email)
    if (userRegister) return { message: 'This Email is in used' }
    
    await addUser(newUser)
      .then((user: IUser) => response.message = `${user.email} Success Register`)
      .catch((err) => response.message = err.message)
    return response
  }

  public async deleteUser (id: string): Promise<ResponseServer> {
    if(!mongoose.Types.ObjectId.isValid(id)) return { message: 'Id invalid' }
    const response = await deleteUser(id)
    return response ? 
      { message: 'User Deleted' }
      : { message: 'Id invalid' }
  }

  public async login (user: IAuth): Promise<ResponseServer | { message:string, token:string }> {

    let { email, password } = user;
    if(!email && !password) return { message: 'Invalid Data'}

    email = email.toLowerCase();

    const validationEmail = await getUserByEmail(email)
    if (!validationEmail) return { message: 'Invalid Email' }

    

    const token = jwt.sign({ email }, secret, {
      expiresIn: "2h" 
  });

    return bcrypt.compareSync(password, validationEmail.password) ?
      { message: 'Authentication Success', token: token }
      : { message: 'Invalid Password'}
  }

  public async getPosts (): Promise<IPost[] | ResponseServer> {
    try {
      return await getPosts()
    } catch(err) {
      return { message: 'Error in Server' }
    }
  }

  public async addPost ({ id, body }: { id: string, body: string }): Promise<ResponseServer> {

    
    if(!body || !mongoose.Types.ObjectId.isValid(id)) return { message: 'Incompleted Data'}

    const user = await getUserById(id)
    if(!user) return { message: 'User not Found'}

    await addPost({ user_id: {_id: id}, body })
    
    return { message: 'Post Added'}
  }

  public async deletePost (id: string): Promise<ResponseServer> {
    if(!mongoose.Types.ObjectId.isValid(id)) return { message: 'Id invalid' }
    const response = await deletePost(id)
    return response ? 
      { message: 'User Deleted' }
      : { message: 'Id invalid' }
  }
}