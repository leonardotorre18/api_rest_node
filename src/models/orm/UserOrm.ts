import mongoose from "mongoose";
import { UserEntity } from "../entities/UserEntity"
import { IRegister, IUser } from "../interfaces/IUser";

export const getUsers = async (): Promise<IUser[]> => {
  const model = UserEntity();
  return model.aggregate([
    { $match: {} },
    { $project: { password: 0, token: 0 } }
  ])
}

export const addUser = (newUser: IRegister): Promise<IUser> => {
  const model = UserEntity();
  return model.create({
    email: newUser.email,
    password: newUser.password,
    name: newUser.name
  })
}

export const getUserByEmail = (email: string): Promise<IUser | null> => {
  const model = UserEntity()
  return model.findOne({
    email: email
  }, { token: 0 })
}

export const deleteUser = async (id: mongoose.Types.ObjectId, token: string): Promise<boolean> => {
  const model = UserEntity()
  const response = await model.deleteOne({ _id: id, token })
  return response.deletedCount ? true : false
}

export const getUserById = (id: mongoose.Types.ObjectId): Promise<IUser | null> => {
  const model = UserEntity()
  return model.findById(id, { password: 0, token: 0 })
}
