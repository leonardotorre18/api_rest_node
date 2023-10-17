import mongoose from "mongoose"

export interface IUser {
  _id: mongoose.Types.ObjectId,
  name: string,
  email: string,
  password: string,
  token: string
}

export interface IRegister {
  name: string,
  email: string,
  password: string,
}
