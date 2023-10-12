import mongoose from "mongoose";
import { UserEntity } from "../entities/UserEntity"
import { IUser } from "../interfaces/IUser";

export const getUsers = async (): Promise<IUser[]> => {
  const model = UserEntity();
  return model.aggregate([
    { $match: {} },
    { $project: { password: 0 } }
  ])
}

export const addUser = (newUser: IUser): Promise<IUser> => {
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
  })
}

export const deleteUser = async (id: string): Promise<boolean> => {
  const model = UserEntity()
  const response = await model.deleteOne({ _id: id })
  return response.deletedCount ? true : false
}

export const getUserById = (id: string): Promise<IUser | null> => {
  const model = UserEntity()
  return model.findById(id)
}
