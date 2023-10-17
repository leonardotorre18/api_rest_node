import mongoose from "mongoose";

export interface IPost {
  body: string,
  user: mongoose.Types.ObjectId
}