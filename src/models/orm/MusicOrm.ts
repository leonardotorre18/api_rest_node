import { MusicEntity } from '../entities/MusicEntity'
import { type Music } from '../interfaces/Music'

export const getAllMusics = async (): Promise<Music[]> => {
  const response = await MusicEntity()
    .find()
    .exec()
    .then((res: Music[]) => res)
  return response
}
