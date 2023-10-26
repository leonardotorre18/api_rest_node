import mongoose from "mongoose"
import { PostEntity } from "../entities/PostEntity"
import { UserEntity } from "../entities/UserEntity"
import { IPost } from "../interfaces/IPost"

export const addPost = (newPost: IPost): Promise<IPost> => {
  const model = PostEntity()
  return model.create(newPost)
}

export const deletePost = async (id: mongoose.Types.ObjectId, token: string): Promise<boolean> => {
  const model = PostEntity()
  console.log('llegó al controlador')
  const user = await UserEntity().find({ token })
  if ( user ) {
    const response = await model.deleteOne({ _id: id })
    console.log( response, id )
    return response.deletedCount ? true : false
  } else return false
}

export const getPosts = async (): Promise<IPost[]> => {
  const model = PostEntity();
  UserEntity()

  return model.find({})
  .populate("user", "name email")
  .sort({ updatedAt: -1 })
  .exec()
  .then( (posts) => {
    return <IPost[]>posts
  })
  
}