import mongoose, { type Model } from 'mongoose'
import { type IMovies } from '../interfaces/IMovies'

export const MoviesEntity = (): Model<IMovies> => {
  const schema = new mongoose.Schema<IMovies>({})
  schema.set('timestamps', true)

  return mongoose.models.movies ?? mongoose.model<IMovies>('movies', schema)
}
