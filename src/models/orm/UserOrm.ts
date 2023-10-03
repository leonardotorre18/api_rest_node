import { UserEntity } from "../entities/UserEntity"
import { IUser } from "../interfaces/IUser";

export const getUsers = async (): Promise<IUser[]> => {
  const model = UserEntity();
  let response: IUser[] = [];

  await model.find({
    // isDeleted: false
  })
    // .select('email password')
    // .limit(Infinity)
    .exec()
    .then((users: IUser[]) => response = users)

  return response
}

export const addUser = (newUser: IUser): void => {
  const model = UserEntity();

  model.create(newUser)

}