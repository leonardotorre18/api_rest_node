import mongoose from "mongoose";
import { UserEntity } from "../entities/UserEntity"
import { IUser } from "../interfaces/IUser";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET_KEY_TOKEN || '';


export const loginToken = async ( id: mongoose.Types.ObjectId,  token: string): Promise<boolean> => {
  const model = UserEntity();
  const response = await model.updateOne({ _id: id }, {token})
  return response.modifiedCount ?
    true : false
}

export const removeToken = async ( token: string): Promise<boolean> => {
  const model = UserEntity()

  const newToken = jwt.sign({}, secret, {
    expiresIn: '1s'
  })
  const response = await model.updateOne({
    token
  }, { token: newToken })
  
  return response.modifiedCount ?
    true : false

}

export const refreshSession = async (token: string): Promise<IUser | null> => {
  const model = UserEntity()
  const user = await model.findOne({ token })

  if (!user) return null

  const newToken: string = jwt.sign({ email: user.email, password: user.password }, secret, {
    expiresIn: '2h'
  })

  await model.updateOne({ token }, { token: newToken })
  return model.findOne({ token: newToken })
}

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