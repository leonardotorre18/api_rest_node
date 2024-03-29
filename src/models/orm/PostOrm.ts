import { PostEntity } from '../entities/PostEntity'
import { UserEntity } from '../entities/UserEntity'
import type { IPost } from '../interfaces/IPost'

export const createPost = async (newPost: IPost, token: string): Promise<IPost> => {
  const model = PostEntity()
  const validated = await UserEntity().findOne({ token })

  if (validated == null) throw new Error('Usuario no valido')

  return await model.create({
    ...newPost,
    user: validated._id
  })
}

export const deletePost = async (id: string, token: string): Promise<IPost> => {
  const model = PostEntity()
  const validated = await UserEntity().findOne({ token })

  if (validated == null) throw new Error('Usuario no valido')

  const result = await model.findByIdAndDelete({ _id: id })

  if (result != null) return result
  else throw new Error('No se encontró el post')
}

export const getPosts = async (limit?: number, page?: number): Promise<IPost[]> => {
  const model = PostEntity()
  UserEntity()

  return await model.find({})
    .populate('user', 'name email')
    .sort({ updatedAt: -1 })
    .limit(limit ?? 6)
    .skip(
      // is limit and page exist, generate pagination
      page !== undefined &&
      limit !== undefined &&
      page > 0 && limit > 0
        ? (page - 1) * limit
        : 0
    )
    .exec()
}

export const getPostById = async (id: string): Promise<IPost> => {
  const model = PostEntity()

  const result = await model.findById(id).populate('user', 'name email')

  if (result == null) throw new Error('Id no valido')

  return result
}

export const getPostsByUser = async (id: string): Promise<IPost[]> => {
  const model = PostEntity()

  return await model.find({ user: id }).populate('user', 'name email')
}

export const updatePost = async (
  {
    title,
    body,
    img
  }:
  {
    title?: string
    body?: string
    img?: {
      url: string
      id: string
    }
  },
  id: string, token: string
): Promise<IPost> => {
  const model = PostEntity()

  const user = await UserEntity().findOne({ token })
  if (user == null) throw new Error('Datos inválidos')

  const result = await model.findByIdAndUpdate(
    { _id: id, user: user._id },
    {
      title,
      body,
      img
    }, { new: true })
  if (result == null) throw new Error('Datos inválidos')

  return result
}
