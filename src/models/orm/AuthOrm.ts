import mongoose from "mongoose";
import { UserEntity } from "../entities/UserEntity"
import { IUser } from "../interfaces/IUser";


export const loginToken = async ( id: mongoose.Types.ObjectId,  token: string): Promise<boolean> => {
  const model = UserEntity();
  const response = await model.updateOne({ _id: id }, {token})
  return false
}

// export const removeToken = ( token: string): Promise<boolean> => {

// }

export const getUserByToken = (token: string): Promise<IUser | null> => {
  const model = UserEntity()
  return model.findOne({
    token
  }, { password: 0, token: 0 })
}

export const getUserByTokenAndId = (id: mongoose.Types.ObjectId, token: string): Promise<IUser | null> => {
  const model = UserEntity()
  return model.findOne({
    token,
    _id: id
  })
}