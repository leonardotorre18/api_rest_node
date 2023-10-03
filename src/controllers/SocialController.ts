import { IUser } from "../models/interfaces/IUser";
import { addUser, getUsers } from "../models/orm/UserOrm";

export default class SocialController {
  public async getUsers (): Promise<IUser[]> {
    return await getUsers()
  }
  public addUser (newUser: IUser):void {
    addUser(newUser)
  }
}