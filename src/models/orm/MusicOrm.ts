import { MusicEntity } from '../entities/MusicEntity'
import { type Music } from '../interfaces/Music'

export const getSongs = async (): Promise<Music[]> => {
  const response = await MusicEntity()
    .find()
    .exec()
    .then((res: Music[]) => res)
  return response
}

export const createSong = async (music: Music): Promise<Music> => {
  const response = await MusicEntity()
    .create(music)
    .then((res) => res)
    .catch((err) => err)

  return response
}
