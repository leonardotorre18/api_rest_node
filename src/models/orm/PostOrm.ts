import { PostEntity } from "../entities/PostEntity"
import { IPost } from "../interfaces/IUser"

export const addPost = (newPost: IPost): Promise<IPost> => {
  const model = PostEntity()
  return model.create(newPost)
}

export const deletePost = async (id: string): Promise<boolean> => {
  const model = PostEntity()
  const response = await model.deleteOne({ _id: id })
  return response.deletedCount ? true : false
}

export const getPosts = (): Promise<IPost[]> => {
  const model = PostEntity();
  return model.find({
    // isDeleted: false
  })
    // .select('email password')
    // .limit(Infinity)
    .exec()
    .then((post: IPost[]) => post)
}