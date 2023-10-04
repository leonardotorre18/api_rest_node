import { response } from "express";
import { IUser } from "../models/interfaces/IUser";
import { addUser, deleteUser, getUserByEmail, getUsers } from "../models/orm/UserOrm";
import { ResponseServer } from "./types";

export default class SocialController {

  public async getUsers (): Promise<IUser[] | ResponseServer> {
    try {
      return await getUsers()
    } catch(err) {
      return { message: 'Error in Server' }
    }
  }

  public async addUser (newUser: IUser): Promise<ResponseServer> {
    let response: ResponseServer = { message: '' }

    if (newUser.email) newUser.email = newUser.email.toLowerCase()
    
    const userRegister = await getUserByEmail(newUser.email)
    if (userRegister) return { message: 'This Email is in used' }
    
    await addUser(newUser)
      .then((user: IUser) => response.message = `${user.email} Success Register`)
      .catch((err) => response.message = err.message)
    return response
  }

  public async deleteUser (id: string): Promise<ResponseServer> {
    const response = await deleteUser(id)
    return response ? 
      { message: 'User Deleted' }
      : { message: 'Id invalid' }
  }

}